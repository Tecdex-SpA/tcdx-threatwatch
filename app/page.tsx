import { contact, integrations, organization, siteConfig } from "../lib/site";
import { CookiePreferencesButton } from "./components/ConsentBanner";
import { ProductStatus } from "./components/ProductStatus";

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

const controlSteps = [
  ["01", "Definir el alcance", "Registras dominios, IPs, APIs y servicios que se pueden evaluar."],
  ["02", "Validar autorización", "Se confirma propiedad o evidencia verificable antes de cualquier revisión."],
  ["03", "Evaluar con control", "Se aplica el perfil acordado, respetando el alcance aprobado."],
  ["04", "Priorizar y cerrar", "La evidencia se convierte en decisiones, responsables y seguimiento."],
];

const audiences = [
  ["Gerencia", "Para decidir", "Riesgo priorizado y una lectura clara para decidir inversión y continuidad."],
  ["TI y seguridad", "Para resolver", "Evidencia técnica, servicios afectados y recomendación de remediación."],
  ["Cumplimiento", "Para auditar", "Trazabilidad del alcance, las autorizaciones y los resultados."],
];

const faqs = [
  [
    "¿VULNERA reemplaza un pentest?",
    "No. Complementa el trabajo de especialistas con una forma ordenada de gestionar hallazgos, evidencia y seguimiento. Los resultados siempre deben ser revisados por responsables técnicos.",
  ],
  [
    "¿Puede revisar cualquier dominio?",
    "No. Solo se evalúan activos propios o expresamente autorizados. El flujo exige alcance, validación de propiedad y aprobación explícita antes de cualquier revisión.",
  ],
  [
    "¿Qué recibe mi empresa?",
    "Un resumen ejecutivo para gerencia y el detalle técnico para TI, con evidencia y recomendaciones asociadas a cada hallazgo. Durante la demo, sobre datos de ejemplo.",
  ],
  [
    "¿Está disponible para contratar hoy?",
    "El producto está en desarrollo. Hoy ofrecemos demostraciones guiadas. Revisa el estado del producto para ver qué está disponible y qué estamos construyendo.",
  ],
  [
    "¿TECDEX puede acompañar la remediación?",
    "TECDEX puede ayudar a definir el alcance e interpretar los hallazgos. El seguimiento de remediación y el retest dentro de la plataforma están en desarrollo.",
  ],
];

const needOptions = [
  "Revisar mi superficie expuesta",
  "Un reporte para gerencia",
  "Preparar una auditoría",
  "Revisar un portal o API",
  "Otro",
];

const demoSeverities = [
  ["Crítica", "critical", 32, 2],
  ["Alta", "high", 48, 3],
  ["Media", "medium", 64, 5],
  ["Baja", "low", 28, 2],
] as const;

const whatsappUrl = `https://wa.me/${contact.whatsapp}`;

function TecdexLogo({ className = "" }: { className?: string }) {
  return (
    <img
      className={className}
      src="https://tecdex.net/wp-content/uploads/2019/08/logo-luz.svg"
      alt="TECDEX"
      width="300"
      height="79"
    />
  );
}

function CheckIcon() {
  return <span className="check-icon" aria-hidden="true">✓</span>;
}

