import { useState, useEffect } from "react";
interface VideoItem {
  id: {
    videoId: string;
  };
}
const Videos = ({ query }: { query: string }) => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const searchQuery = `how to prepare ${query}`;

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${API_KEY}`
      );
      const data = await response.json();
      console.log(data)
      setVideos(data.items);
    };

    fetchVideos();
  }, [query]);

  return (
    <section className="w-full">
      <div className="heading mt-3">
        <strong>Suggested videos: </strong>
      </div>
      <div className="flex gap-2 mt-2 indicator overflow-scroll mx-auto">
        {videos && videos.length > 0 ? (
          videos.map((video, id) => (
            <div key={id}>
              <iframe
                className="rounded-[12px] w-[11rem] h-[7rem]"
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </section>
  );
};

export default Videos;
