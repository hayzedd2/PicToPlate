"use client";

import { ShareText } from "@/helpers/shareText";
import React from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { PiShareFat } from "react-icons/pi";
import { generateSpeech } from "../server/generateSpeech";
import { useAudioPlayback } from "@/hooks/useAudioPlayback";
import { TextHighlighterActionProps } from "@/types/type";
import { LuCopy } from "react-icons/lu";
import { copyText } from "@/helpers/copyText";

const TextHighlighterActions = ({
  x,
  y,
  selectedText,
  setPosition,
}: TextHighlighterActionProps) => {
  const { playAudio } = useAudioPlayback();
  const handlePlaySound = async () => {
    setPosition(null);
    playAudio(selectedText);
  };
  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      className="w-max  text-highlighter-options z-50 fixed py-2 px-2 text-[14px] gap-3 flex items-center justify-center bg-white bx-shadow-light rounded-[20px]"
    >
      <HiOutlineSpeakerWave
        role="button"
        onClick={handlePlaySound}
        className="cursor-pointer"
      />
      <PiShareFat
        role="button"
        onClick={() => {
          ShareText(selectedText);
          setPosition(null);
        }}
        className="cursor-pointer"
      />
      <LuCopy
        className="cursor-pointer"
        onClick={() => {
          copyText(selectedText);
          setPosition(null);
        }}
      />
    </div>
  );
};

export default TextHighlighterActions;
