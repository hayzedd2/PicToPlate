"use server";

import { createClient } from "@deepgram/sdk";
import fs from "fs";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);
export const generateSpeech = async (text: string) => {
  const response = await deepgram.speak.request(
    { text },
    {
      model: "aura-luna-en",
      encoding: "linear16",
      container: "wav",
    }
  );
  const stream = await response.getStream();
  const buffer = getAudioBuffer(stream as ReadableStream<Uint8Array>);

  return buffer;
};

const getAudioBuffer = async (response: ReadableStream<Uint8Array>) => {
  const reader = response.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);

  const dataArray = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    dataArray.set(chunk, offset);
    offset += chunk.length;
  }

  return Buffer.from(dataArray.buffer);
};
