"use client";

import { useFileStore } from "@/lib/hooks/useFileStore";

const ImagePreviewError = () => {
  const { error, clearError } = useFileStore();
  return (
    error && (
      <div className="flex items-center relative bg-red-200 justify-between  py-2 rounded-tl-[20px] rounded-tr-[20px]  px-4  w-full mb-1 ">
        <p className="text-[12px] text-red-600 font-[500]">{error.message}</p>
        <div
          onClick={() => clearError()}
          className="bg- rounded-full w-4 h-4 top-[-5px] z-20 flex items-center justify-center bx-shadow- cursor-pointer"
        >
          <svg
            height="10"
            strokeLinejoin="round"
            viewBox="0 0 16 16"
            width="10"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
    )
  );
};

export default ImagePreviewError;
