import type { ReactNode } from "react";
import { corePages, organization, pages, type SitePage } from "../../lib/site";
import type { Faq, Source } from "../../lib/guides";

// Plantilla de páginas de contenido (doc 47, P1-3): H1 con la consulta → bloque
// respuesta (P1-2, en el HTML inicial) → H2 → tabla → autoría/fuentes → enlaces
// internos → 1 CTA de demo con `location`.

export function PageHero({ page, title, answer }: { page: SitePage; title: string; answer: ReactNode }) {
  // Migas de pan: Inicio › [pilar, si la página cuelga de él] › página actual.
  const trail = page.parent ? [pages.home, page.parent] : [pages.home];
  return (
    <section className="page-hero">
      <div className="container">
        <nav className="breadcrumb" aria-label="Migas de pan">
          {trail.map((item) => (
            <span key={item.path} className="breadcrumb-step">
              <a href={item.path}>{item.name}</a>
              <span aria-hidden="true">›</span>
            </span>
          ))}
          <span aria-current="page">{page.name}</span>
        </nav>
        <h1>{title}</h1>
        <p className="answer-block" id="respuesta-directa">{answer}</p>
      </div>
    </section>
  );
}

export function ContentTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="table-scroll">
      <table className="content-table">
        <thead>
          <tr>{head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}</th> : <td key={cellIndex}>{cell}</td>,
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RelatedPages({ current }: { current: SitePage }) {
  const links = corePages.filter((page) => page.path !== current.path);
  return (
    <nav className="related-pages" aria-label="Páginas relacionadas">
      <span>Páginas relacionadas</span>
      {links.map((page) => <a key={page.path} href={page.path}>{page.name}</a>)}
    </nav>
  );
}

export function DemoCta({ location }: { location: string }) {
  return (
    <section className="cta-section" data-location={location}>
      <div className="container cta-card">
        <div>
          <p className="eyebrow light">Demo guiada</p>
          <h2>Agenda tu demo de VULNERA.</h2>
        </div>
        <a className="button primary" href="/#demo" data-cta="demo">Agenda tu demo</a>
      </div>
    </section>
  );
}

/** Preguntas frecuentes de una guía: H3 + párrafo, siempre en el DOM (doc 58 PASO 1). */
export function GuideFaq({ items }: { items: Faq[] }) {
  return (
    <>
      <h2>Preguntas frecuentes</h2>
      {items.map(([question, answer]) => (
        <div key={question} className="guide-faq">
          <h3>{question}</h3>
          <p>{answer}</p>
        </div>
      ))}
    </>
  );
}

/** Autoría, fechas y fuentes de una guía (P1-7). */
export function GuideByline({
  published,
  revised,
  sources,
}: {
  published: { iso: string; label: string };
  revised: { iso: string; label: string };
  sources: Source[];
}) {
  return (
    <aside className="byline" aria-label="Autoría y fuentes">
      <p>
        <span className="byline-label">Autor:</span>{" "}
        <a href="https://tecdex.net/quienes-somos/" target="_blank" rel="noopener">{organization.name}</a>
        {" · "}
        <span className="byline-label">Publicado:</span> <time dateTime={published.iso}>{published.label}</time>
        {" · "}
        <span className="byline-label">Revisado:</span> <time dateTime={revised.iso}>{revised.label}</time>
      </p>
      <p>
        <span className="byline-label">Fuentes:</span>
      </p>
      <ul className="source-list">
        {sources.map(([label, href]) => (
          <li key={href}>
            <a href={href} target="_blank" rel="noopener">{label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Bloque «Guías relacionadas» del pilar y de la FAQ (doc 58 PASO 4.1c y 4.2b). */
export function GuideCards({ title = "Guías relacionadas" }: { title?: string }) {
  const cards = [
    ["/pentesting-automatizado/", "Pentesting automatizado: qué es y en qué se diferencia del pentest manual"],
    ["/owasp-top-10/", "OWASP Top 10 explicado para empresas"],
  ];
  return (
    <section className="guide-cards-section">
      <div className="container">
        <h2>{title}</h2>
        <div className="guide-cards">
          {cards.map(([href, label]) => (
            <a key={href} className="guide-card" href={href}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
