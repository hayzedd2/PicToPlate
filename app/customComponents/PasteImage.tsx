import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageCaptureProps } from "@/lib/hooks/ImageCapture";
import React, { useState } from "react";

const PasteImage = ({onImageCapture} : ImageCaptureProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleConvert = async () => {
    setLoading(true);
    setError(null);
    try {
        
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Image not found or could not be fetched");
      }
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      onImageCapture(file)
      setImageFile(file);
      console.log("File created:", file);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error coverting image");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full justify-center items-center space-x-2">
      <Input
        type="text"
        value={imageUrl}
        className="w-[20rem]"
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Paste image address"
      />
      <Button onClick={handleConvert} disabled={imageUrl.length <= 6} type="submit">Submit</Button>
    </div>
  );
};

export default PasteImage;
