"use client";

import React, { useRef } from "react";

import { HiOutlinePhoto } from "react-icons/hi2";
import { useFileStore } from "@/lib/hooks/useFileStore";
const Upload = () => {
  const setFile = useFileStore((state) => state.setFile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="flex gap-1">
      <input
        type="file"
        id="image-input"
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
      />
      <button
        className="text-black cursor-pointer"
        type="button"
        id="image-input"
        onClick={handleIconClick}
      >
        <HiOutlinePhoto className="w-5 h-5" />
      </button>
    </div>
  );
};
export default Upload;
