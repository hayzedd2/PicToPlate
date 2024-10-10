import type { Metadata } from "next";
import {Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
const newsReader = Newsreader({ subsets: ["latin"], display: "swap" });
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
      <body className={newsReader.className}>
        <main>{children}</main>
        <Toaster />
        <Analytics/>
      </body>
    </html>
  );
}
