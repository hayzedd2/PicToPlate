"use client";

import React, { useCallback, useEffect, useRef } from "react";
import SuggestionPill from "./SuggestionPill";
import useSuggestedMeals from "@/helpers/useSuggestedMeals";
import { SendSuggestedMessageProps } from "@/types/type";

const EmptyMessageState = ({
  input,
  handleSubmit,
  handleInputChange,
}: SendSuggestedMessageProps) => {
  const meals = useSuggestedMeals();
  const fromSuggestion = useRef(false);
  const handleSuggestionSelect = useCallback(
    (suggestion: string) => {
      fromSuggestion.current = true;
      handleInputChange({ target: { value: suggestion } } as any);
    },
    [handleInputChange, handleSubmit]
  );
  useEffect(() => {
    if (fromSuggestion.current && input.startsWith("How to make ")) {
      fromSuggestion.current = false;
      handleSubmit();
    }
  }, [input, handleSubmit]);
  return (
    <div className="w-full flex flex-col gap-4 max-w-[35rem] mx-auto items-center">
      <h2 className="text-[1.6rem] font-[500]">
        What do you want to make today?
      </h2>
      <div className="items-center w-full flex justify-center gap-3 flex-wrap">
        {meals.map((m, i) => (
          <SuggestionPill
            onSuggestionSelect={handleSuggestionSelect}
            suggestion={m}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default EmptyMessageState;
