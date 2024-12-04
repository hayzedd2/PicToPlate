"use client";

import { useFileStore } from "@/lib/hooks/useFileStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SmallImagePreview = () => {
  const { imageUrl, file, resetUpload } = useFileStore();
  return (
    <TooltipProvider>
      {imageUrl && file && (
        <Tooltip>
          <div className="w-full bg-[#FAFAFA] py-2 rounded-tl-[20px] rounded-tr-[20px]  px-4 ">
            <TooltipTrigger className="cursor-default w-max">
              <div className="flex items-center relative bg-white  p-1 w-[150px] mb-1 border rounded-md">
                <img
                  className="w-[40px] rounded-sm bx-shadow-light  h-[40px] object-cover"
                  src={imageUrl}
                  alt=""
                />
                <div
                  onClick={() => resetUpload()}
                  className="absolute bg-white rounded-full w-3 h-3 top-[-5px] z-20 flex items-center justify-center right-[-5px] bx-shadow-light cursor-pointer"
                >
                  <svg
                    height="8"
                    strokeLinejoin="round"
                    viewBox="0 0 16 16"
                    width="8"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.4697 13.5303L13 14.0607L14.0607 13L13.5303 12.4697L9.06065 7.99999L13.5303 3.53032L14.0607 2.99999L13 1.93933L12.4697 2.46966L7.99999 6.93933L3.53032 2.46966L2.99999 1.93933L1.93933 2.99999L2.46966 3.53032L6.93933 7.99999L2.46966 12.4697L1.93933 13L2.99999 14.0607L3.53032 13.5303L7.99999 9.06065L12.4697 13.5303Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="flex  rounded-tr-sm rounded-br-sm  flex-col h-full px-2">
                  <p className="text-[12px]">{file.name.slice(0, 15)}</p>
                  <p className="text-[12px]">
                    {Number(file.size / 1000).toFixed(2)}kb
                  </p>
                </div>
              </div>
            </TooltipTrigger>
          </div>
          <TooltipContent className="flex p-0 items-start justify-start w-full bg-white">
            <div className="p-1 rounded-md">
              <img
                className="rounded-md w-[200px] h-[150px]"
                src={imageUrl}
                alt="Tooltip-image"
              />
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </TooltipProvider>
  );
};

export default SmallImagePreview;
