import React from "react";

const Loading = () => {
  return (
    <div className="justify-start flex gap-2 items-center w-full">
      <div className="w-7 h-7"></div>
      <p className="animate-opacity">Thinking...</p>
    </div>
  );
};

export default Loading;
