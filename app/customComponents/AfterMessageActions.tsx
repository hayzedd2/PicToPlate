"use client";

import { ShareText } from "@/helpers/shareText";
import { RiShare2Line } from "react-icons/ri";
import { IoStopCircle } from "react-icons/io5";
import React from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { generateSpeech } from "../server/generateSpeech";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { LuCopy } from "react-icons/lu";
import { copyText } from "@/helpers/copyText";
import { toast } from "sonner";

const AfterMessageActions = ({ text }: { text: string }) => {
  const { playAudio, isPlaying, stopAudio } = useAudioPlayback();
  const handlePlaySound = async () => {
    await generateSpeech(text);
    playAudio();
  };
  return (
    <div className="w-max my-3 py-2 text-[18px] px-2 gap-4  flex items-center justify-center">
      {!isPlaying ? (
        <HiOutlineSpeakerWave
          role="button"
          onClick={handlePlaySound}
          className="cursor-pointer"
        />
      ) : (
        <IoStopCircle
          role="button"
          onClick={stopAudio}
          className="cursor-pointer"
        />
      )}

      <LuCopy
        className="cursor-pointer"
        onClick={() => {
          copyText(text);
          toast("Copied!");
        }}
      />
      <RiShare2Line
        role="button"
        onClick={() => {
          ShareText(text);
        }}
        className="cursor-pointer"
      />
    </div>
  );
};

export default AfterMessageActions;
