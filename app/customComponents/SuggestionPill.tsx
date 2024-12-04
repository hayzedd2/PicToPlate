"use client";

import React, { useCallback, useEffect } from "react";

interface SuggestionProps {
  suggestion: string;
  onSuggestionSelect: (suggestion: string) => void;
}
const SuggestionPill = ({
  suggestion,
  onSuggestionSelect,
}: SuggestionProps) => {
  const handleClick = useCallback(() => {
    onSuggestionSelect(`How to make ${suggestion}`);
  }, [suggestion, onSuggestionSelect]);
  return (
    <button
      onClick={handleClick}
      className="rounded-[20px]  cursor-pointer focus-none outline-none font-[500] text-[14px] bx-shadow-light py-2 px-4"
      type="submit"
    >
      {suggestion}
    </button>
  );
};

export default SuggestionPill;
