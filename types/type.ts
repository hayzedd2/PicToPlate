import { ChatRequestOptions, Message } from "ai";

export interface AccurateData {
  label: string;
  score: number;
}

export type FileError = {
  message: string;
  code: "invalid-type" | "invalid-size" | "upload-failed";
};
export type UploadState = {
  file: File | null;
  imageUrl: string | null;
  isLoading: boolean;
  error: FileError | null;
  setFile: (file: File | null) => Promise<void>;
  setImageUrl: (url: string | null) => void;
  resetUpload: () => void;
  clearError: () => void;
};

export interface PopupPosition {
  x: number;
  y: number;
}

export interface TextHighlighterActionProps {
  x: number;
  y: number;
  selectedText: string;
  setPosition: React.Dispatch<React.SetStateAction<PopupPosition | null>>;
}

export interface SendSuggestedMessageProps {
  input: string;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export interface InputControllerProps {
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  messages: Message[];
}
