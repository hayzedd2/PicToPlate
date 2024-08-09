import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";
const newsReader = Newsreader({subsets : ["latin"] , display : "swap"})
export const metadata: Metadata = {
  title: "PicToPlate",
  description: "Food recipe generation ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={newsReader.className}>{children}</body>
    </html>
  );
}
