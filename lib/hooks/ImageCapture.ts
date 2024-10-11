"use client"

import { useState, useEffect } from "react";
import { imageQuery } from "@/app/server/ImageClassification";
import { AccurateData } from "@/types/type";

export interface ImageCaptureState {
  imageFile: File | null;
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  data: AccurateData | null;
  accurateData: AccurateData | null;
}

export interface ImageCaptureProps {
  onImageCapture: (file: File) => Promise<void>;
}

export const useImageCapture = () => {
  const [state, setState] = useState<ImageCaptureState>({
    imageFile: null,
    imageUrl: null,
    isLoading: false,
    error: null,
    data: null,
    accurateData: null
  });

  useEffect(() => {
    return () => {
      if (state.imageUrl) {
        URL.revokeObjectURL(state.imageUrl);
      }
    };
  }, [state.imageUrl]);
  const updateState = (newState: Partial<ImageCaptureState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  };
  const handleImageProcess = async (file: File) => {
    try {
      updateState({ isLoading: true, error: null });
      const url = URL.createObjectURL(file);
      updateState({ imageFile: file, imageUrl: url });
      const result = await imageQuery(file);
      const jsonStr = JSON.stringify(result);
      const accurateData = JSON.parse(jsonStr).reduce(
        (max: any, item: any) => (item.score > max.score ? item : max),
        { score: 0 }
      );
      console.log(result)
      console.log(accurateData)
      updateState({ data: result, accurateData});
    } catch (error) {
      updateState({ error: "Failed to process image" });
    } finally {
      updateState({ isLoading: false });
    }
  };

  return { state, updateState, handleImageProcess };
};
