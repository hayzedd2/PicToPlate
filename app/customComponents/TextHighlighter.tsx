"use client";

import React, { useState, useEffect, useCallback } from "react";
import TextHighlighterActions from "./TextHighlighterActions";
import { PopupPosition } from "@/types/type";

const TextHighlighter = () => {
  const [selectedText, setSelectedText] = useState<string>("");
  const [position, setPosition] = useState<PopupPosition | null>(null);

  const handleTextSelection = useCallback((e: MouseEvent) => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text) {
      const targetElement = (e.target as HTMLElement).closest(
        `.selectable-text`
      );
      if (!targetElement) {
        setPosition(null);
        return;
      }
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();
      if (rect) {
        setSelectedText(text);
        setPosition({
          x: rect.left,
          y: rect.bottom + 10,
        });
      }
    }
  }, []);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        position &&
        !(e.target as HTMLElement).closest(".text-highlighter-options")
      ) {
        setPosition(null);
      }
    },
    [position]
  );
  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleTextSelection, handleClickOutside]);
  
  if (!position) return null;

  return (
    <TextHighlighterActions
      x={position.x}
      y={position.y}
      selectedText={selectedText}
      setPosition={setPosition}
    />
  );
};

export default TextHighlighter;
