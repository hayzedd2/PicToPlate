"use server";
const API_ENDPOINT = "https://api-inference.huggingface.co/models/nateraw/food";
export async function imageQuery(imageFile: File) {
  try {
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
    const data = await response.json()
    const result = await JSON.parse(JSON.stringify(data))
    console.log(result)
    return result
  } catch (error) {
    console.error("Error in ImageQuery:", error);
    throw error;
  }
}
