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
  // Metadata de la home: doc 48 §0 (texto aprobado). OG replica title/description.
  title: "Gestión de vulnerabilidades y remediación | VULNERA by TECDEX",
  description:
    "Plataforma de TECDEX para evaluar activos propios o autorizados, entender cada hallazgo y gestionar su corrección, del hallazgo al cierre. En desarrollo: agenda una demo guiada.",
  ogImageAlt: "VULNERA by TECDEX",
  /** Bajada de marca del footer (doc 48 §1) */
  tagline: "Gestión de vulnerabilidades con alcance autorizado, del hallazgo al cierre comprobado.",
  themeColor: "#2B3944",
};

export const organization = {
  name: "TECDEX",
  legalName: "Servicios Tecnológicos TecDex SpA",
  id: "https://tecdex.net/#organization",
  productId: "https://tecdex.net/#vulnera",
  website: "https://tecdex.net/",
  privacyUrl: "https://tecdex.net/politicas-de-privacidad/",
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
