import { useRef, useCallback, useState } from "react";

export const useAudioPlayback = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // const createAudio = useCallback(async (text: string) => {
  //   const response = await fetch("/api/speech", {
  //     method: "POST",
  //     body: JSON.stringify({ text }),
  //   });
  //   const blob = await response.blob();
  //   return new Audio(URL.createObjectURL(blob));
  // }, []);

  const playAudio = useCallback(async (text: string) => {
    const response = await fetch('/api/speech', {
      method: 'POST',
      body: JSON.stringify({ text })
    });
    const blob = await response.blob();
    const audio = new Audio(URL.createObjectURL(blob));
    
    audio.onended = () => setIsPlaying(false);
    audioRef.current = audio;
    await audio.play();
    setIsPlaying(true);
  }, []);


  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  // const restartAudio = useCallback(() => {
  //   if (audioRef.current) {
  //     audioRef.current.currentTime = 0;
  //     audioRef.current.play();
  //     setIsPlaying(true);
  //   } else {
  //     playAudio(text);
  //   }
  // }, [playAudio]);

  return { playAudio, stopAudio, isPlaying };
};
