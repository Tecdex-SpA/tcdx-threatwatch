const moduleGroups = [
  {
    group: "Gobierno y autorización",
    items: [
      ["Scopes autorizados", "Dominios, IPs, CIDR y activos permitidos antes de iniciar revisiones.", "Alcance"],
      ["Ownership verification", "Validación DNS TXT o evidencia manual para respaldar propiedad o autorización.", "Control"],
      ["Approval Gate", "Bloqueo preventivo si no existe scope, ownership y aprobación válida.", "Autorización"],
      ["Auditoría y trazabilidad", "Registro de aprobaciones, verificaciones, tokens y acciones relevantes.", "Evidencia"],
    ],
  },
  {
    group: "Ejecución técnica",
    items: [
      ["Scan Wizard", "Creación guiada con confirmación ética, modo de evaluación y alcance permitido.", "Operación"],
      ["Motor de escaneo", "Orquestación de reconocimiento, validaciones web y revisión de exposición según autorización.", "Pipeline"],
      ["Hallazgos priorizados", "Severidad, severidad, evidencia, impacto técnico, impacto de negocio y remediación.", "Riesgo"],
    ],
  },
  {
    group: "Operación y reportabilidad",
    items: [
      ["Dashboard ejecutivo", "Métricas de scans, severidades, actividad reciente y evolución de exposición.", "Visibilidad"],
      ["Reportes ejecutivos y técnicos", "Material para dirección, TI, seguridad y seguimiento en formatos exportables según plan.", "Reporte"],
      ["Equipo y roles", "Roles owner, admin, analyst y viewer para operación multi-tenant.", "SaaS B2B"],
      ["API Keys y Webhooks", "Integraciones y acceso programático según plan, madurez y alcance comercial.", "Integración"],
    ],
  },
];

const steps = [
  ["01", "Defina alcance", "Registre dominios, IPs, CIDR o activos que pueden ser evaluados."],
  ["02", "Valide ownership", "Confirme propiedad o autorización mediante DNS TXT o evidencia revisable."],
  ["03", "Apruebe el scan", "Genere aprobación controlada antes de ejecutar pruebas sensibles."],
  ["04", "Ejecute con control", "Seleccione modo de scan y restricciones según el scope permitido."],
  ["05", "Priorice hallazgos", "Revise severidad, evidencia, impacto, evidencia, severidad y contexto técnico."],
  ["06", "Reporte y siga", "Genere reportes ejecutivos/técnicos y mantenga seguimiento histórico."],
];

const audiences = [
  ["Gerencia general", "Información ejecutiva para decidir inversión, riesgo y continuidad sin depender de lenguaje puramente técnico."],
  ["Gerencia TI", "Visibilidad periódica de activos expuestos, servicios, puertos, aplicaciones y hallazgos priorizados."],
  ["Seguridad / CISO", "Trazabilidad de autorización, evidencia técnica, seguimiento histórico y priorización de remediación."],
  ["Cumplimiento", "Apoyo documental para auditorías internas, gestión de riesgos y revisión de controles."],
  ["SaaS, fintech y educación", "Supervisión recurrente de portales, APIs, dominios, subdominios y servicios publicados."],
  ["Consultores y DevSecOps", "Reportabilidad, evidencia y operación repetible para apoyar entregables y mejora continua."],
];

const benefits = [
  "Mayor visibilidad de superficie expuesta.",
  "Alcance controlado antes de ejecutar revisiones.",
  "Evidencia de ownership, autorización y aprobación.",
  "Hallazgos priorizados con impacto técnico y de negocio.",
  "Reportes entendibles para dirección y útiles para equipos técnicos.",
  "Seguimiento histórico para remediación, hardening y consultoría.",
];

const capabilityLayers = [
  ["Reconocimiento controlado", "Identificación de superficie pública dentro de scopes autorizados, sin ampliar el alcance definido."],
  ["Validación técnica", "Pruebas configuradas según modo, autorización y sensibilidad del activo evaluado."],
  ["Correlación y priorización", "Agrupación de señales, severidades, evidencia y contexto para reducir ruido operativo."],
  ["Enriquecimiento contextual", "Referencias CVE/CWE/OWASP y contexto técnico cuando aplica, sin asumir cobertura total."],
  ["Narrativa asistida", "Resumen ejecutivo y remediación sugerida, siempre sujeto a revisión técnica."],
];


