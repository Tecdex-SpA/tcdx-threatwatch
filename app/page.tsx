import type { Metadata } from "next";
import { structuredData } from "../lib/structured-data";
import { JsonLd } from "./components/JsonLd";
import { cycleSteps } from "../lib/cycle";
import { homeFaqs } from "../lib/faqs";
import { pageMetadata } from "../lib/seo";
import { contact, pages, whatsappUrl } from "../lib/site";
import { AutomationTable } from "./components/AutomationTable";
import { DashboardPreview } from "./components/DashboardPreview";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export const metadata: Metadata = pageMetadata(pages.home);

// Copy aprobado: doc 48 (VULNERA_CONTENIDO_FUENTE_WEB_2026-10-04). No reescribir claims.

const problemWithout = [
  "Un pentest al año y una planilla que nadie actualiza.",
  "Hallazgos sueltos, sin responsable ni fecha de cierre.",
  "Distancia entre el informe técnico y la acción correctiva.",
  "Nada que mostrar cuando la auditoría pide evidencia de avance.",
];

const problemWith = [
  "Un lugar para el alcance, los hallazgos y su corrección.",
  "Cada hallazgo con severidad, evidencia y recomendación.",
  "Responsables y seguimiento hasta el cierre comprobado.",
  "Trazabilidad del alcance, las autorizaciones y los resultados.",
];

const audiences = [
  ["Gerencia", "Para decidir", "Riesgo priorizado y una lectura clara para decidir inversión y continuidad."],
  ["TI y seguridad", "Para resolver", "Evidencia técnica, servicios afectados y recomendación de remediación."],
  ["Cumplimiento", "Para auditar", "Trazabilidad del alcance, las autorizaciones y los resultados."],
];

const needOptions = [
  "Evaluar mis dominios y aplicaciones",
  "Un reporte para gerencia",
  "Preparar una auditoría",
  "Revisar un portal o API",
  "Otro",
];

function CheckIcon() {
  return <span className="check-icon" aria-hidden="true">✓</span>;
}

