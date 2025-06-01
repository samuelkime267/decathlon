import type { Metadata } from "next";
import "@/styles/globals.css";
import { font } from "@/data/fonts.data";

export const metadata: Metadata = {
  title: "Enter Title",
  description: "Enter Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font} antialiased`}>{children}</body>
    </html>
  );
}
