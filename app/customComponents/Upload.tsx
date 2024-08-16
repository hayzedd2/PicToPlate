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

const Upload = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [data, setData] = useState<AccurateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };
  const handleImageClassification = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (!imageFile) {
        throw new Error("No image file selected.");
      }
      console.log(imageFile);
      const response = await imageQuery(imageFile);
      const jsonStr = JSON.stringify(response);
      const accurateData = JSON.parse(jsonStr).reduce(
        (max: any, item: any) => (item.score > max.score ? item : max),
        { score: 0 }
      );
      setData(accurateData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
        console.log(error)
      }
    } finally {
      setIsLoading(false);
    }
  };
  const formatDishName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <section className="w-full">
      <div className="flex gap-2 pt-4 items-center justify-center">
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
          onClick={()=> toast("Coming soon :)")}
        >
          <BsCameraFill/>
        </button>
        <button
          className="p-3 rounded-sm bg-gray-200 cursor-pointer"
          id="image-input"
          onClick={handleIconClick} 
        >
          <BsImages />
        </button>

        <Button
          onClick={handleImageClassification}
          className="flex gap-2 items-center justify-center"
          disabled={imageFile ? false : true}
        >
          Upload
          <LuUpload className="text-[0.95rem] mt-[-0.25rem]" />
        </Button>
      </div>
      <Caution/>
      <div className="w-full flex items-center pt-2 justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl ? imageUrl : ""}
            alt="Uploaded image"
            width={200}
            height={200}
            objectFit="contain"
          />
        ) : null}
      </div>
      <div className="py-4 w-full items-center justify-center flex flex-col">
        {isLoading && <div>Analyzing image...</div>}
        {error && <div>Something went wrong, please try again</div>}
        {data && (
          <>
            <div className="text-[1.1rem] mb-2 flex sm:flex-col xl:flex-row sm:gap-1 items-center justify-center xl:gap-3 sm:flex-wrap">
              <p className="flex gap-1">
                Identified dish :
                <span className="capitalize font-[600]">
                  {formatDishName(data.label)}
                </span>
              </p>
              <p className="flex gap-1">
                Accuracy :
                <span className="capitalize font-[600]">
                  {(Math.round(data.score * 10000) / 10000).toFixed(4)}
                </span>
  
              </p>
            </div>
            <TextGenerator accurateData={data} />
          </>
        )}
      </div>
    </section>
  );
};
export default Upload;
