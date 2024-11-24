import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import type { Viewport } from "next";
import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google";
import "./globals.css";
import React from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
     children,
   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
          className={`${fontSans.variable} ${fontMono.variable} bg-background font-sans antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        <div className="relative flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
        </div>
      </ThemeProvider>
      </body>
      </html>
  );
}