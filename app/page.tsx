"use client";

import { useImageCapture } from "@/lib/hooks/ImageCapture";
import Navbar from "./customComponents/Navbar";
import Upload from "./customComponents/Upload";
import CameraCapture from "./customComponents/Camera";
import { ImagePreview } from "./customComponents/ImagePreview";
import Caution from "./customComponents/Caution";
import PasteImage from "./customComponents/PasteImage";

export default function Home() {
  const { state, handleImageProcess } = useImageCapture();
  return (
    <main className=" max-w-[60rem] px-5 flex flex-col items-center justify-center mx-auto my-10">
      <Navbar />
      <div className="flex items-center gap-2 pt-4 w-full justify-center flex-wrap">
        <PasteImage onImageCapture={handleImageProcess} />
        <div className="flex gap-2">
          <Upload onImageCapture={handleImageProcess} />
          <CameraCapture onImageCapture={handleImageProcess} />
        </div>
      </div>
      <div>
        <Caution />
      </div>
      <div>
        <ImagePreview state={state} />
      </div>
    </main>
  );
}