const scanModes = [
  ["Sin ZAP activo", "Reconocimiento y validaciones controladas de menor impacto relativo, sin activar ZAP activo."],
  ["Solo Web", "Foco en portales, aplicaciones y superficie HTTP/HTTPS dentro del scope autorizado."],
  ["Completo", "Análisis más amplio, incluyendo revisión web con ZAP cuando existe autorización válida."],
];

const moduleIcons: Record<string, string> = {
  "Scopes autorizados": "◎",
  "Ownership verification": "✓",
  "Approval Gate": "▣",
  "Auditoría y trazabilidad": "≡",
  "Scan Wizard": "▶",
  "Motor de escaneo": "⚙",
  "Hallazgos priorizados": "!",
  "Dashboard ejecutivo": "◫",
  "Reportes ejecutivos y técnicos": "▤",
  "Equipo y roles": "◉",
  "API Keys y Webhooks": "{}",
};

const faqs = [
  ["¿TCDX ThreatWatch reemplaza a un pentester?", "No. Apoya reconocimiento, escaneo, análisis, priorización y reportabilidad. Los resultados deben ser revisados por responsables técnicos o especialistas de seguridad."],
  ["¿Garantiza que mi empresa queda segura?", "No. Ninguna herramienta puede garantizar ausencia total de vulnerabilidades. La plataforma mejora visibilidad, priorización y seguimiento dentro del alcance autorizado."],
  ["¿Puede escanear cualquier dominio?", "No. Debe usarse únicamente sobre activos propios o autorizados, con scopes, ownership verification y approval gate."],
  ["¿Qué necesito para comenzar?", "Definir activos a evaluar, confirmar ownership o autorización, acordar un scope inicial y ejecutar una demo controlada con TECDEX."],
  ["¿Qué reportes genera?", "Reportes ejecutivos y técnicos con hallazgos, severidad, evidencia, impacto y recomendaciones de remediación, según alcance y configuración."],
  ["¿Sirve para gerencia?", "Sí. Traduce hallazgos técnicos en información priorizada para apoyar decisiones de riesgo, inversión y remediación."],
  ["¿Sirve para equipos técnicos?", "Sí. Los hallazgos pueden incluir evidencia, servicios afectados, severidad, referencias técnicas, impacto, evidencia y pasos de validación o remediación."],
  ["¿Se conecta con herramientas externas?", "El producto contempla API Keys y Webhooks como capacidades de integración, sujetas al plan y nivel de madurez del despliegue."],
  ["¿Requiere autorización?", "Sí. Todo scan debe ejecutarse sobre activos propios o autorizados, con alcance controlado y trazabilidad."],
  ["¿Qué diferencia hay entre Sin ZAP, Completo y Solo Web?", "Sin ZAP evita ZAP activo y usa reconocimiento/validación controlada. Completo incorpora análisis web con ZAP según autorización. Solo Web se orienta a superficie web."],
  ["¿Qué ocurre si no tengo ownership validado?", "El sistema debe bloquear la ejecución de scans sensibles hasta que exista verificación o evidencia de autorización válida."],
  ["¿Puede TECDEX acompañar la remediación?", "Sí. TECDEX puede ofrecer servicio gestionado, revisión de hallazgos, priorización, hardening y acompañamiento según alcance comercial."],
];

const plans = [
  ["Starter", "Pocos dominios, scans limitados y reporte base."],
  ["Professional", "Scans periódicos, reporte ejecutivo/técnico y priorización."],
  ["Business / Advanced", "Múltiples scopes, active scan autorizado, historial y seguimiento."],
  ["Enterprise / Compliance", "API, webhooks, soporte, reportes personalizados y revisión manual."],
  ["Servicio gestionado", "TECDEX opera, revisa, reporta y acompaña remediación."],
];

function HeaderLogo() {
  return <img className="header-logo" src="/logo-threatwatch-header.png" alt="TCDX ThreatWatch by TECDEX" />;
}

function ShieldLogo() {
  return (
    <div className="shield" aria-label="TCDX shield logo">
      <div className="shield-inner">T</div>
    </div>
  );
}

function SeverityBadge({ label }: { label: string }) {
  return <span className={`severity severity-${label.toLowerCase()}`}>{label}</span>;
}


