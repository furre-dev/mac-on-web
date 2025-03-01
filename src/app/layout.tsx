"use client";

import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local"
import { ContactProvider } from "@/components/context/ContactContext";
import { MessageProvider } from "@/components/context/MessagesContext";

const SFProDisplay = localFont({
  src: [
    {
      path: "./fonts/SFProText-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFProText-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SFProText-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${SFProDisplay.className} antialiased min-h-screen overflow-hidden flex justify-center`}>
        <ContactProvider>
          <MessageProvider>
            {children}
          </MessageProvider >
        </ContactProvider >
      </body>
    </html>
  );
}
