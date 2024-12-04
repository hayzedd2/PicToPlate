export const ShareText = async (text: string) => {
  try {
    await navigator.share({ text });
  } catch (err) {
    console.error("Error sharing:", err);
  }
};
