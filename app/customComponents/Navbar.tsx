"use client";
import { GoQuestion } from "react-icons/go";
import React from "react";

const Navbar = () => {
  return (
    <div className="md:px-20 py-5 flex gap-2 items-center">
      <p className="font-[500] text-[1.4rem]">PicToPlate</p>
      <button className="mt-[-2px]">
        <GoQuestion />
      </button>
    </div>
  );
};

export default Navbar;
