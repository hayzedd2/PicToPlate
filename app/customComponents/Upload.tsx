"use client";

import React, { useEffect } from "react";
import { imageQuery } from "../server/ImageClassification";
import { useState } from "react";
import { AccurateData } from "@/types/type";
import TextGenerator from "./TextGenerator";

const Upload = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [data, setData] = useState<AccurateData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setImageFile(event.target.files[0]);
    }
  };
  const handleImageClassification = async () => {
    try {
      setIsLoading(true);
      setError(null);
      if (!imageFile) {
        throw new Error("No image file selected.");
      }
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
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div>
        <input
          type="file"
          id="image-input"
          onChange={handleImageChange}
          accept="image/*"
        />
        <button onClick={handleImageClassification}>FETCH</button>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {data && (
          <>
            <div>{data.label}</div>
            <TextGenerator accurateData={data} />
          </>
        )}
      </div>
    </section>
  );
};
export default Upload;
