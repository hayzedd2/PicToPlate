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
  const fileName = "./public/sounds/generatedspeech.mp3";
  if (stream) {
    const buffer = await getAudioBuffer(stream);
    fs.writeFile(fileName, buffer, (err) => {
      if (err) {
        console.error("Error writing audio to file:", err);
      } else {
        console.log("Audio file written to", fileName);
      }
    });
  } else {
    console.error("Error generating audio:", stream);
  }
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
