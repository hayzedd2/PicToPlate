"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdOutlineError } from "react-icons/md";

const Caution = () => {
  const messages = [
    "AI may provide inaccurate result",
    "Please only upload a meal picture",
    "Ensure accuracy is greater than 0.6",
  ];
  const [currMessage, setCurrMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrMessage((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-h-[1.4rem] overflow-hidden  mt-3 max-w-[22rem] text-center mx-auto my-auto">
      {messages.map((message, index) => (
        <motion.p
          animate={{
            translateY: `-${currMessage * 100}%`,
            scale: currMessage === index ? 1 : 0.65,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            mass: 3,
            stiffness: 400,
            damping: 50,
          }}
          className="font-[500] flex items-center justify-center gap-1"
          key={index}
        >
            <MdOutlineError className="mt-[-4px] bg-transparent"/>
          {message}
        </motion.p>
      ))}
    </div>
  );
};

export default Caution;
