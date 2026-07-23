const controlSteps = [
  ["01", "Definir el alcance", "Registramos dominios, IPs, APIs y servicios que pueden ser evaluados."],
  ["02", "Validar autorización", "Confirmamos ownership o evidencia verificable antes de cualquier revisión."],
  ["03", "Ejecutar con control", "Aplicamos el modo de evaluación acordado y respetamos el scope aprobado."],
  ["04", "Priorizar y reportar", "Convertimos evidencia técnica en decisiones claras y próximos pasos."],
];

const capabilities = [
  {
    number: "01",
    title: "Superficie expuesta",
    text: "Visibilidad continua sobre dominios, subdominios, portales, APIs y servicios publicados.",
    detail: "Inventario controlado",
  },
  {
    number: "02",
    title: "Gobierno del scan",
    text: "Scopes, ownership verification y Approval Gate antes de ejecutar revisiones sensibles.",
    detail: "Autorización trazable",
  },
  {
    number: "03",
    title: "Hallazgos accionables",
    text: "Severidad, evidencia, impacto técnico, contexto de negocio y remediación sugerida.",
    detail: "Menos ruido operativo",
  },
  {
    number: "04",
    title: "Reportabilidad",
    text: "Una lectura ejecutiva para dirección y detalle útil para TI, seguridad y cumplimiento.",
    detail: "Decisiones informadas",
  },
];

const audiences = [
  ["Gerencia", "Riesgo priorizado y una lectura clara para decidir inversión y continuidad."],
  ["TI y seguridad", "Evidencia técnica, servicios afectados y seguimiento de remediación."],
  ["Cumplimiento", "Trazabilidad del alcance, autorizaciones y resultados para apoyar auditorías."],
];

const faqs = [
  [
    "¿ThreatWatch reemplaza un pentest?",
    "No. Complementa el trabajo de especialistas con revisiones recurrentes, evidencia y seguimiento. Los resultados siempre deben ser revisados por responsables técnicos.",
  ],
  [
    "¿Puede revisar cualquier dominio?",
    "No. Solo se evalúan activos propios o expresamente autorizados. El flujo exige scope, validación de ownership y aprobación.",
  ],
  [
    "¿Qué recibe mi empresa?",
    "Un resumen ejecutivo, hallazgos técnicos priorizados, evidencia disponible, recomendaciones y una propuesta de próximos pasos según el alcance acordado.",
  ],
  [
    "¿TECDEX puede acompañar la remediación?",
    "Sí. TECDEX puede revisar hallazgos, apoyar la priorización, acompañar hardening y revalidar correcciones como servicio gestionado.",
  ],
];

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

