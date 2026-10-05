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
  // Metadata de la home: doc 50 §1 (comunicación comercial v2). OG replica title/description.
  title: "Pentesting automatizado y gestión de vulnerabilidades | VULNERA",
  description:
    "VULNERA automatiza las etapas repetibles del pentesting sobre los activos que autorizas y convierte cada hallazgo en un plan de corrección. Plataforma de TECDEX. Agenda tu demo.",
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
  /** Texto prellenado que identifica el origen (P0-5, aprobado 2026-10-04). */
  whatsappMessage: "Hola, vengo de la web de VULNERA y quiero información.",
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

export type SitePage = {
  /** Ruta con barra final (trailingSlash: true): canonical == sitemap. */
  path: string;
  /** Nombre corto para migas de pan (BreadcrumbList) y enlaces internos. */
  name: string;
  /** <title> y og:title (doc 48 §0). */
  title: string;
  /** <meta name="description"> y og:description (doc 48 §0). */
  description: string;
  /** Fecha del último cambio de contenido de la ruta (no la del build). */
  lastModified: string;
  priority: number;
};

/**
 * Páginas publicadas: fuente única para metadata, sitemap y migas de pan.
 * Al cambiar el contenido de una ruta, actualizar su `lastModified`.
 */
export const pages = {
  home: {
    path: "/",
    name: "Inicio",
    title: siteConfig.title,
    description: siteConfig.description,
    lastModified: "2026-10-05",
    priority: 1,
  },
  comoFunciona: {
    path: "/como-funciona/",
    name: "Cómo funciona",
    title: "Cómo funciona VULNERA: pentesting automatizado con alcance autorizado",
    description:
      "Define el alcance, valida la autorización y deja que VULNERA automatice reconocimiento, descubrimiento y detección. Tú decides qué corregir primero.",
    lastModified: "2026-10-05",
    priority: 0.8,
  },
  gestion: {
    path: "/gestion-de-vulnerabilidades/",
    name: "Gestión de vulnerabilidades",
    title: "Qué es la gestión de vulnerabilidades y cómo hacerla | VULNERA",
    description:
      "Guía práctica de gestión de vulnerabilidades para empresas: del hallazgo a la remediación comprobada. Qué es, etapas, buenas prácticas y errores comunes.",
    lastModified: "2026-10-05",
    priority: 0.8,
  },
  preguntas: {
    path: "/preguntas-frecuentes/",
    name: "Preguntas frecuentes",
    title: "Preguntas frecuentes sobre VULNERA | TECDEX",
    description:
      "Respuestas claras sobre VULNERA: qué es, qué recibe tu empresa, si reemplaza un pentest, uso responsable y estado actual del producto.",
    lastModified: "2026-10-05",
    priority: 0.7,
  },
} satisfies Record<string, SitePage>;

export const routes: SitePage[] = Object.values(pages);

export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.domain}${path.startsWith("/") ? path : `/${path}`}`;
}
