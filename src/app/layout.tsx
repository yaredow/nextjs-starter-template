import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TRPCProvider } from "@/trpc/client";

import { cn } from "@/lib/utils";
import { fonts } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Title",
  description: "description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen font-sans", fonts)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider>
            <NextTopLoader />
            <div>{children}</div>
            <Toaster />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
