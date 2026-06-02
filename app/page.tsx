const modules = [
  {
    title: "Dashboard ejecutivo",
    text: "Vista de exposición, severidades, actividad reciente y evolución de scans para dirección, TI y seguridad.",
    tag: "Visibilidad",
  },
  {
    title: "Scopes autorizados",
    text: "Registro formal de dominios, IPs, CIDR y activos permitidos antes de iniciar cualquier revisión.",
    tag: "Alcance",
  },
  {
    title: "Ownership verification",
    text: "Validación mediante DNS TXT o evidencia manual para respaldar propiedad, autorización y trazabilidad.",
    tag: "Control",
  },
  {
    title: "Approval Gate",
    text: "Bloqueo preventivo si no existe scope, ownership vigente y aprobación válida asociada al tenant y target.",
    tag: "Autorización",
  },
  {
    title: "Scan Wizard",
    text: "Creación guiada de scans con confirmación ética, modo de evaluación y alcance permitido.",
    tag: "Operación",
  },
  {
    title: "Motor técnico",
    text: "Pipeline con Subfinder, Nmap, Nuclei, OWASP ZAP y Nikto, aplicado según autorización y configuración.",
    tag: "Pipeline",
  },
  {
    title: "Hallazgos priorizados",
    text: "Severidad, CVE/CWE, evidencia, impacto técnico, impacto de negocio y remediación sugerida.",
    tag: "Riesgo",
  },
  {
    title: "Reportes ejecutivos y técnicos",
    text: "Material para dirección, equipos TI, seguridad y seguimiento interno en formatos HTML, PDF o Markdown.",
    tag: "Reporte",
  },
  {
    title: "Equipo, API y trazabilidad",
    text: "Roles por organización, API Keys e integraciones según plan, con auditoría de acciones relevantes.",
    tag: "SaaS B2B",
  },
];

const steps = [
  ["01", "Defina alcance", "Registre dominios, IPs, CIDR o activos que pueden ser evaluados."],
  ["02", "Valide ownership", "Confirme propiedad o autorización mediante DNS TXT o evidencia revisable."],
  ["03", "Apruebe el scan", "Genere aprobación controlada antes de ejecutar pruebas sensibles."],
  ["04", "Ejecute con control", "Seleccione modo de scan y restricciones según el scope permitido."],
  ["05", "Priorice hallazgos", "Revise severidad, evidencia, impacto, CVE/CWE y contexto técnico."],
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

const tools = [
  ["Subfinder", "Reconocimiento de subdominios y superficie pública."],
  ["Nmap", "Identificación de puertos, protocolos y servicios expuestos."],
  ["Nuclei", "Detección basada en templates y patrones conocidos."],
  ["OWASP ZAP", "Análisis web pasivo/activo bajo autorización explícita."],
  ["Nikto", "Revisión web de configuraciones, archivos conocidos y exposición básica."],
  ["NVD / OSV / CVE / CWE", "Enriquecimiento contextual de hallazgos cuando aplica."],
  ["IA asistida", "Narrativa ejecutiva y remediación sugerida, sujeta a revisión técnica."],
];

const faqs = [
  ["¿TCDX ThreatWatch reemplaza a un pentester?", "No. Apoya reconocimiento, escaneo, análisis, priorización y reportabilidad. Los resultados deben ser revisados por responsables técnicos o especialistas de seguridad."],
  ["¿Garantiza que mi empresa queda segura?", "No. Ninguna herramienta puede garantizar ausencia total de vulnerabilidades. La plataforma mejora visibilidad, priorización y seguimiento dentro del alcance autorizado."],
  ["¿Puede escanear cualquier dominio?", "No. Debe usarse únicamente sobre activos propios o autorizados, con scopes, ownership verification y approval gate."],
  ["¿Qué necesito para comenzar?", "Definir activos a evaluar, confirmar ownership o autorización, acordar un scope inicial y ejecutar una demo controlada con TECDEX."],
  ["¿Qué reportes genera?", "Reportes ejecutivos y técnicos con hallazgos, severidad, evidencia, impacto y recomendaciones de remediación, según alcance y configuración."],
  ["¿Sirve para gerencia?", "Sí. Traduce hallazgos técnicos en información priorizada para apoyar decisiones de riesgo, inversión y remediación."],
  ["¿Sirve para equipos técnicos?", "Sí. Los hallazgos pueden incluir evidencia, servicios afectados, severidad, CVE/CWE, impacto técnico y pasos de validación o remediación."],
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
          <h1>Controle alcance, autorización y reportes antes de escanear.</h1>
          <p className="lead">
            TCDX ThreatWatch by TECDEX ayuda a empresas a revisar activos expuestos con scopes autorizados, validación de ownership, approval gate, hallazgos priorizados y reportabilidad ejecutiva/técnica.
          </p>
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
                {['Scope','Ownership','Approval','Scan','Findings','Reporte'].map((item) => <span key={item}>{item}</span>)}
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
        <div className="pain-grid">
          <div>Escaneos manuales esporádicos</div>
          <div>Reportes técnicos difíciles para gerencia</div>
          <div>Hallazgos sin seguimiento histórico</div>
          <div>Scope y autorización poco trazables</div>
        </div>
      </section>

      <section className="section solution-section">
        <SectionTitle
          eyebrow="Solución"
          title="Una plataforma para controlar el ciclo completo: alcance, ownership, aprobación, evidencia y reporte."
          text="TCDX ThreatWatch no se posiciona como un scanner aislado. Ordena el proceso de revisión sobre activos propios o autorizados, entrega evidencia técnica y convierte resultados en material accionable para dirección y equipos técnicos."
        />
        <div className="value-strip">
          <span>Reconocimiento automatizado</span>
          <span>Escaneo controlado</span>
          <span>Hallazgos priorizados</span>
          <span>Reportabilidad ejecutiva</span>
          <span>Seguimiento histórico</span>
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
      </section>

      <section id="modulos" className="section">
        <SectionTitle
          eyebrow="Módulos"
          title="Componentes comerciales y técnicos para una operación SaaS B2B controlada."
          text="Cada módulo está orientado a reducir ambigüedad operativa: quién autorizó, qué activo se revisó, cómo se ejecutó, qué se encontró y cómo se reportó."
        />
        <div className="cards">
          {modules.map((module) => (
            <article className="card" key={module.title}>
              <span>{module.tag}</span>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="tecnico" className="section technical-section">
        <div>
          <p className="eyebrow">Motor técnico</p>
          <h2>Herramientas reconocidas, orquestadas con alcance y autorización.</h2>
          <p>
            El pipeline combina reconocimiento, validaciones controladas, deduplicación, enriquecimiento y narrativa asistida. El uso de pruebas activas se comunica y controla según autorización explícita y configuración del scope.
          </p>
          <div className="mode-grid">
            <div><strong>Sin ZAP</strong><span>Reconocimiento y pruebas controladas sin ZAP activo.</span></div>
            <div><strong>Solo Web</strong><span>Foco en superficie web según alcance autorizado.</span></div>
            <div><strong>Completo</strong><span>Incluye análisis web con ZAP cuando existe autorización válida.</span></div>
          </div>
        </div>
        <div className="tool-list">
          {tools.map(([tool, text]) => (
            <div key={tool}>
              <strong>{tool}</strong>
              <span>{text}</span>
            </div>
          ))}
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
          <h3>Solicitar demo controlada</h3>
          <p className="microcopy">Un especialista de TECDEX revisará tu caso y propondrá un alcance inicial seguro.</p>
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
