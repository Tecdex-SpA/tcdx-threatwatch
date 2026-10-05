import type { Metadata } from "next";
import { structuredData } from "../../lib/structured-data";
import { JsonLd } from "../components/JsonLd";
import { pageMetadata } from "../../lib/seo";
import { organization, pages } from "../../lib/site";
import { ContentTable, DemoCta, PageHero, RelatedPages } from "../components/ContentPage";
import { ProductStatus } from "../components/ProductStatus";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

// Copy aprobado: doc 48 §3 (página pilar, educativa). No reescribir claims.

const page = pages.gestion;

export const metadata: Metadata = pageMetadata(page);

/** Autoría y fechas (P1-7). Actualizar `revised` al revisar el contenido. */
const published = { iso: "2026-10-05", label: "5 de octubre de 2026" };
const revised = { iso: "2026-10-05", label: "5 de octubre de 2026" };

const stages = [
  ["Alcance", "Se define qué activos se pueden evaluar y bajo qué autorización", "¿Qué estamos mirando y con permiso de quién?"],
  ["Evaluación", "Se revisan los activos dentro del alcance aprobado", "¿Qué debilidades existen hoy?"],
  ["Priorización", "Se ordenan los hallazgos por severidad, evidencia e impacto", "¿Qué atacamos primero?"],
  ["Remediación", "Se asignan responsables y acciones de corrección", "¿Quién lo arregla y para cuándo?"],
  ["Comprobación (retest)", "Se verifica que la corrección funcionó", "¿Quedó realmente cerrado?"],
];

const goodPractices = [
  "Evaluar de forma recurrente, no una vez al año.",
  "Priorizar por riesgo real, no solo por severidad técnica.",
  "Asignar responsable y fecha a cada hallazgo.",
  "Conservar evidencia del cierre para auditorías.",
  "Separar lo automatizable de lo que requiere criterio humano.",
];

const commonMistakes = [
  "Confundir «escanear» con «gestionar».",
  "Tratar el informe como el final.",
  "No verificar el cierre.",
  "Perder la trazabilidad entre el hallazgo y la acción.",
];

const sources = [
  ["ISO/IEC 27001:2022 (A.8.8)", "https://www.iso.org/standard/27001"],
  ["Ley 21.663 (BCN)", "https://www.bcn.cl/leychile/navegar?idNorma=1202434"],
  ["Agencia Nacional de Ciberseguridad (ANCI)", "https://anci.gob.cl/"],
];

export default function GestionPage() {
  return (
    <main id="inicio">
      <JsonLd data={structuredData.gestion} />
      <SiteHeader />
      <PageHero
        page={page}
        title="Gestión de vulnerabilidades: del hallazgo a la remediación comprobada"
        answer="La gestión de vulnerabilidades es el proceso continuo de identificar, priorizar, corregir y verificar las debilidades de seguridad de los sistemas de una organización. No termina en el informe: su objetivo es cerrar cada hallazgo y comprobar que la corrección funcionó, dejando evidencia del alcance evaluado, las decisiones tomadas y los responsables de cada acción."
      />

      <section className="prose-section">
        <div className="container">
          <article className="prose">
          <h2>¿Por qué un informe no basta?</h2>
          <p>
            Un informe de pentest o un escaneo entrega una foto en el tiempo. Sin un proceso
            detrás, los hallazgos quedan en una planilla, sin responsable ni fecha de cierre, y la
            siguiente auditoría encuentra lo mismo. La gestión convierte esa foto en un proceso
            con seguimiento.
          </p>

          <h2>Las etapas de la gestión de vulnerabilidades</h2>
          <ContentTable head={["Etapa", "Qué ocurre", "Pregunta que responde"]} rows={stages} />

          <h2>Buenas prácticas</h2>
          <ul>{goodPractices.map((item) => <li key={item}>{item}</li>)}</ul>

          <h2>Errores comunes</h2>
          <ul>{commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul>

          <h2>Gestión de vulnerabilidades y cumplimiento</h2>
          <p>
            Marcos como ISO 27001 (control 8.8, gestión de vulnerabilidades técnicas) o la Ley
            21.663 en Chile piden evidencia de que este proceso existe y se mantiene. Ese sistema
            de gestión vive en{" "}
            <a href="https://isos.tecdex.net/" target="_blank" rel="noopener">TECDEX Compliance</a>;
            VULNERA aporta la evidencia técnica que lo alimenta.
          </p>

          <h2>Cómo ayuda VULNERA</h2>
          <p>
            VULNERA reúne alcance, hallazgos, remediación y evidencia en una sola plataforma,
            para que la gestión no dependa de planillas ni correos.
          </p>
          </article>
        </div>
      </section>

      <section className="status-section status-section--page" aria-label="Estado del producto">
        <div className="container prose-wide">
          <ProductStatus />
        </div>
      </section>

      <section className="related-section">
        <div className="container">
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
              <span className="byline-label">Fuentes:</span>{" "}
              {sources.map(([label, href], index) => (
                <span key={href}>
                  {index > 0 ? " · " : null}
                  <a href={href} target="_blank" rel="noopener">{label}</a>
                </span>
              ))}
            </p>
          </aside>
          <RelatedPages current={page} />
        </div>
      </section>

      <DemoCta location="gestion-de-vulnerabilidades" />
      <SiteFooter />
    </main>
  );
}
