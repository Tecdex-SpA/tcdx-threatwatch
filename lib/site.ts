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
    "VULNERA está en desarrollo para apoyar evaluaciones técnicas de activos autorizados. Servicio aún no habilitado para contratación. Solicita información a TECDEX.",
  ogImageAlt: "VULNERA by TECDEX",
  /** Bajada de marca del footer (doc 50 §2.6) */
  tagline: "Pentesting automatizado y gestión de vulnerabilidades | TECDEX",
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
  /** og:title propio cuando el doc lo separa del <title> (guías, doc 58 PASO 2). */
  ogTitle?: string;
  /** changefreq del sitemap; por defecto "weekly". */
  changeFrequency?: "weekly" | "monthly";
  /** Nivel intermedio de las migas de pan (P1-9: el pilar). */
  parent?: SitePage;
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
    lastModified: "2026-11-05",
    priority: 1,
  },
  comoFunciona: {
    path: "/como-funciona/",
    name: "Cómo funciona",
    title: "Cómo funciona VULNERA: pentesting automatizado con alcance autorizado",
    description:
      "Conoce el flujo previsto de VULNERA: alcance autorizado, validación de propiedad y evaluaciones técnicas en desarrollo. Servicio aún no habilitado.",
    lastModified: "2026-11-05",
    priority: 0.8,
  },
  gestion: {
    path: "/gestion-de-vulnerabilidades/",
    name: "Gestión de vulnerabilidades",
    title: "Qué es la gestión de vulnerabilidades y cómo hacerla | VULNERA",
    description:
      "Guía práctica de gestión de vulnerabilidades para empresas: del hallazgo a la remediación comprobada. Qué es, etapas, buenas prácticas y errores comunes.",
    lastModified: "2026-10-31",
    priority: 0.8,
  },
  preguntas: {
    path: "/preguntas-frecuentes/",
    name: "Preguntas frecuentes",
    title: "Preguntas frecuentes sobre VULNERA | TECDEX",
    description:
      "Preguntas frecuentes sobre VULNERA, plataforma en desarrollo: capacidades previstas, autorización de activos, información contemplada y contacto con TECDEX.",
    lastModified: "2026-11-05",
    priority: 0.7,
  },
} satisfies Record<string, SitePage>;

/**
 * Guías del clúster del pilar (P1-9, docs 56 a 58). Cuelgan de
 * `/gestion-de-vulnerabilidades/` en las migas de pan y en el grafo de enlaces.
 * Van en el sitemap y en `llms.txt`, pero no en el menú principal (doc 58 PASO 4.4).
 */
export const guides = {
  pentestingAutomatizado: {
    path: "/pentesting-automatizado/",
    name: "Pentesting automatizado",
    title: "Pentesting automatizado: qué es y diferencias | VULNERA",
    description:
      "Qué es el pentesting automatizado, qué etapas se automatizan y en qué se diferencia del pentest manual y del escaneo de vulnerabilidades.",
    ogTitle: "Pentesting automatizado: qué es y en qué se diferencia del pentest manual",
    lastModified: "2026-11-05",
    changeFrequency: "monthly",
    priority: 0.7,
    parent: pages.gestion,
  },
  owaspTop10: {
    path: "/owasp-top-10/",
    name: "OWASP Top 10",
    title: "OWASP Top 10 2025 explicado para empresas | VULNERA",
    description:
      "Las 10 categorías del OWASP Top 10 2025 explicadas para empresas: qué es cada riesgo, un ejemplo, su impacto y cómo prevenirlo.",
    ogTitle: "OWASP Top 10 (edición 2025) explicado para empresas",
    lastModified: "2026-11-05",
    changeFrequency: "monthly",
    priority: 0.7,
    parent: pages.gestion,
  },
} satisfies Record<string, SitePage>;

/** Páginas del menú y de «Páginas relacionadas» (las 4 de P1, sin las guías). */
export const corePages: SitePage[] = Object.values(pages);

/** Todo lo que entra al sitemap y a `llms.txt`. */
export const routes: SitePage[] = [...corePages, ...Object.values(guides)];

export const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.domain}${path.startsWith("/") ? path : `/${path}`}`;
}
