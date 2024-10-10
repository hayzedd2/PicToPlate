"use client";

import React, { useEffect, useRef } from "react";
import { imageQuery } from "../server/ImageClassification";
import { useState } from "react";
import { AccurateData } from "@/types/type";
import TextGenerator from "./TextGenerator";
import { Button } from "@/components/ui/button";
import { LuUpload } from "react-icons/lu";
import { BsCameraFill, BsImages } from "react-icons/bs";
import Image from "next/image";
import { toast } from "sonner";
import Caution from "./Caution";
import { ImageCaptureProps } from "@/lib/hooks/ImageCapture";

const Upload = ({onImageCapture}: ImageCaptureProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageCapture(file);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section className="w-full">
      <div>
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
          onClick={handleImageClassification}
          className="flex gap-2 items-center justify-center"
          disabled={imageFile ? false : true}
        >
          Upload
          <LuUpload className="text-[0.95rem] mt-[-0.25rem]" />
        </Button> */}
      </div>
      {/* <Caution/> */}

    </section>
  );
};
export default Upload;