export default function Page() {
  return (
    <main id="inicio">
      <JsonLd data={structuredData.home} />
      <SiteHeader />

      <section className="hero" data-location="hero">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">Pentesting automatizado · Chile</p>
            <h1>Del hallazgo al cierre comprobado, no solo al informe.</h1>
            <p className="hero-lead">
              VULNERA automatiza las etapas repetibles del pentesting —reconocimiento,
              descubrimiento y detección— sobre los activos que tu organización autoriza, y
              convierte cada hallazgo en un plan de corrección.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#demo" data-cta="demo">Agenda tu demo</a>
              <a className="button ghost" href="#como-funciona">Ver cómo funciona <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-trust">
              <span><CheckIcon /> Solo activos autorizados</span>
              <span><CheckIcon /> Evaluaciones repetibles</span>
              <span><CheckIcon /> Acompañamiento TECDEX</span>
            </div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section id="solucion" className="section section-light">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">El problema</p>
            <h2>Tienes informes de seguridad. Lo que no tienes es la certeza de que se corrigieron.</h2>
          </div>

          <div className="problem-grid">
            <div>
              <h3 className="problem-title problem-title--without">Sin VULNERA</h3>
              <ul className="problem-list problem-list--without">
                {problemWithout.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="problem-title problem-title--with">Con VULNERA</h3>
              <ul className="problem-list problem-list--with">
                {problemWith.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="automatizacion" className="section section-surface">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Automatización con criterio</p>
            <h2>Automatiza lo repetible. Tu equipo se concentra en lo que importa.</h2>
            <p>
              VULNERA ejecuta las etapas del pentesting que se repiten en cada evaluación, dentro
              de un alcance aprobado. Así puedes evaluar con más frecuencia y reservar a los
              especialistas para lo que exige criterio humano.
            </p>
          </div>
          <AutomationTable />
        </div>
      </section>

      <section id="como-funciona" className="section governance-section">
        <div className="container governance-grid">
          <div className="governance-copy">
            <p className="eyebrow light">Control por diseño</p>
            <h2>Cada evaluación empieza con una autorización, no con un escaneo.</h2>
          </div>

          <div className="steps-list">
            {cycleSteps.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="para-quien" className="section section-surface">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">Una plataforma, dos lecturas</p>
            <h2>La misma evidencia, con el detalle que cada rol necesita.</h2>
          </div>
          <div className="audience-grid">
            {audiences.map(([role, title, text], index) => (
              <article key={role}>
                <span className={`audience-icon icon-${index + 1}`} aria-hidden="true">{index === 0 ? "↗" : index === 1 ? "⌁" : "✓"}</span>
                <p className="audience-role">{role}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="acceso-anticipado" className="early-section" data-location="acceso-anticipado">
        <div className="container early-card">
          <div>
            <p className="eyebrow">Acceso anticipado</p>
            <h2>Estamos incorporando a las primeras organizaciones.</h2>
            <p>
              Agenda una demo, revisamos tu caso con el equipo de TECDEX y definimos juntos el
              alcance inicial de tu evaluación.
            </p>
          </div>
          <a className="button primary" href="#demo" data-cta="demo">Agenda tu demo</a>
        </div>
      </section>

      <section id="auditoria" className="audit-section">
        <div className="container audit-card">
          <div>
            <h2 className="eyebrow light">¿Lo necesitas para una auditoría?</h2>
            <p>
              Si tu objetivo es demostrar la gestión de vulnerabilidades técnicas ante una auditoría
              —por ejemplo, el control 8.8 de ISO 27001 o las exigencias de la Ley 21.663—, el sistema
              de gestión vive en TECDEX Compliance. VULNERA aporta la evidencia técnica; TECDEX
              Compliance la vincula a tus controles.
            </p>
            <small>VULNERA aporta evidencia; no sustituye una certificación ISO.</small>
          </div>
          <a className="button primary" href="https://isos.tecdex.net/" target="_blank" rel="noopener">
            Conocer TECDEX Compliance <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section id="demo" className="section contact-section" data-location="demo">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">Demo guiada</p>
            <h2>Agenda tu demo de VULNERA.</h2>
            <p className="contact-lead">
              Cuéntanos qué activos necesitas evaluar. Un especialista de TECDEX revisará tu caso y
              te contactará para coordinar la demo y el alcance inicial.
            </p>
            <ul className="contact-benefits">
              <li><CheckIcon /><span>Revisión de tu caso</span></li>
              <li><CheckIcon /><span>Definición de alcance inicial</span></li>
              <li><CheckIcon /><span>Validación de autorización</span></li>
              <li><CheckIcon /><span>Demo guiada de la plataforma</span></li>
            </ul>
            <div className="direct-contact">
              <span>¿Prefieres contacto directo?</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {contact.whatsappLabel}</a>
            </div>
          </div>

          <form className="contact-form" action={`mailto:${contact.email}`} method="post" encType="text/plain" data-lead-form>
            <div className="form-row">
              <label>Nombre<input name="nombre" autoComplete="name" required placeholder="Tu nombre" /></label>
              <label>Empresa<input name="empresa" autoComplete="organization" required placeholder="Nombre de empresa" /></label>
            </div>
            <div className="form-row">
              <label>Correo corporativo<input name="correo" type="email" autoComplete="email" required placeholder="nombre@empresa.cl" /></label>
              <label>Teléfono<input name="telefono" type="tel" autoComplete="tel" placeholder="+56 9..." /></label>
            </div>
            <label>Activo o dominio a evaluar<input name="activo" placeholder="empresa.cl / api.empresa.cl" /></label>
            <label>¿Qué necesitas?
              <select name="necesidad" defaultValue="">
                <option value="" disabled>Selecciona una opción</option>
                {needOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label>Contexto adicional<textarea name="mensaje" rows={3} placeholder="Cuéntanos brevemente qué quieres revisar." /></label>
            <label className="form-check">
              <input type="checkbox" name="activos_autorizados" required />
              <span>Solicito información para evaluar activos propios o expresamente autorizados.</span>
            </label>
            <button className="button primary form-submit" type="submit" data-cta="demo">Agenda tu demo</button>
            <p className="privacy-note">
              Ninguna evaluación se ejecuta sin tu autorización y aprobación explícita. Tus datos se
              usarán solo para responder esta solicitud comercial.
            </p>
          </form>
        </div>
      </section>

      <section id="preguntas" className="section faq-section">
        <div className="container faq-grid">
          <div className="section-heading">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Lo esencial antes de comenzar.</h2>
            <p>VULNERA está diseñado para revisiones responsables sobre activos propios o autorizados.</p>
          </div>
          <div className="faq-list">
            {homeFaqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
