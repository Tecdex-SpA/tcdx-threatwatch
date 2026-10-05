import type { Metadata } from "next";
import { structuredData } from "../../lib/structured-data";
import { JsonLd } from "../components/JsonLd";
import { faqs } from "../../lib/faqs";
import { pageMetadata } from "../../lib/seo";
import { pages } from "../../lib/site";
import { DemoCta, PageHero, RelatedPages } from "../components/ContentPage";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

// Copy aprobado: doc 48 §6 (8 preguntas). El bloque respuesta usa la description
// aprobada de la ruta (doc 48 §0): el doc 48 no trae un texto AEO propio para esta página.

const page = pages.preguntas;

export const metadata: Metadata = pageMetadata(page);

export default function PreguntasPage() {
  return (
    <main id="inicio">
      <JsonLd data={structuredData.preguntas} />
      <SiteHeader />
      <PageHero page={page} title="Preguntas frecuentes sobre VULNERA" answer={page.description} />

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
