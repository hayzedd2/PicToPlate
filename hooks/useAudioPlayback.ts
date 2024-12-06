import { useRef, useCallback, useState } from "react";

export const useAudioPlayback = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const createAudio = useCallback(async () => {
    try {
      // Fetch audio file directly
      const response = await fetch(
        `/sounds/generatedSpeech.mp3?t=${Date.now()}`
      );
      if (!response.ok) throw new Error("Audio fetch failed");
      const blob = await response.blob();
      const audio = new Audio(URL.createObjectURL(blob));

      audio.onended = () => setIsPlaying(false);
      return audio;
    } catch (err) {
      console.error("Audio creation failed:", err);
      return null;
    }
  }, []);

  const playAudio = useCallback(async () => {
    if (audioRef.current) {
      await audioRef.current.play();
    } else {
      const audio = await createAudio();
      if (audio) {
        audioRef.current = audio;
        await audio.play();
      }
    }
    setIsPlaying(true);
  }, [createAudio]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const restartAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      playAudio();
    }
  }, [playAudio]);

  return { playAudio, stopAudio, restartAudio, isPlaying };
};
