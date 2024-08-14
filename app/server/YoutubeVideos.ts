const API_KEY = process.env.GOOGLE_CONSOLE_API_KEY;
export async function YoutubeVideos(query: string) {
  if (!query) {
    return null;
  }
  const API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}`;
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`API request failed with status code ${response.status}`);
  }
  const videos = await response.json();
  return videos;
}
