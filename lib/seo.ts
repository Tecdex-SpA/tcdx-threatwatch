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

/**
 * Metadata de las guías (P1-9, doc 58 PASO 2): igual que `pageMetadata`, pero
 * con `og:type=article`, su `og:title` propio y las fechas de publicación y
 * revisión. El `<title>` ya trae «| VULNERA»: se emite como absoluto.
 */
export function articleMetadata(
  page: SitePage,
  dates: { published: string; modified: string },
): Metadata {
  const base = pageMetadata(page);
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      title: page.ogTitle ?? page.title,
      publishedTime: dates.published,
      modifiedTime: dates.modified,
    },
  };
}
