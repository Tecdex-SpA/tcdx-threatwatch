import { faqs } from "./faqs";
import { absoluteUrl, organization, pages, siteConfig, type SitePage } from "./site";

// JSON-LD (P1-4, doc 48 §8). Reutiliza los @id del grafo de tecdex.net: no se crea
// una entidad nueva ni para TECDEX ni para VULNERA. Sin offers, aggregateRating ni review.

type JsonLdNode = Record<string, unknown>;

/** Referencia a la organización (doc 48 §8.1): solo @id + name. */
const organizationRef: JsonLdNode = {
  "@type": "Organization",
  "@id": organization.id,
  name: organization.name,
};

const orgLink = { "@id": organization.id };

/** Producto (doc 48 §8.2), mismo @id que en tecdex.net, descripción honesta. */
const softwareApplication: JsonLdNode = {
  "@type": "SoftwareApplication",
  "@id": organization.productId,
  name: siteConfig.shortName,
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  url: absoluteUrl("/"),
  inLanguage: "es",
  description:
    "Plataforma de TECDEX para gestionar vulnerabilidades con alcance autorizado: evaluar, entender los hallazgos y seguir su corrección, del hallazgo al cierre. En desarrollo a octubre de 2026.",
  author: orgLink,
  publisher: orgLink,
  provider: orgLink,
};

/** Sitio (doc 48 §8.5). */
const website: JsonLdNode = {
  "@type": "WebSite",
  "@id": `${absoluteUrl("/")}#website`,
  url: absoluteUrl("/"),
  name: siteConfig.name,
  publisher: orgLink,
  inLanguage: siteConfig.defaultLocale,
};

/** Migas de pan (doc 48 §8.4): Inicio → página. */
function breadcrumb(page: SitePage): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [pages.home, page].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** FAQPage (doc 48 §8.3): solo preguntas visibles, texto idéntico. */
const faqPage: JsonLdNode = {
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

function graph(nodes: JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export const structuredData = {
  home: graph([organizationRef, website, softwareApplication]),
  comoFunciona: graph([organizationRef, breadcrumb(pages.comoFunciona)]),
  gestion: graph([organizationRef, breadcrumb(pages.gestion)]),
  preguntas: graph([organizationRef, breadcrumb(pages.preguntas), faqPage]),
};
