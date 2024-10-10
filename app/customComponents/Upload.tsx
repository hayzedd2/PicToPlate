"use client";

import React, { useRef, useState } from "react";
import { BsImages } from "react-icons/bs";
import { ImageCaptureProps } from "@/lib/hooks/ImageCapture";
import { Button } from "@/components/ui/button";
import { LuUpload } from "react-icons/lu";

const Upload = ({ onImageCapture }: ImageCaptureProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageCapture(file)
    }
  };
  // const handleImageSubmit = () => {
  //   if(file){
  //     onImageCapture(file)
  //   }
  // };
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="w-full">
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
          className="p-3 rounded-sm bg-gray-200 cursor-pointer"
          id="image-input"
          onClick={handleIconClick}
        >
          <BsImages />
        </button>
        {/* <Button
          onClick={handleImageSubmit}
          className="flex gap-2 items-center justify-center"
          disabled={file ? false : true}
        >
          Upload
          <LuUpload className="text-[0.95rem] mt-[-0.25rem]" />
        </Button> */}
      </div>
    </section>
  );
};
export default Upload;
