import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/search?q="],
    },
    sitemap: ["https://next-start.yaredyilma.dev"],
  };
}
