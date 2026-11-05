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
        answer="VULNERA está en desarrollo para apoyar evaluaciones técnicas autorizadas. Su flujo previsto incluye definir alcance, verificar propiedad y aprobación humana antes de cualquier ejecución. Los resultados y la trazabilidad requieren validación integral antes de habilitar el servicio."
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

          <h2>Automatización prevista con control humano.</h2>
          <AutomationTable />
          <p>
            ¿Por qué esta división? Lo explicamos en la guía de{" "}
            <a href="/pentesting-automatizado/">pentesting automatizado</a>.
          </p>

          <h2>Información contemplada en el diseño</h2>
          <p>
            Se contempla ofrecer un resumen ejecutivo y detalle técnico con hallazgos y
            recomendaciones. Estos entregables aún no están habilitados como servicio.
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
