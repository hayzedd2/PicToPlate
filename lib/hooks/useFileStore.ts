import { UploadState } from "@/types/type";
import { create } from "zustand";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export const useFileStore = create<UploadState>((set) => ({
  file: null,
  imageUrl: null,
  isLoading: false,
  error: null,
  setFile: async (file: File | null) => {
    if (!file) {
      set({ file: null, imageUrl: null, error: null });
      return;
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      set({
        error: {
          message:
            "Invalid file type. Please upload a valid image (JPEG, PNG, GIF, WebP)",
          code: "invalid-type",
        },
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      set({
        error: {
          message: "File size too large. Maximum size is 5MB",
          code: "invalid-size",
        },
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      // Create a URL for preview
      const objectUrl = URL.createObjectURL(file);

      set({
        file,
        imageUrl: objectUrl,
        isLoading: false,
      });
      console.log(file.name)
    } catch (error) {
      set({
        error: {
          message: "Failed to process image",
          code: "upload-failed",
        },
        isLoading: false,
      });
      console.log(error)
    }
  },
  setImageUrl: (url: string | null) => {
    set({ imageUrl: url });
  },
  resetUpload: () => {
    set({ file: null, imageUrl: null, error: null, isLoading: false });
  },
  clearError: () => {
    set({ error: null });
  },
}));
