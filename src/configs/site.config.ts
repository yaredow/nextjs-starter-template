import { Metadata } from "next";

export const SiteConfig: Metadata = {
  title: {
    template: "%s | Next starter",
    default: "Your Product - Feature rich Next.js starter",
  },
  description: "A comprehensive description of your product",
  metadataBase: new URL("https://next-start.yaredyilma.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://next-start.yaredyilma.dev",
    title: "Next starter",
    description: "A comprehensive description of your product",
    siteName: "Next starter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Product",
    description: "A feature rich Next.js starter template",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
  },
};
