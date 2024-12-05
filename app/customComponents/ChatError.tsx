import { generateGradient } from "@/helpers/generateGradient";
import React from "react";

const ChatError = () => {
  return (
    <div className="flex items-center gap-3  w-full">
      <div
        className="size-7 rounded-full"
        style={{
          background: generateGradient(5),
        }}
      ></div>
      <div className=" bg-red-200 py-2 rounded-[20px] px-4">
        <p className="text-[12px] text-red-600 font-[500]">
          An error occured, Please try again.
        </p>
      </div>
    </div>
  );
};

export default ChatError;
