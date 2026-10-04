import type { MetadataRoute } from "next";
import { absoluteUrl, routes } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}
