import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://threatwatch.tecdex.cl"),
  title: "TCDX ThreatWatch by TECDEX | Pentesting continuo y gestión de superficie expuesta",
  description:
    "Plataforma SaaS chilena para apoyar pentesting continuo, escaneos controlados, hallazgos priorizados, evidencia técnica y reportes ejecutivos sobre activos propios o autorizados.",
  keywords: [
    "pentesting continuo Chile",
    "gestión de superficie expuesta",
    "escaneo de vulnerabilidades autorizado",
    "reportes de ciberseguridad ejecutivos",
    "pentesting SaaS",
    "seguridad para fintech",
    "OWASP ZAP Chile",
    "Nmap Nuclei ZAP reportes",
    "auditoría de activos expuestos",
    "TECDEX ciberseguridad",
  ],
  openGraph: {
    title: "TCDX ThreatWatch by TECDEX — Pentesting continuo y gestión de exposición",
    description:
      "Controle scopes, valide ownership, ejecute scans autorizados y genere reportes ejecutivos/técnicos para priorizar riesgos de seguridad.",
    type: "website",
    url: "https://threatwatch.tecdex.cl",
    images: [{ url: "/og-threatwatch.svg", width: 1200, height: 630, alt: "TCDX ThreatWatch by TECDEX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TCDX ThreatWatch by TECDEX",
    description: "Pentesting continuo con control de alcance, autorización y reportes ejecutivos.",
    images: ["/og-threatwatch.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL">
      <body>{children}</body>
    </html>
  );
}
