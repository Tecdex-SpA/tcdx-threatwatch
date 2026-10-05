import type { ReactNode } from "react";
import { pages, routes, type SitePage } from "../../lib/site";

// Plantilla de páginas de contenido (doc 47, P1-3): H1 con la consulta → bloque
// respuesta (P1-2, en el HTML inicial) → H2 → tabla → autoría/fuentes → enlaces
// internos → 1 CTA de demo con `location`.

export function PageHero({ page, title, answer }: { page: SitePage; title: string; answer: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container">
        <nav className="breadcrumb" aria-label="Migas de pan">
          <a href={pages.home.path}>{pages.home.name}</a>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{page.name}</span>
        </nav>
        <h1>{title}</h1>
        <p className="answer-block">{answer}</p>
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
  const links = routes.filter((page) => page.path !== current.path);
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
          <h2>Obtén una primera lectura, sobre datos de ejemplo.</h2>
        </div>
        <a className="button primary" href="/#demo" data-cta="demo">Solicitar demo guiada</a>
      </div>
    </section>
  );
}
