"use client";

import { useFileStore } from "@/lib/hooks/useFileStore";
import React, { useRef, useState } from "react";
import Upload from "./Upload";
import CameraCapture from "./Camera";
import { IoArrowUp } from "react-icons/io5";
import SmallImagePreview from "./SmallImagePreview";
import { InputControllerProps } from "@/types/type";

const InputContainer = ({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
}: InputControllerProps) => {
  const { file, resetUpload } = useFileStore();
  const [fileList, setFileList] = useState<FileList | undefined>(undefined);
  const textareaRef = useRef(null);
  React.useEffect(() => {
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      setFileList(dataTransfer.files);
    }
  }, [file]);

  const isSubmitDisabled = (): boolean => {
    return isLoading || input.length < 2;
  };

  return (
    <div className=" fixed left-1/2 transform px-3 -translate-x-1/2 bottom-5 z-10 w-full md:w-max">
      <div className="md:w-max w-full flex flex-col bg-white  items-start h-max  rounded-[20px] bx-shadow-light mx-auto">
        <SmallImagePreview />
        <div className="w-full flex py-3  px-4  items-center justify-center   mx-auto">
          <form
            action=""
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (!file && !input) return;
              handleSubmit(e, {
                experimental_attachments: fileList,
              });
              setFileList(undefined);
              resetUpload();
            }}
          >
            <div className="h-full w-full mb-3 mt-1">
              <input
                value={input}
                onChange={handleInputChange}
                className="md:w-[600px] resize-none  border-none outline-none "
                placeholder={`${
                  messages.length > 0 ? "Ask a follow up" : "Ask about a dish"
                }`}
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-4">
                <Upload />
                <div className="hidden md:flex">
                  <CameraCapture />
                </div>
              </div>
              <button
                className="rounded-full text-white px-2 py-2 disabled:pointer-events-none disabled:opacity-50 b flex items-center justify-center  bg-black"
                disabled={isSubmitDisabled()}
                type="submit"
              >
                <IoArrowUp />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputContainer;
