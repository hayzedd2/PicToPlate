"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdOutlineError } from "react-icons/md";
import { AlertCircle } from "lucide-react";
import { div } from "framer-motion/client";

const Caution = () => {
  const messages = [
    "AI may provide inaccurate result",
    "Please only upload a picture of a meal",
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
    <div className="border border-red-500 mt-3 PX-4 rounded-[8px] p-2">
      <div className="max-h-[1.4rem] overflow-hidden  text-center mx-auto my-auto">
        {messages.map((message, index) => (
          <motion.p
            animate={{
              translateY: `-${currMessage * 100}%`,
              scale: currMessage === index ? 1 : 0.65,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="font-[500] text-red-500 flex items-center justify-center gap-2"
            key={index}
          >
            <AlertCircle className="w-4 h-4" />
            {message}
          </motion.p>
        ))}
      </div>
    </div>
  );
};

export default Caution;
