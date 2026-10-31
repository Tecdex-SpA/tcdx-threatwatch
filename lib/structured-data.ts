import { faqPageFaqs } from "./faqs";
import {
  guideDates,
  owaspFaqs,
  pentestingFaqs,
  type Faq,
} from "./guides";
import { absoluteUrl, guides, organization, pages, siteConfig, type SitePage } from "./site";

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

/** Producto (doc 48 §8.2), mismo @id que en tecdex.net; descripción del doc 50 §6. */
const softwareApplication: JsonLdNode = {
  "@type": "SoftwareApplication",
  "@id": organization.productId,
  name: siteConfig.shortName,
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  url: absoluteUrl("/"),
  inLanguage: "es",
  description:
    "Plataforma de TECDEX que automatiza las etapas repetibles del pentesting sobre activos autorizados y gestiona cada hallazgo hasta su corrección. En acceso anticipado.",
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

/** Migas de pan (doc 48 §8.4): Inicio → [pilar] → página. */
function breadcrumb(page: SitePage): JsonLdNode {
  const trail = page.parent ? [pages.home, page.parent, page] : [pages.home, page];
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
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
  mainEntity: faqPageFaqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

function graph(nodes: JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** FAQPage de una guía: el texto sale del mismo módulo que renderiza la página. */
function guideFaqPage(page: SitePage, items: Faq[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(page.path)}#faq`,
    inLanguage: siteConfig.defaultLocale,
    mainEntity: items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/** Article de una guía (P1-9, §3 de los docs 56 y 57). */
function guideArticle(
  page: SitePage,
  parts: { headline: string; about: JsonLdNode[]; mentions: JsonLdNode[]; citation: string[] },
): JsonLdNode {
  return {
    "@type": "Article",
    "@id": `${absoluteUrl(page.path)}#article`,
    headline: parts.headline,
    description: page.description,
    inLanguage: siteConfig.defaultLocale,
    url: absoluteUrl(page.path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(page.path) },
    isPartOf: { "@id": website["@id"] as string },
    image: absoluteUrl("/og.png"),
    datePublished: guideDates.published.iso,
    dateModified: guideDates.revised.iso,
    author: orgLink,
    publisher: orgLink,
    about: parts.about,
    mentions: parts.mentions,
    citation: parts.citation,
  };
}

const productLink = { "@id": organization.productId };
const complianceLink = { "@id": "https://tecdex.net/#tecdex-compliance" };

function org(name: string, url: string): JsonLdNode {
  return { "@type": "Organization", name, url };
}

const owaspTopTenUrl = "https://top10.owasp.org/2025/";

/** Las 10 categorías, con el nombre original en inglés (doc 57 §3). */
const owaspCategories = [
  "A01:2025 Broken Access Control",
  "A02:2025 Security Misconfiguration",
  "A03:2025 Software Supply Chain Failures",
  "A04:2025 Cryptographic Failures",
  "A05:2025 Injection",
  "A06:2025 Insecure Design",
  "A07:2025 Authentication Failures",
  "A08:2025 Software or Data Integrity Failures",
  "A09:2025 Security Logging and Alerting Failures",
  "A10:2025 Mishandling of Exceptional Conditions",
].map((name) => ({ "@type": "DefinedTerm", name, inDefinedTermSet: owaspTopTenUrl }));

const pentestingGuide = guides.pentestingAutomatizado;
const owaspGuide = guides.owaspTop10;

export const structuredData = {
  home: graph([organizationRef, website, softwareApplication]),
  comoFunciona: graph([organizationRef, breadcrumb(pages.comoFunciona)]),
  gestion: graph([organizationRef, breadcrumb(pages.gestion)]),
  preguntas: graph([organizationRef, breadcrumb(pages.preguntas), faqPage]),
  // `organizationRef` va en el grafo porque Google exige `author.name` y
  // `publisher.name`: un `@id` suelto apuntando a tecdex.net no le resuelve.
  // Es la misma referencia (@id + name) del doc 48 §8.1 que usan las demás rutas,
  // no una entidad nueva.
  pentestingAutomatizado: graph([
    organizationRef,
    guideArticle(pentestingGuide, {
      headline: "Pentesting automatizado: qué es y en qué se diferencia del pentest manual",
      about: [productLink, { "@type": "Thing", name: "Pentesting automatizado" }],
      mentions: [
        productLink,
        complianceLink,
        org("NIST", "https://www.nist.gov/"),
        org("OWASP Foundation", "https://owasp.org/"),
        org("National Cyber Security Centre (NCSC)", "https://www.ncsc.gov.uk/"),
        org("Center for Internet Security (CIS)", "https://www.cisecurity.org/"),
        org("PCI Security Standards Council", "https://www.pcisecuritystandards.org/"),
      ],
      citation: [
        "https://csrc.nist.gov/pubs/sp/800/115/final",
        // Sin la URL de PTES: no responde (2026-10-31) y `citation` debe resolver.
        "https://owasp.org/www-project-web-security-testing-guide/",
        "https://www.ncsc.gov.uk/guidance/penetration-testing",
        "https://www.cisecurity.org/controls/penetration-testing",
        "https://www.pcisecuritystandards.org/document_library/",
      ],
    }),
    guideFaqPage(pentestingGuide, pentestingFaqs),
    breadcrumb(pentestingGuide),
  ]),
  owaspTop10: graph([
    organizationRef,
    guideArticle(owaspGuide, {
      headline: "OWASP Top 10 explicado para empresas",
      about: [
        productLink,
        {
          "@type": "CreativeWork",
          "@id": owaspTopTenUrl,
          name: "OWASP Top 10:2025",
          url: owaspTopTenUrl,
          publisher: org("OWASP Foundation", "https://owasp.org/"),
        },
      ],
      mentions: [
        productLink,
        complianceLink,
        org("OWASP Foundation", "https://owasp.org/"),
        ...owaspCategories,
        {
          "@type": "CreativeWork",
          name: "OWASP Application Security Verification Standard (ASVS) 5.0.0",
          url: "https://owasp.org/www-project-application-security-verification-standard/",
        },
      ],
      citation: [
        owaspTopTenUrl,
        "https://top10.owasp.org/2025/0x00_2025-Introduction/",
        "https://top10.owasp.org/2025/es/",
        "https://owasp.org/www-project-top-ten/",
        "https://owasp.org/www-project-application-security-verification-standard/",
      ],
    }),
    guideFaqPage(owaspGuide, owaspFaqs),
    breadcrumb(owaspGuide),
  ]),
};
