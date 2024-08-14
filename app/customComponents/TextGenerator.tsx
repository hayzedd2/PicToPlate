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
      {isGenerating && <div>Generating instructions...</div>}
      {generatedText && (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: generatedText }}
            style={{ whiteSpace: "pre-wrap" }}
          />
          <Videos query={accurateData!.label} />
        </>
      )}
    </div>
  );
};

export default TextGenerator;
