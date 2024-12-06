import { generateSpeech } from "@/app/server/generateSpeech";

export async function POST(req: Request) {
    const { text } = await req.json();
    const audioBuffer = await generateSpeech(text);
    
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length.toString()
      }
    });
  }
  