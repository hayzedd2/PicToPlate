// utils/huggingface.js
import { HfInference } from "@huggingface/inference";

export const inference = new HfInference(process.env.HUGGING_FACE_BEARER_KEY);