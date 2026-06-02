import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.domain,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