function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.485.71 4.807 1.94 6.77L3 29l6.9-2.4a12.44 12.44 0 0 0 6.101 1.6h.004c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3zm0 22.7h-.003a10.16 10.16 0 0 1-5.176-1.418l-.371-.22-4.096 1.424 1.44-3.99-.242-.41A10.18 10.18 0 0 1 5.8 15.5c0-5.63 4.573-10.2 10.204-10.2 2.726 0 5.288 1.062 7.216 2.992a10.13 10.13 0 0 1 2.984 7.211c0 5.63-4.573 10.197-10.203 10.197zm5.593-7.643c-.306-.153-1.813-.895-2.094-.997-.281-.102-.486-.153-.69.154-.204.306-.792.996-.971 1.2-.179.204-.357.23-.663.077-.306-.153-1.293-.477-2.463-1.52-.91-.812-1.525-1.815-1.704-2.121-.179-.306-.019-.472.134-.624.137-.137.306-.357.46-.536.153-.179.204-.306.306-.51.102-.204.05-.383-.026-.536-.077-.153-.69-1.663-.945-2.278-.249-.599-.502-.518-.69-.527-.179-.008-.383-.01-.588-.01-.204 0-.536.077-.817.383-.281.306-1.073 1.049-1.073 2.559s1.098 2.968 1.25 3.173c.153.204 2.16 3.298 5.234 4.624.731.316 1.301.505 1.745.646.733.233 1.4.2 1.927.121.588-.088 1.813-.741 2.069-1.457.255-.715.255-1.328.179-1.457-.077-.128-.281-.204-.588-.357z" />
      </svg>
    </a>
  );
}

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="Vista de demostración de la plataforma">
      <div className="preview-topbar">
        <div className="preview-brand">
          <span className="preview-mark">VU</span>
          <strong>VULNERA</strong>
        </div>
        <span className="demo-label">Vista de demostración · datos ilustrativos</span>
      </div>

      <div className="preview-body">
        <aside className="preview-nav" aria-hidden="true">
          <span className="is-active">Resumen</span>
          <span>Activos</span>
          <span>Revisiones</span>
          <span>Hallazgos</span>
          <span>Reportes</span>
        </aside>

        <div className="preview-content">
          <div className="metric-row">
            <div><span>Activos</span><strong>24</strong><small>23 autorizados</small></div>
            <div><span>Hallazgos</span><strong>12</strong><small>4 por revisar</small></div>
            <div><span>Scope</span><strong>96%</strong><small>verificado</small></div>
          </div>

          <div className="severity-card">
            {demoSeverities.map(([label, level, width, count]) => (
              <div className="severity-row" key={level}>
                <span className="severity-name">{label}</span>
                <span className={`severity-bar severity-${level}`} style={{ width: `${width}%` }} />
                <span className="severity-count">{count}</span>
              </div>
            ))}
          </div>

          <div className="finding-row">
            <span className="finding-dot high" />
            <div><strong>Servicio público requiere revisión</strong><small>api.empresa.cl · evidencia disponible</small></div>
            <span className="severity-label">Alta</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main id="inicio">
      <header className="site-header">
        <div className="container header-main">
          <a className="brand" href="#inicio" aria-label="VULNERA, volver al inicio">
            <TecdexLogo className="header-logo" />
            <span className="brand-divider" />
            <span className="product-name">VULNERA</span>
          </a>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <a href="#solucion">Solución</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#para-quien">Para quién</a>
            <a href="#preguntas">Preguntas</a>
            <a className="nav-button" href="#demo">Solicitar demo</a>
          </nav>

          <details className="mobile-nav">
            <summary aria-label="Abrir menú"><span /><span /><span /></summary>
            <nav aria-label="Navegación móvil">
              <a href="#solucion">Solución</a>
              <a href="#como-funciona">Cómo funciona</a>
              <a href="#para-quien">Para quién</a>
              <a href="#preguntas">Preguntas</a>
              <a href="#demo">Solicitar demo</a>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow light">Gestión de vulnerabilidades · Chile</p>
            <h1>Del hallazgo al cierre comprobado, no solo al informe.</h1>
            <p className="hero-lead">
              Evaluaciones controladas sobre dominios, aplicaciones web y APIs que tu organización
              autoriza, con hallazgos priorizados e informes para gerencia y TI.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#demo">Solicitar demo guiada</a>
              <a className="button ghost" href="#como-funciona">Ver cómo funciona <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-trust">
              <span><CheckIcon /> Solo activos propios o autorizados</span>
              <span><CheckIcon /> Evidencia trazable</span>
              <span><CheckIcon /> Acompañamiento TECDEX</span>
            </div>
          </div>
          <ProductPreview />
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

      <section id="como-funciona" className="section governance-section">
        <div className="container governance-grid">
          <div className="governance-copy">
            <p className="eyebrow light">Control por diseño</p>
            <h2>Cada evaluación empieza con una autorización, no con un escaneo.</h2>
          </div>

          <div className="steps-list">
            {controlSteps.map(([number, title, text]) => (
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

      <section className="status-section" aria-label="Estado del producto">
        <div className="container">
          <ProductStatus />
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

      <section id="demo" className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">Demo guiada</p>
            <h2>Obtén una primera lectura, sobre datos de ejemplo.</h2>
            <p className="contact-lead">
              Cuéntanos qué activos necesitas revisar. Un especialista de TECDEX evaluará el caso
              y propondrá un alcance inicial seguro.
            </p>
            <ul className="contact-benefits">
              <li><CheckIcon /><span>Definición de alcance inicial</span></li>
              <li><CheckIcon /><span>Validación de propiedad o autorización</span></li>
              <li><CheckIcon /><span>Resumen ejecutivo y detalle técnico de ejemplo</span></li>
              <li><CheckIcon /><span>Recomendaciones y próximos pasos</span></li>
            </ul>
            <div className="direct-contact">
              <span>¿Prefieres contacto directo?</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {contact.whatsappLabel}</a>
            </div>
          </div>

          <form className="contact-form" action={`mailto:${contact.email}`} method="post" encType="text/plain">
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
            <button className="button primary form-submit" type="submit">Solicitar demo guiada</button>
            <p className="privacy-note">
              No se ejecutará ningún escaneo automáticamente. Tus datos se usarán solo para responder
              esta solicitud comercial.
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
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span aria-hidden="true">+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="responsible-use">
        <div className="container responsible-use__inner">
          <strong>Uso responsable</strong>
          <p>
            VULNERA no garantiza la ausencia total de vulnerabilidades ni reemplaza una
            evaluación humana. Los resultados requieren revisión técnica y solo deben obtenerse
            sobre activos propios o autorizados.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <TecdexLogo className="footer-logo" />
            <p>VULNERA</p>
            <span>{siteConfig.tagline}</span>
          </div>
          <div>
            <h3>Producto</h3>
            <a href="#solucion">Solución</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#estado">Estado del producto</a>
            <a href="#demo">Solicitar demo</a>
          </div>
          <div>
            <h3>TECDEX</h3>
            <a href="https://tecdex.net/quienes-somos/" target="_blank" rel="noopener">Quiénes somos</a>
            <a href="https://tecdex.net/soluciones-de-seguridad-informatica-para-empresas/" target="_blank" rel="noopener">Seguridad informática</a>
            <a href={organization.privacyUrl} target="_blank" rel="noopener">Políticas de privacidad</a>
            {integrations.ga4Id ? <CookiePreferencesButton /> : null}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} TECDEX SpA · {contact.addressLines.join(", ")} ·{" "}
            <a href={`tel:${contact.phone}`}>{contact.phoneLabel}</a> ·{" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {contact.whatsappLabel}</a>
          </span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>

      <WhatsAppFloat />
    </main>
  );
}
