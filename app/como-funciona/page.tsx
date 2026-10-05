import type { Metadata } from "next";
import { structuredData } from "../../lib/structured-data";
import { JsonLd } from "../components/JsonLd";
import { cycleSteps } from "../../lib/cycle";
import { pageMetadata } from "../../lib/seo";
import { pages } from "../../lib/site";
import { AutomationTable } from "../components/AutomationTable";
import { ContentTable, DemoCta, PageHero, RelatedPages } from "../components/ContentPage";
import { ProductRoadmap } from "../components/ProductRoadmap";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

// Copy aprobado: doc 48 §2 con los cambios del doc 50 §3 (bloque respuesta, tabla de
// automatización y «Hoja de ruta»). No reescribir claims.

const page = pages.comoFunciona;

export const metadata: Metadata = pageMetadata(page);

const stages = cycleSteps.map(([, title, text]) => [title, text]);

export default function ComoFuncionaPage() {
  return (
    <main id="inicio">
      <JsonLd data={structuredData.comoFunciona} />
      <SiteHeader />
      <PageHero
        page={page}
        title="Cómo funciona VULNERA"
        answer="VULNERA automatiza las etapas repetibles del pentesting en cuatro pasos: defines el alcance autorizado, validas la propiedad de los activos, la plataforma ejecuta reconocimiento, descubrimiento y detección, y tú revisas los hallazgos priorizados para gestionar su corrección. Cada paso queda registrado."
      />

      <section className="prose-section">
        <div className="container">
          <div className="prose">
          <h2>¿Qué se evalúa y qué no?</h2>
          <p>
            Se evalúan únicamente los activos que tu organización registra y autoriza: dominios,
            subdominios, aplicaciones web y APIs. Nada se evalúa sin autorización verificada.
          </p>
          <p className="note">El catálogo definitivo de pruebas se confirma por alcance.</p>

          <h2>Las cuatro etapas</h2>
          <ContentTable head={["Etapa", "Qué ocurre"]} rows={stages} />

          <h2>Automatiza lo repetible. Tu equipo se concentra en lo que importa.</h2>
          <AutomationTable />

          <h2>Qué recibes</h2>
          <p>
            Un resumen ejecutivo para gerencia y el detalle técnico para TI, con evidencia y
            recomendación por hallazgo.
          </p>

          <h2>Control y autorización</h2>
          <p>
            La evaluación no inicia sin aprobación humana explícita. El flujo exige alcance,
            validación de propiedad y aprobación explícita antes de cualquier revisión.
          </p>
          </div>
        </div>
      </section>

      <section className="status-section status-section--page" aria-label="Hoja de ruta">
        <div className="container prose-wide">
          <ProductRoadmap />
        </div>
      </section>

      <section className="related-section">
        <div className="container">
          <RelatedPages current={page} />
        </div>
      </section>

      <DemoCta location="como-funciona" />
      <SiteFooter />
    </main>
  );
}