function VisualFigure({ src, alt, label, title, text }: { src: string; alt: string; label: string; title: string; text: string }) {
  return (
    <figure className="visual-figure">
      <img src={src} alt={alt} loading="lazy" />
      <figcaption>
        <span>{label}</span>
        <strong>{title}</strong>
        <p>{text}</p>
      </figcaption>
    </figure>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function Page() {
  return (
    <main id="top">
      <header className="nav">
        <a href="#top" className="brand" aria-label="TCDX ThreatWatch by TECDEX">
          <HeaderLogo />
        </a>
        <nav>
          <a href="#funciona">Cómo funciona</a>
          <a href="#modulos">Módulos</a>
          <a href="#tecnico">Motor técnico</a>
          <a href="#demo" className="nav-cta">Demo</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="badge">Pentesting continuo y gestión de superficie expuesta</div>
          <h1>Pentesting continuo para activos expuestos, con alcance autorizado y reportes claros.</h1>
          <p className="lead">
            TCDX ThreatWatch by TECDEX ayuda a empresas a revisar periódicamente dominios, subdominios, APIs y servicios publicados, con scopes autorizados, validación de ownership, hallazgos priorizados y reportabilidad ejecutiva/técnica.
          </p>
          <div className="positioning-note">
            <strong>No se trata solo de escanear.</strong>
            <span>Se trata de controlar alcance, autorización, evidencia, hallazgos, trazabilidad y reportes para tomar mejores decisiones de seguridad.</span>
          </div>
          <div className="cta-row">
            <a className="button primary" href="#demo">Solicitar demo controlada</a>
            <a className="button secondary" href="#funciona">Ver cómo funciona</a>
          </div>
          <div className="trust-row" aria-label="Puntos de control principales">
            <span>Scopes autorizados</span>
            <span>Ownership verification</span>
            <span>Approval Gate</span>
            <span>Reportes ejecutivos</span>
          </div>
          <p className="ethic-note">Uso exclusivo sobre activos propios o autorizados.</p>
        </div>

        <div className="hero-panel" aria-label="Mockup dashboard TCDX ThreatWatch">
          <div className="panel-glow" />
          <div className="console-window">
            <aside className="console-sidebar">
              <ShieldLogo />
              <span className="active">Dashboard</span>
              <span>Scopes</span>
              <span>Scans</span>
              <span>Findings</span>
              <span>Reports</span>
            </aside>
            <div className="console-content">
              <div className="console-top">
                <div>
                  <strong>ThreatWatch Console</strong>
                  <small>tenant: empresa-demo</small>
                </div>
                <span className="status verified">Verificado</span>
              </div>
              <div className="metric-grid">
                <div><strong>24</strong><span>Scans</span></div>
                <div><strong>7</strong><span>High</span></div>
                <div><strong>18</strong><span>Medium</span></div>
                <div><strong>92%</strong><span>Scopes OK</span></div>
              </div>
              <div className="pipeline-mini">
                <span>Scope</span><span>Ownership</span><span>Approval</span><span>Scan</span><span>Findings</span><span>Reporte</span>
              </div>
              <div className="finding-card">
                <div>
                  <strong>Exposición de servicio web</strong>
                  <p>api.cliente.cl · puerto 443 · evidencia adjunta</p>
                </div>
                <SeverityBadge label="High" />
              </div>
              <div className="finding-card">
                <div>
                  <strong>Header de seguridad ausente</strong>
                  <p>OWASP · CWE · validación técnica requerida</p>
                </div>
                <SeverityBadge label="Medium" />
              </div>
              <div className="status-row">
                <span className="status completed">Completado</span>
                <span className="status progress">En curso</span>
                <span className="status failed">Fallido</span>
                <span className="status pending">Pendiente</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section problem-section">
        <div className="problem-copy">
          <p className="eyebrow">Problema</p>
          <h2>La superficie expuesta cambia más rápido que los ciclos tradicionales de revisión.</h2>
          <p>
            Dominios, subdominios, APIs, portales, puertos y servicios públicos pueden quedar expuestos por cambios operativos, integraciones, despliegues o configuraciones heredadas. El problema no es solo detectar hallazgos: es saber qué estaba autorizado, qué se revisó, qué evidencia existe y qué debe priorizarse.
          </p>
        </div>
        <div className="problem-visual-stack">
          <div className="pain-grid compact-pain">
            <div>Superficie pública difícil de mantener visible</div>
            <div>Revisiones manuales esporádicas</div>
            <div>Reportes técnicos difíciles de llevar a gerencia</div>
            <div>Hallazgos sin trazabilidad ni seguimiento</div>
          </div>
          <VisualFigure
            src="/visual-exposure-map.svg"
            alt="Mapa conceptual de superficie expuesta con dominios, APIs y servicios publicados"
            label="Superficie expuesta"
            title="Dominios, APIs y servicios en una vista controlada"
            text="Una representación visual ayuda a explicar exposición y priorización sin saturar la lectura técnica."
          />
        </div>
      </section>

      <section className="section solution-section">
        <SectionTitle
          eyebrow="Solución"
          title="Una plataforma para controlar el ciclo completo: alcance, ownership, aprobación, evidencia y reporte."
          text="TCDX ThreatWatch no se posiciona como un scanner aislado. Ordena el proceso de revisión sobre activos propios o autorizados, entrega evidencia técnica y convierte resultados en material accionable para dirección y equipos técnicos."
        />
        <div className="pillar-grid">
          <article>
            <span>01</span>
            <h3>Alcance controlado</h3>
            <p>Scopes, ownership y approval gate antes de ejecutar revisiones.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Hallazgos con evidencia</h3>
            <p>Severidad, CVE/CWE, impacto, evidencia y remediación sugerida.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Reportabilidad accionable</h3>
            <p>Reportes ejecutivos y técnicos para priorizar decisiones.</p>
          </article>
        </div>
        <VisualFigure
          src="/visual-report-flow.svg"
          alt="Flujo desde hallazgos técnicos a reporte ejecutivo y seguimiento"
          label="Reporte accionable"
          title="De evidencia técnica a decisión ejecutiva"
          text="El objetivo visual es reforzar que la plataforma conecta hallazgos, priorización, remediación y seguimiento."
        />
      </section>

      <section className="section approval-report-section">
        <div className="approval-card visual-card-large">
          <div>
            <p className="eyebrow">Approval Gate</p>
            <h2>El scan no parte si falta alcance, ownership o aprobación válida.</h2>
            <p>
              El diferencial de ThreatWatch está en controlar el proceso antes de ejecutar. La plataforma está diseñada para bloquear revisiones sensibles si no existe autorización trazable.
            </p>
          </div>
          <img src="/visual-approval-gate.svg" alt="Flujo visual de approval gate con scope, ownership y token de aprobación" loading="lazy" />
        </div>
        <div className="report-card visual-card-large">
          <div>
            <p className="eyebrow">Reporte ejecutivo</p>
            <h2>De hallazgos técnicos a una lectura ejecutiva para priorizar.</h2>
            <p>
              El reporte resume severidades, exposición, evidencia y próximos pasos para facilitar conversación entre dirección, TI, seguridad y cumplimiento.
            </p>
          </div>
          <img src="/visual-executive-report.svg" alt="Mockup de reporte ejecutivo con severidades y remediación" loading="lazy" />
        </div>
      </section>

      <section className="section safe-ops-section">
        <SectionTitle
          eyebrow="Exposición pública controlada"
          title="Mostramos el modelo operativo sin publicar detalles sensibles del pipeline."
          text="La landing pública debe explicar el enfoque —alcance, autorización, evidencia y reporte— sin entregar una guía técnica completa de ejecución. El detalle de herramientas, parámetros y profundidad se revisa en demo técnica o propuesta bajo alcance acordado."
        />
        <div className="safe-visual-grid">
          <VisualFigure
            src="/visual-control-layers.svg"
            alt="Capas de control de TCDX ThreatWatch: scope, ownership, aprobación, ejecución y reporte"
            label="Capas de control"
            title="Autorización antes de ejecución"
            text="El foco público está en gobierno del proceso y trazabilidad, no en exponer una receta operacional."
          />
          <VisualFigure
            src="/visual-risk-priority.svg"
            alt="Priorización de riesgo con severidades y evidencia"
            label="Priorización"
            title="Severidad, evidencia y contexto"
            text="La propuesta se entiende mejor mostrando cómo se prioriza, no listando cada herramienta interna."
          />
          <VisualFigure
            src="/visual-operation-model.svg"
            alt="Modelo de servicio SaaS y servicio gestionado TECDEX"
            label="Modelo de operación"
            title="SaaS o servicio gestionado"
            text="La plataforma puede operar con equipo interno, consultores o acompañamiento gestionado por TECDEX."
          />
        </div>
      </section>

      <section className="section exec-tech-section">
        <SectionTitle
          eyebrow="Dos niveles de lectura"
          title="Información clara para dirección y útil para equipos técnicos."
        />
        <div className="exec-tech-grid">
          <article>
            <h3>Para dirección</h3>
            <p>Riesgo priorizado, tendencia de severidades, exposición visible, avance de remediación y material de apoyo para decisiones de inversión.</p>
          </article>
          <article>
            <h3>Para equipos técnicos</h3>
            <p>Host, puerto, servicio, evidencia, referencias técnicas, impacto, contexto del servicio afectado y pasos de validación o remediación cuando existan.</p>
          </article>
        </div>
      </section>

      <section id="funciona" className="section">
        <SectionTitle
          eyebrow="Cómo funciona"
          title="Del scope autorizado al reporte ejecutivo, con controles antes de ejecutar."
        />
        <div className="steps">
          {steps.map(([number, title, text]) => (
            <article className="step" key={number}>
              <b>{number}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="pipeline-band" aria-label="Pipeline de control de ThreatWatch">
          <span>Scope</span>
          <i />
          <span>Ownership</span>
          <i />
          <span>Approval</span>
          <i />
          <span>Scan</span>
          <i />
          <span>Findings</span>
          <i />
          <span>Reporte</span>
        </div>
      </section>

      <section id="modulos" className="section">
        <SectionTitle
          eyebrow="Módulos"
          title="Componentes agrupados por gobierno, ejecución y reportabilidad."
          text="La plataforma reduce ambigüedad operativa: quién autorizó, qué activo se revisó, cómo se ejecutó, qué se encontró y cómo se reportó."
        />
        <div className="module-groups">
          {moduleGroups.map((group) => (
            <section className="module-group" key={group.group}>
              <h3>{group.group}</h3>
              <div className="cards compact-cards">
                {group.items.map(([title, text, tag]) => (
                  <article className="card module-card" key={title}>
                    <div className="module-icon" aria-hidden="true">{moduleIcons[title] ?? "•"}</div>
                    <span>{tag}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section id="tecnico" className="section technical-section">
        <div>
          <p className="eyebrow">Motor técnico</p>
          <h2>Motor técnico explicado por capacidades, no por exposición innecesaria de operación.</h2>
          <p>
            La plataforma combina reconocimiento, validación controlada, correlación, enriquecimiento y reportabilidad. En la landing pública se comunica el método de trabajo a nivel de capacidades; el detalle de herramientas, parámetros y profundidad queda para una demo técnica bajo alcance autorizado.
          </p>
          <div className="mode-grid">
            <div><strong>Sin ZAP</strong><span>Reconocimiento y pruebas controladas sin ZAP activo.</span></div>
            <div><strong>Solo Web</strong><span>Foco en superficie web según alcance autorizado.</span></div>
            <div><strong>Completo</strong><span>Incluye análisis web con ZAP cuando existe autorización válida.</span></div>
          </div>
          <VisualFigure
            src="/visual-scan-modes.svg"
            alt="Modos de escaneo controlado sin ZAP, solo web y completo"
            label="Modos de ejecución"
            title="Cada revisión se ajusta al alcance autorizado"
            text="La explicación pública prioriza controles, alcance y resultados, evitando exponer detalles operativos sensibles."
          />
        </div>
        <div className="tool-list capability-list">
          {capabilityLayers.map(([layer, text]) => (
            <div key={layer}>
              <strong>{layer}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section scan-modes-section">
        <SectionTitle
          eyebrow="Modos de evaluación"
          title="Tres formas de revisar, siempre sujetas a alcance y autorización."
          text="La selección del modo permite ajustar profundidad técnica, impacto relativo y controles de ejecución según el activo evaluado."
        />
        <div className="scan-mode-cards">
          {scanModes.map(([title, text]) => (
            <article key={title}>
              <span>{title}</span>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section remediation-strip-section">
        <div className="remediation-strip">
          <p className="eyebrow">Seguimiento</p>
          <h2>Del hallazgo a la remediación.</h2>
          <div className="remediation-flow" aria-label="Flujo de remediación">
            <span>Detectar</span><i />
            <span>Priorizar</span><i />
            <span>Explicar</span><i />
            <span>Reportar</span><i />
            <span>Remediar</span><i />
            <span>Revalidar</span>
          </div>
        </div>
      </section>

      <section className="section audience-section">
        <SectionTitle
          eyebrow="Para quién es"
          title="Diseñado para venta consultiva, operación TI y gobierno de seguridad."
        />
        <div className="audience-grid">
          {audiences.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section benefits-section">
        <div className="benefit-copy">
          <p className="eyebrow">Beneficios</p>
          <h2>Mejor visibilidad, mejor priorización y mejor conversación entre gerencia y equipos técnicos.</h2>
        </div>
        <div className="benefit-grid">
          {benefits.map((benefit) => <div key={benefit}>{benefit}</div>)}
        </div>
      </section>

      <section className="section differentiation">
        <p className="eyebrow">Diferenciación</p>
        <h2>No es solo un scanner. Es una capa de control y reportabilidad sobre revisiones autorizadas.</h2>
        <div className="difference-grid">
          <div>
            <strong>Antes del scan</strong>
            <p>Scope, ownership, aprobación y confirmación ética.</p>
          </div>
          <div>
            <strong>Durante el scan</strong>
            <p>Pipeline controlado, eventos de ejecución y herramientas según alcance.</p>
          </div>
          <div>
            <strong>Después del scan</strong>
            <p>Hallazgos priorizados, evidencia, narrativa, remediación y reporte.</p>
          </div>
        </div>
      </section>

      <section className="section managed-strip-section">
        <div className="managed-strip">
          <div>
            <p className="eyebrow">Servicio gestionado TECDEX</p>
            <h2>También puede operar como servicio acompañado.</h2>
          </div>
          <p>
            TECDEX puede operar la plataforma, revisar hallazgos, entregar reportes y acompañar la remediación según el alcance comercial acordado.
          </p>
        </div>
      </section>

      <section className="section transparency">
        <p className="eyebrow">Transparencia y uso responsable</p>
        <blockquote>
          TCDX ThreatWatch no reemplaza una evaluación de seguridad humana, no garantiza ausencia de vulnerabilidades y debe utilizarse únicamente sobre activos propios o autorizados. La plataforma entrega apoyo para reconocimiento, escaneo, análisis y reportabilidad, sujeto a revisión por responsables técnicos.
        </blockquote>
        <ul>
          <li>Solo activos propios o autorizados.</li>
          <li>Active scan requiere autorización explícita.</li>
          <li>Resultados sujetos a revisión técnica.</li>
          <li>No reemplaza auditorías formales.</li>
          <li>No garantiza ausencia total de vulnerabilidades.</li>
        </ul>
      </section>

      <section id="demo" className="section founder-section">
        <div className="founder-copy">
          <p className="eyebrow">Demo comercial</p>
          <h2>Programa fundador TCDX ThreatWatch</h2>
          <p>
            Cupos iniciales para empresas que quieran validar la plataforma con onboarding asistido, definición de scope controlado, primera ejecución autorizada, reporte ejecutivo/técnico y revisión conjunta de hallazgos.
          </p>
          <div className="plans">
            {plans.map(([name, desc]) => (
              <div key={name}>
                <strong>{name}</strong>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <form className="form" action="mailto:contacto@tecdex.cl" method="post" encType="text/plain">
          <h3>Agenda una demo controlada</h3>
          <p className="microcopy">Cuéntanos qué activos necesitas evaluar. TECDEX revisará el caso y propondrá un alcance inicial seguro.</p>
          <label>Empresa<input name="empresa" required /></label>
          <label>Nombre<input name="nombre" required /></label>
          <label>Cargo<input name="cargo" /></label>
          <label>Correo<input name="correo" type="email" required /></label>
          <label>Teléfono<input name="telefono" /></label>
          <label>Dominio / activo a evaluar<input name="activo" placeholder="ejemplo.cl / api.ejemplo.cl" /></label>
          <label>Tipo de empresa
            <select name="tipo_empresa">
              <option>Pyme con activos públicos</option>
              <option>Empresa SaaS</option>
              <option>Fintech</option>
              <option>Educación</option>
              <option>Empresa regulada</option>
              <option>Consultoría de seguridad</option>
              <option>Otra</option>
            </select>
          </label>
          <label>Mensaje<textarea name="mensaje" rows={4} /></label>
          <label className="check"><input type="checkbox" required /> <span>Declaro que solicito información para evaluar activos propios o autorizados.</span></label>
          <button className="button primary" type="submit">Solicitar demo controlada</button>
          <p className="microcopy">La demo no ejecuta scans automáticamente. Primero se valida alcance, ownership y autorización.</p>
        </form>
      </section>

      <section className="section faq-section">
        <SectionTitle eyebrow="FAQ" title="Preguntas frecuentes" />
        <div className="faq-grid">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer">
        <strong>TCDX ThreatWatch by TECDEX</strong>
        <span>Pentesting continuo y gestión de superficie expuesta.</span>
        <div>
          <a href="#demo">Solicitar demo</a>
          <a href="#top">Volver arriba</a>
        </div>
      </footer>
    </main>
  );
}