function ProductPreview() {
  return (
    <div className="product-preview" aria-label="Vista referencial del panel TCDX ThreatWatch">
      <div className="preview-topbar">
        <div className="preview-brand">
          <span className="preview-mark">TW</span>
          <div>
            <strong>ThreatWatch</strong>
            <small>Superficie expuesta</small>
          </div>
        </div>
        <span className="live-status"><i /> Monitoreo activo</span>
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
          <div className="preview-heading">
            <div>
              <small>Organización</small>
              <strong>Panorama de exposición</strong>
            </div>
            <span>Últimos 30 días</span>
          </div>

          <div className="metric-row">
            <div><span>Activos</span><strong>24</strong><small>23 autorizados</small></div>
            <div><span>Hallazgos</span><strong>12</strong><small>4 requieren atención</small></div>
            <div><span>Controles</span><strong>96%</strong><small>scope verificado</small></div>
          </div>

          <div className="exposure-card">
            <div className="exposure-card__top">
              <div>
                <span className="card-kicker">Prioridad de remediación</span>
                <strong>Exposición por severidad</strong>
              </div>
              <span className="trend">↓ 18%</span>
            </div>
            <div className="bar-chart" aria-hidden="true">
              <span style={{ height: "32%" }} />
              <span style={{ height: "54%" }} />
              <span style={{ height: "38%" }} />
              <span style={{ height: "72%" }} />
              <span style={{ height: "46%" }} />
              <span style={{ height: "83%" }} />
              <span style={{ height: "62%" }} />
              <span style={{ height: "42%" }} />
            </div>
            <div className="chart-legend"><span>Sem 1</span><span>Sem 2</span><span>Sem 3</span><span>Hoy</span></div>
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
        <div className="header-contact">
          <div className="container header-contact__inner">
            <span>Soluciones TI y ciberseguridad para empresas</span>
            <div>
              <a href="tel:+56233046291">+56 2 3304 6291</a>
              <a href="mailto:contacto@tecdex.net">contacto@tecdex.net</a>
            </div>
          </div>
        </div>

        <div className="container header-main">
          <a className="brand" href="#inicio" aria-label="TCDX ThreatWatch, volver al inicio">
            <TecdexLogo className="header-logo" />
            <span className="brand-divider" />
            <span className="product-name">ThreatWatch</span>
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
            <p className="eyebrow light">TCDX ThreatWatch · by TECDEX</p>
            <h1>Conoce tu superficie expuesta antes que se convierta en un incidente.</h1>
            <p className="hero-lead">
              Pentesting continuo para dominios, APIs y servicios públicos, con alcance autorizado,
              hallazgos priorizados y reportes que conectan seguridad con negocio.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#demo">Evaluar mis activos</a>
              <a className="button ghost" href="#como-funciona">Ver cómo funciona <span aria-hidden="true">→</span></a>
            </div>
            <div className="hero-trust">
              <span><CheckIcon /> Activos autorizados</span>
              <span><CheckIcon /> Evidencia trazable</span>
              <span><CheckIcon /> Acompañamiento TECDEX</span>
            </div>
          </div>
          <ProductPreview />
        </div>
      </section>

      <section className="context-strip" aria-label="Resumen de propuesta de valor">
        <div className="container context-grid">
          <p>Una operación de seguridad más clara, recurrente y controlada.</p>
          <div><strong>Visibilidad</strong><span>de activos públicos</span></div>
          <div><strong>Gobierno</strong><span>antes de ejecutar</span></div>
          <div><strong>Prioridad</strong><span>para remediar</span></div>
          <div><strong>Reporte</strong><span>para decidir</span></div>
        </div>
      </section>

      <section id="solucion" className="section section-light">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">La solución</p>
              <h2>No es solo detectar. Es entender qué importa y actuar con control.</h2>
            </div>
            <p>
              ThreatWatch organiza el ciclo completo de una revisión: alcance, autorización,
              ejecución, evidencia, priorización y seguimiento.
            </p>
          </div>

          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability-card" key={item.number}>
                <span className="card-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small>{item.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section governance-section">
        <div className="container governance-grid">
          <div className="governance-copy">
            <p className="eyebrow light">Control por diseño</p>
            <h2>Cada revisión comienza con autorización, no con un scan.</h2>
            <p>
              Los controles de scope, ownership y aprobación ayudan a mantener cada evaluación
              dentro de límites claros y trazables.
            </p>
            <div className="approval-seal">
              <span className="seal-icon">✓</span>
              <div><strong>Approval Gate</strong><small>Listo para evaluación controlada</small></div>
            </div>
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
            <p className="eyebrow">Una plataforma, dos niveles de lectura</p>
            <h2>Información útil para quienes deciden y para quienes resuelven.</h2>
            <p>La misma evidencia se presenta con el nivel de detalle que cada rol necesita.</p>
          </div>
          <div className="audience-grid">
            {audiences.map(([title, text], index) => (
              <article key={title}>
                <span className={`audience-icon icon-${index + 1}`} aria-hidden="true">{index === 0 ? "↗" : index === 1 ? "⌁" : "✓"}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="managed-section">
        <div className="container managed-card">
          <div>
            <p className="eyebrow light">Servicio gestionado TECDEX</p>
            <h2>No necesitas operar todo internamente.</h2>
          </div>
          <p>
            Podemos acompañar la definición de scope, ejecutar la revisión controlada,
            validar hallazgos y trabajar contigo en un plan de remediación.
          </p>
          <a className="button primary" href="#demo">Conversemos</a>
        </div>
      </section>

      <section id="demo" className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">Demo controlada</p>
            <h2>Obtén una primera lectura de tu exposición.</h2>
            <p className="contact-lead">
              Cuéntanos qué activos necesitas revisar. Un especialista TECDEX evaluará el caso
              y propondrá un alcance inicial seguro.
            </p>
            <ul className="contact-benefits">
              <li><CheckIcon /><span>Definición de scope inicial</span></li>
              <li><CheckIcon /><span>Validación de ownership o autorización</span></li>
              <li><CheckIcon /><span>Resumen ejecutivo y detalle técnico</span></li>
              <li><CheckIcon /><span>Recomendaciones y próximos pasos</span></li>
            </ul>
            <div className="direct-contact">
              <span>¿Prefieres contacto directo?</span>
              <a href="mailto:contacto@tecdex.net">contacto@tecdex.net</a>
              <a href="https://wa.me/56989995290" target="_blank" rel="noreferrer">WhatsApp +56 9 8999 5290</a>
            </div>
          </div>

          <form className="contact-form" action="mailto:contacto@tecdex.net" method="post" encType="text/plain">
            <div className="form-heading">
              <span>Paso 1 de 1</span>
              <h3>Solicita una demo</h3>
              <p>Te responderemos para coordinar el alcance. No se ejecutará ningún scan automáticamente.</p>
            </div>
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
                <option>Revisar superficie expuesta</option>
                <option>Obtener un reporte para gerencia</option>
                <option>Preparar una auditoría</option>
                <option>Revisar un portal o API</option>
                <option>Evaluar servicio gestionado</option>
              </select>
            </label>
            <label>Contexto adicional<textarea name="mensaje" rows={3} placeholder="Cuéntanos brevemente qué quieres revisar." /></label>
            <label className="form-check">
              <input type="checkbox" required />
              <span>Solicito información para evaluar activos propios o expresamente autorizados.</span>
            </label>
            <button className="button primary form-submit" type="submit">Solicitar evaluación</button>
            <p className="privacy-note">Tus datos serán utilizados únicamente para responder esta solicitud comercial.</p>
          </form>
        </div>
      </section>

      <section id="preguntas" className="section faq-section">
        <div className="container faq-grid">
          <div className="section-heading">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2>Lo esencial antes de comenzar.</h2>
            <p>ThreatWatch está diseñado para revisiones responsables sobre activos propios o autorizados.</p>
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
            TCDX ThreatWatch no garantiza la ausencia total de vulnerabilidades ni reemplaza una
            evaluación humana. Los resultados requieren revisión técnica y solo deben obtenerse
            sobre activos propios o autorizados.
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <TecdexLogo className="footer-logo" />
            <p>ThreatWatch</p>
            <span>Pentesting continuo y gestión de superficie expuesta.</span>
          </div>
          <div>
            <h3>Producto</h3>
            <a href="#solucion">Solución</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#para-quien">Para quién</a>
            <a href="#demo">Solicitar demo</a>
          </div>
          <div>
            <h3>TECDEX</h3>
            <a href="https://tecdex.net/quienes-somos/" target="_blank" rel="noreferrer">Quiénes somos</a>
            <a href="https://tecdex.net/soluciones-de-seguridad-informatica-para-empresas/" target="_blank" rel="noreferrer">Seguridad informática</a>
            <a href="https://tecdex.net/politicas-de-privacidad/" target="_blank" rel="noreferrer">Políticas de privacidad</a>
          </div>
          <div>
            <h3>Hablemos</h3>
            <a href="tel:+56233046291">+56 2 3304 6291</a>
            <a href="https://wa.me/56989995290" target="_blank" rel="noreferrer">WhatsApp +56 9 8999 5290</a>
            <a href="mailto:contacto@tecdex.net">contacto@tecdex.net</a>
            <address>Guardia Vieja 181, Of. 506<br />Providencia, Santiago</address>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} TECDEX SpA. Todos los derechos reservados.</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>
    </main>
  );
}
