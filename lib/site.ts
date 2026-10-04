// Fuente única de configuración del sitio (misión doc 47, P0-2).
// Metadata y componentes leen de aquí; los IDs externos vienen de variables
// de entorno (ver .env.example) y en producción se cargan en Vercel.

function env(key: string): string | undefined {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
}

const siteUrl = (env("SITE_URL") ?? "https://vulnera.tecdex.net").replace(/\/+$/, "");

export const siteConfig = {
  /** Origen sin barra final; usar `absoluteUrl()` para construir URLs. */
  domain: siteUrl,
  name: "VULNERA by TECDEX",
  shortName: "VULNERA",
  /** Idioma del documento (lang) */
  defaultLocale: "es-CL",
  /** Formato OpenGraph */
  locale: "es_CL",
  title: "VULNERA by TECDEX | Pentesting continuo y gestión de superficie expuesta",
  description:
    "Plataforma SaaS chilena para apoyar pentesting continuo, gestión de superficie expuesta, escaneos controlados, hallazgos priorizados, evidencia técnica y reportes ejecutivos/técnicos sobre activos propios o autorizados.",
  ogTitle: "VULNERA by TECDEX — Pentesting continuo y gestión de exposición",
  ogDescription:
    "Controle scopes, valide ownership, ejecute scans autorizados y genere reportes ejecutivos/técnicos para priorizar riesgos de seguridad.",
  ogImageAlt: "VULNERA by TECDEX - Pentesting continuo y gestión de exposición",
  manifestDescription:
    "Pentesting continuo y gestión de superficie expuesta para activos propios o autorizados.",
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
    "superficie de ataque externa",
    "gestión de vulnerabilidades Chile",
  ],
  themeColor: "#2B3944",
};

export const organization = {
  name: "TECDEX",
  legalName: "Servicios Tecnológicos TecDex SpA",
  id: "https://tecdex.net/#organization",
  productId: "https://tecdex.net/#vulnera",
  website: "https://tecdex.net/",
};

export const contact = {
  email: "contacto@tecdex.net",
  /** E.164 sin "+" para wa.me */
  whatsapp: "56989995290",
  whatsappLabel: "+56 9 8999 5290",
  phone: "+56233046291",
  phoneLabel: "+56 2 3304 6291",
  addressLines: ["Guardia Vieja 181, Of. 506", "Providencia, Santiago"],
};

export const integrations = {
  /** GA4 propio de VULNERA (ACCIÓN_MARIO: crear propiedad y cargar el ID en Vercel). */
  ga4Id: env("ANALYTICS_GA4_ID"),
  /** Meta-tag de verificación de Google Search Console (propiedad de prefijo). */
  gscVerification: env("GSC_VERIFICATION"),
  /** Meta-tag de verificación de Bing Webmaster Tools (msvalidate.01). */
  bingVerification: env("BING_VERIFICATION"),
};

export const features = {
  /** Modo preparación: no se libera venta al público. */
  salesPublic: env("FEATURE_SALES_PUBLIC") === "true",
};

/**
 * Rutas publicadas. `lastModified` es la fecha del último cambio de contenido
 * de cada ruta (no la del build): actualizarla al modificar esa página.
 * Con `trailingSlash: true` toda ruta termina en "/" (canonical == sitemap).
 */
export const routes: { path: string; lastModified: string; priority: number }[] = [
  { path: "/", lastModified: "2026-10-04", priority: 1 },
];

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.domain}${path.startsWith("/") ? path : `/${path}`}`;
}
