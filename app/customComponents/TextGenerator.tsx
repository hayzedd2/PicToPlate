// components/TextGenerator.js
'use client';
import { useState, useEffect } from 'react';
import { inference } from '../../utils/huggingface';
import type { AccurateData } from '../../types';

const TextGenerator = ({ accurateData }: { accurateData: AccurateData | null }) => {
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (accurateData?.label) {
      startGeneration(accurateData.label);
    }
  }, [accurateData]);

  const startGeneration = async (prompt: string) => {
    setIsGenerating(true);
    setGeneratedText('');

    const response = await inference.chatCompletion({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    const generatedHtml = response?.choices[0]?.message?.content?.replace(/\n/g, '<br>');
    setGeneratedText(generatedHtml!);
    setIsGenerating(false);
  };

  return (
    <div>
      {isGenerating ? (
        <div>Generating text...</div>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: generatedText }}
          style={{ whiteSpace: 'pre-wrap' }}
        />
      )}
    </div>
  );
};

export default TextGenerator;