import { SYSTEM_PROMPT } from "@/app/contents/content";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const result = streamText({
      model: anthropic("claude-3-sonnet-20240229"),
      maxTokens: 1024,
      messages,
      system: SYSTEM_PROMPT,
    });
    return result.toDataStreamResponse();
  } catch (err) {
    console.log(err);
  }
}
