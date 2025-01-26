import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Image from "next/image";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "../components/provider";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeoBase Test",
  description: "NeoBase Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* 
        <div className="fixed inset-0 z-[-1]">
          <Image
            src="/neon-background.svg"
            alt="background"
            className="w-full"
            width={1920}
            height={1080}
            priority
          />
          <Image
            src="/neon-background.svg"
            alt="background"
            className="w-full transform rotate-180 scale-x-[-1]"
            width={1920}
            height={1080}
          />
        </div> 
        */}
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
