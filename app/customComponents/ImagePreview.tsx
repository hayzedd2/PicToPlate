"use client";

import { ImageCaptureState } from "@/lib/hooks/ImageCapture";
import Image from "next/image";
import TextGenerator from "./TextGenerator";
interface ImagePreviewProps {
  state: ImageCaptureState;
}

export const ImagePreview = ({ state }: ImagePreviewProps) => {
  const { imageUrl, isLoading, error, data, accurateData } = state;
  const requiredConfidence = 0.4;
  const formatDishName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="space-y-4">
      <div className={`w-full flex items-center pt-2 justify-center`}>
        {imageUrl ? (
          <div className="relative">
            {" "}
            <Image
              src={imageUrl ? imageUrl : ""}
              alt="Uploaded image"
              width={200}
              height={200}
              objectFit="contain"
              className={`${isLoading ? "opacity-50" : 0}`}
            />
            {isLoading && (
              <svg
                className="h-4 w-4 text-black spinner absolute top-1/2 right-1/2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth={"4"}
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </div>
        ) : null}
      </div>
      <div className="py-4 w-full items-center justify-center flex flex-col">
        {error && <div>Something went wrong, please refresh the page.</div>}
        {accurateData && accurateData?.score < requiredConfidence && (
          <p>Could not identify dish :(</p>
        )}
        {accurateData && accurateData.score > requiredConfidence && (
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
            {accurateData && accurateData.score > requiredConfidence && (
              <TextGenerator accurateData={accurateData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
