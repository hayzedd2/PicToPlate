export const copyText = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (err) {
    console.log("Error writing text", err);
  }
};
