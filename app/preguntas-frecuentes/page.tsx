import type { Metadata } from "next";
import { structuredData } from "../../lib/structured-data";
import { JsonLd } from "../components/JsonLd";
import { faqs } from "../../lib/faqs";
import { pageMetadata } from "../../lib/seo";
import { pages } from "../../lib/site";
import { DemoCta, PageHero, RelatedPages } from "../components/ContentPage";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

// Copy aprobado: FAQ v2 (doc 50 §4). Description y bloque respuesta aprobados por
// Mario el 2026-10-05.

const page = pages.preguntas;

export const metadata: Metadata = pageMetadata(page);

export default function PreguntasPage() {
  return (
    <main id="inicio">
      <JsonLd data={structuredData.preguntas} />
      <SiteHeader />
      <PageHero
        page={page}
        title="Preguntas frecuentes sobre VULNERA"
        answer="Respuestas directas sobre VULNERA: qué parte del pentesting automatiza, qué activos puedes evaluar, qué obtiene tu empresa, cómo empezar y cómo se relaciona con auditorías ISO 27001 y la Ley 21.663. Si tu duda no está aquí, agenda una demo y la revisamos con tu caso."
      />

      <section className="prose-section">
        <div className="container">
          <div className="prose faq-page">
          {faqs.map(([question, answer]) => (
            <div className="faq-item" key={question}>
              <h2>{question}</h2>
              <p>{answer}</p>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="related-section">
        <div className="container">
          <RelatedPages current={page} />
        </div>
      </section>

      <DemoCta location="preguntas-frecuentes" />
      <SiteFooter />
    </main>
  );
}
