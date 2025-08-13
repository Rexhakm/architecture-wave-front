import type { Metadata } from "next";
import { mazzardSoft } from "@/fonts";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Architecture Wave - Your atlas to a life with good design",
  description: "Discover the stories, trends, and experiences that shape how we live, work, and connect, blending everyday lifestyle with rich cultural insights.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mazzardSoft.variable} antialiased min-h-screen flex flex-col`}
        style={{ background: '#E2E2E2' }}
      >
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
