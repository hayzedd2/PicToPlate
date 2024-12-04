"use client";

import { useFileStore } from "@/lib/hooks/useFileStore";
import { useEffect, useRef, useState } from "react";
import { RxCamera } from "react-icons/rx";
const CameraCapture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { setFile } = useFileStore();
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Failed to access camera:", err);
    }
  };
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };
  const captureImage = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          setFile(file);
          stopCamera();
        }
      },
      "image/jpeg",
      0.8
    );
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!isCameraActive) {
    return (
      <button type="button" onClick={startCamera} className=" text-black">
        <RxCamera className="w-[1.18rem] h-[1.18rem]" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-md w-full">
        <div className="relative aspect-video mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={stopCamera}
            className="px-4 py-2 border text-black rounded-md bg-transparent hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={captureImage}
            className="px-4 py-2 bg-[#111110] text-white rounded-md"
          >
            Capture
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
