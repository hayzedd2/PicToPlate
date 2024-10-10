"use client"

import { ImageCaptureState } from "@/lib/hooks/ImageCapture";
import { AccurateData } from "@/types/type";
import Image from "next/image";
import { useState } from "react";
import TextGenerator from "./TextGenerator";
interface ImagePreviewProps {
  state: ImageCaptureState;
}

export const ImagePreview = ({ state }: ImagePreviewProps) => {
  const { imageUrl, isLoading, error, data, accurateData } = state;
  const formatDishName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="space-y-4">
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
        {error && <div>Something went wrong, please refresh your page.</div>}
        {data && (
          <>
            <div className="text-[1.1rem] mb-2 flex sm:flex-col xl:flex-row sm:gap-1 items-center justify-center xl:gap-3 sm:flex-wrap">
              <p className="flex gap-1">
                Identified dish :
                <span className="capitalize font-[600]">
                  {formatDishName(accurateData!.label)}
                </span>
              </p>
              <p className="flex gap-1">
                Accuracy :
                <span className="capitalize font-[600]">
                  {(Math.round(accurateData!.score * 10000) / 10000).toFixed(4)}
                </span>
              </p>
            </div>
            <TextGenerator accurateData={accurateData} />
          </>
        )}
      </div>
    </div>
  );
};
