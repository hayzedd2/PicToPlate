import { useRef, useCallback, useState } from 'react';

export const useAudioPlayback = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const createAudio = useCallback(() => {
    const timestamp = Date.now();
    const audio = new Audio(`/sounds/generatedSpeech.wav?t=${timestamp}`);
    audio.onended = () => {
      setIsPlaying(false);
    };
    audio.onerror = () => {
      console.error("Error playing audio");
      setIsPlaying(false);
    };
    return audio;
  }, []);

  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      const audio = createAudio();
      audioRef.current = audio;
      audio.play();
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