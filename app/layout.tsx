import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { integrations, organization, siteConfig } from "../lib/site";
import { Analytics } from "./components/Analytics";
import { AttributionCapture } from "./components/AttributionCapture";
import { ConsentBanner } from "./components/ConsentBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: organization.name, url: organization.website }],
  creator: organization.name,
  publisher: organization.name,
  category: "Cybersecurity",
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
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
  // P0-1: meta-tags de verificación; solo se emiten si la variable de entorno tiene valor.
  verification: {
    google: integrations.gscVerification,
    other: integrations.bingVerification
      ? { "msvalidate.01": integrations.bingVerification }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.defaultLocale} className={inter.variable}>
      <body>
        {children}
        <AttributionCapture />
        {/* Sin GA4 configurado no hay cookies no esenciales y no se muestra el banner. */}
        {integrations.ga4Id ? (
          <>
            <ConsentBanner privacyUrl={organization.privacyUrl} />
            <Analytics gaId={integrations.ga4Id} />
          </>
        ) : null}
      </body>
    </html>
  );
}
