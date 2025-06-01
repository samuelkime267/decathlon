import type { Metadata } from "next";
import "@/styles/globals.styles.css";
import { fonts } from "@/data/fonts.data";

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
      <body className={`${fonts} antialiased`}>{children}</body>
    </html>
  );
}
