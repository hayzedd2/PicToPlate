// components/TextGenerator.js
"use client";
import { useState, useEffect } from "react";
import { inference } from "../../utils/huggingface";
import { AccurateData } from "@/types/type";
import Videos from "./Videos";

const TextGenerator = ({
  accurateData,
}: {
  accurateData: AccurateData | null;
}) => {
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (accurateData?.label) {
      startGeneration(accurateData.label);
    }
  }, [accurateData]);

  const startGeneration = async (prompt: string) => {
    setIsGenerating(true);
    setGeneratedText("");

    const response = await inference.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        {
          role: "user",
          content: `Your work is to provide a comprehensive, step-by-step guide on how to prepare ${prompt}, including detailed information on the required ingredients, cooking methods, and techniques.You are not expecting any reply back so dont end with a question `,
        },
      ],
      max_tokens: 1000,
    });

    const formattedText = response?.choices[0]?.message?.content
      ?.split("\n")
      .map((line) => {
        if (line.endsWith("**")) {
          return `<strong>${line.replace(/^\*\*\s*|\*\*$/g, "")}</strong>`;
        } else if (line.startsWith("*")) {
          return `<li>${line.replace(/^\*\s*/, "")}</li>`;
        } else if (line.startsWith("**") && line.endsWith("**")) {
          return `<strong>${line.replace(/^\*\*\s*|\*\*$/g, "")}</strong>`;
        } else {
          return `<p>${line}</p>`;
        }
      })
      .join("");
    setGeneratedText(formattedText!);
    setIsGenerating(false);
  };

  return (
    <div className="w-full items-center justify-center flex flex-col">
      {isGenerating && (
        <div className="flex gap-1 items-center">
          Generating instrutions
          <svg
            className="h-4 w-4 text-[#111110] spinner"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth={"4"}
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {generatedText && (
        <div className="flex flex-col gap-1 w-full">
          <div
            dangerouslySetInnerHTML={{ __html: generatedText }}
            style={{ whiteSpace: "pre-wrap" }}
          />
          <Videos query={accurateData!.label} />
        </div>
      )}
    </div>
  );
};

export default TextGenerator;
