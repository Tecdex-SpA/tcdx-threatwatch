import type { Metadata } from "next";
import { siteConfig, type SitePage } from "./site";

// Metadata por ruta (P1-1): title, description, canonical con barra final,
// OpenGraph y Twitter replican title/description (doc 48 §0); og:image global.
export function pageMetadata(page: SitePage): Metadata {
  const image = { url: "/og.png", width: 1200, height: 630, alt: siteConfig.ogImageAlt };
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: page.path,
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image.url],
    },
  };
}
