import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "../lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: "TCDX ThreatWatch by TECDEX | Pentesting continuo y gestión de superficie expuesta",
    template: "%s | TCDX ThreatWatch by TECDEX",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "TECDEX" }],
  creator: "TECDEX",
  publisher: "TECDEX",
  category: "Cybersecurity",
  keywords: siteConfig.keywords,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    images: [
      {
        url: "/og-threatwatch.svg",
        width: 1200,
        height: 630,
        alt: "TCDX ThreatWatch by TECDEX - Pentesting continuo y gestión de exposición",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.ogTitle,
    description: siteConfig.ogDescription,
    images: ["/og-threatwatch.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo-threatwatch-header.png", type: "image/png" },
    ],
    apple: [{ url: "/logo-threatwatch-header.png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06111f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}
