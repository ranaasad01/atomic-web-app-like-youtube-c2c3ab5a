import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StreamVibe — Watch, Share & Discover Videos",
  description:
    "StreamVibe is a dark-mode video sharing platform where you can upload, browse, and interact with videos from creators around the world.",
  keywords: ["video", "streaming", "upload", "watch", "creators", "StreamVibe"],
  authors: [{ name: "StreamVibe Team" }],
  openGraph: {
    title: "StreamVibe — Watch, Share & Discover Videos",
    description: "Upload, browse, and interact with videos from creators around the world.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-[#0F0F0F] text-white font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}