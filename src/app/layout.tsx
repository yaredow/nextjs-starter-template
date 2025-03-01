import NextTopLoader from "nextjs-toploader";

import { ThemeProvider } from "@/components/providers/theme-provider";

import { TRPCProvider } from "@/trpc/client";

import { fonts } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./globals.css";
import { SiteConfig } from "@/configs/site.config";
import {
  OrganizationJsonLd,
  WebsiteSchemaJsonLd,
} from "@/components/seo/structured-data";
import { Toaster } from "sonner";

export const metadata = SiteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <WebsiteSchemaJsonLd
          siteUrl={SiteConfig.openGraph?.url?.toString() || ""}
        />
        <OrganizationJsonLd
          name="Next.js Starter Template"
          url={SiteConfig.openGraph?.url?.toString() || ""}
          logo={`${SiteConfig.openGraph?.url}/logo.png`}
          sameAs={["https://github.com/yaredow/nextjs-starter-template"]}
        />
      </head>
      <body className={cn("min-h-screen font-sans", fonts)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCProvider key={0}>
            <NextTopLoader />
            <div>
              {children}
              <Toaster />
            </div>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
