import React from "react";
import { useQuery } from "@tanstack/react-query";
import { imageQuery } from "../server/ImageClassification";
import { useState } from "react";

const Upload = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setImageFile(event.target.files[0]);
    }
  };
  const handleImageClassification = () => {
    const { data, isLoading, error } = useQuery({
      queryKey: ["imagequery"],
      queryFn: () => imageQuery(imageFile!),
    });
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
        <button onClick={handleImageClassification}>
          Get food instructions
        </button>
        <div>
            
        </div>
      </div>
    </section>
  );
};

export default Upload;
