"use client";

import { useModalStore } from "@/lib/hooks/useModalStore";
import React from "react";
import { IoArrowUp, IoClose } from "react-icons/io5";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, closeModal } = useModalStore();
  if (!isOpen) return null;
  return (
    <div className="overlay min-h-[100dvh] flex items-center z-[500] fixed top-0  left-0 right-0 justify-center">
      <div className="modal max-h-[20rem] max-w-[20rem] relative flex items-center justify-center rounded-md  p-1">
        <button
          className="rounded-full absolute top-[-3rem] right-0 z-[1000] text-white px-2 py-2 disabled:opacity-50 b flex items-center justify-center  bg-black"
          onClick={closeModal}
        >
          <IoClose />
        </button>
       
        {children}
      </div>
    </div>
  );
};

export default Modal;
