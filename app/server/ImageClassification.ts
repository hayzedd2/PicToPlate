
const API_ENDPOINT = "https://api-inference.huggingface.co/models/nateraw/food";
const BLIP_ENDPOINTS = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large"
export async function imageQuery(imageFile: File) {
  const response = await fetch(API_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.HUGGING_FACE_BEARER_KEY}`,
      "Content-Type": "application/octet-stream",
    },
    method: "POST",
    body: imageFile,
    
  });
  if (!response.ok) {
    throw new Error(`API request failed with status code ${response.status}`);
  }
  const result = await response.json();
  return result;
}
