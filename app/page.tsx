const modules = [
  ["Dashboard ejecutivo", "Métricas de scans, severidades, actividad reciente y evolución de exposición para dirección y equipos TI."],
  ["Scopes autorizados", "Definición formal de dominios, IPs, CIDR o activos permitidos antes de iniciar revisiones."],
  ["Ownership verification", "Flujo de validación por DNS TXT o evidencia manual para respaldar autorización y control."],
  ["Approval Gate", "Bloqueo de scans sensibles si no existe scope, ownership vigente y aprobación válida."],
  ["Scan Wizard", "Creación guiada de scans con confirmación ética, selección de modo y alcance permitido."],
  ["Motor de escaneo", "Subfinder, Nmap, Nuclei, OWASP ZAP y Nikto dentro de un pipeline controlado."],
  ["Hallazgos priorizados", "Severidad, CVE/CWE, evidencia, impacto técnico, impacto de negocio y remediación."],
  ["Reportes ejecutivos y técnicos", "Material para dirección, TI, seguridad y seguimiento, en HTML, PDF o Markdown."],
  ["Equipo y roles", "Roles tipo owner, admin, analyst y viewer para separar operación, análisis y visibilidad."],
  ["API Keys y Webhooks", "Integraciones y acceso programático según plan, madurez técnica y roadmap comercial."],
  ["Auditoría y trazabilidad", "Registro de autorización, ownership, approval tokens y acciones relevantes."],
];

const steps = [
  "Define scopes autorizados",
  "Valida ownership del dominio, IP o CIDR",
  "Solicita aprobación controlada",
  "Ejecuta un scan según alcance permitido",
  "Analiza hallazgos, severidad y evidencia",
  "Genera reportes ejecutivos y técnicos",
  "Da seguimiento y prioriza remediación",
];

const audiences = [
  ["Gerentes generales", "Visión priorizada para tomar decisiones de riesgo, inversión y continuidad."],
  ["Gerentes TI", "Seguimiento periódico de activos expuestos, servicios, puertos y hallazgos."],
  ["CISOs y seguridad", "Evidencia técnica, trazabilidad de autorización y priorización para remediación."],
  ["Cumplimiento", "Apoyo documental para procesos internos, auditorías y gestión de riesgos."],
  ["SaaS, fintech y educación", "Control de exposición pública en portales, APIs, dominios y servicios críticos."],
  ["Consultores y DevSecOps", "Reportabilidad, seguimiento e integración operativa según plan."],
];

const benefits = [
  "Mayor visibilidad de superficie expuesta.",
  "Alcance controlado y evidencia de autorización.",
  "Hallazgos priorizados con impacto técnico y de negocio.",
  "Reportes comprensibles para dirección y útiles para equipos técnicos.",
  "Menor dependencia de revisiones aisladas o esporádicas.",
  "Seguimiento histórico para remediación, hardening y consultoría.",
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
  ["Starter", "Pocos dominios, scans limitados y reporte básico."],
  ["Professional", "Scans periódicos, reporte ejecutivo + técnico y priorización."],
  ["Business / Advanced", "Múltiples scopes, active scan autorizado, histórico y seguimiento."],
  ["Enterprise / Compliance", "API, webhooks, soporte, reportes personalizados y revisión manual."],
  ["Servicio gestionado", "TECDEX opera, revisa, reporta y acompaña la remediación."],
];

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

export default function Page() {
  return (
    <main>
      <header className="nav">
        <a href="#top" className="brand" aria-label="TCDX ThreatWatch by TECDEX">
          <ShieldLogo />
          <span>TCDX ThreatWatch <small>by TECDEX</small></span>
        </a>
        <nav>
          <a href="#funciona">Cómo funciona</a>
          <a href="#modulos">Módulos</a>
          <a href="#demo">Demo</a>
        </nav>
      </header>

      <section id="top" className="hero section-grid">
        <div className="hero-copy">
          <div className="badge">Pentesting continuo y gestión de superficie expuesta</div>
          <h1>Pentesting continuo con control de alcance, autorización y reportes ejecutivos</h1>
          <p className="lead">Controle qué se escanea, valide autorización, priorice hallazgos y genere reportes ejecutivos/técnicos desde una plataforma SaaS chilena.</p>
          <p className="support">TCDX ThreatWatch by TECDEX ayuda a equipos TI, seguridad y cumplimiento a revisar activos expuestos con scopes autorizados, ownership verification, approval gate, evidencia trazable y reportabilidad orientada a decisión.</p>
          <div className="cta-row">
            <a className="button primary" href="#demo">Solicitar demo</a>
            <a className="button secondary" href="#funciona">Ver cómo funciona</a>
          </div>
          <p className="ethic-note">Uso exclusivo sobre activos propios o autorizados.</p>
        </div>

        <div className="mockup" aria-label="Mockup dashboard TCDX ThreatWatch">
          <div className="mock-sidebar">
            <ShieldLogo />
            <span>Dashboard</span><span>Scopes</span><span>Scans</span><span>Findings</span><span>Reports</span>
          </div>
          <div className="mock-content">
            <div className="mock-top"><span>ThreatWatch Console</span><span className="status verified">Verificado</span></div>
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
              <div><strong>Exposición de servicio web</strong><p>Host: api.cliente.cl · Puerto 443 · Evidencia adjunta</p></div>
              <SeverityBadge label="High" />
            </div>
            <div className="finding-card">
              <div><strong>Header de seguridad ausente</strong><p>OWASP · CWE · Validación técnica requerida</p></div>
              <SeverityBadge label="Medium" />
            </div>
            <div className="status-row">
              <span className="status completed">Completado</span><span className="status progress">En curso</span><span className="status failed">Fallido</span><span className="status pending">Pendiente</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section two-col problem">
        <div>
          <p className="eyebrow">Problema</p>
          <h2>Activos públicos, revisiones aisladas y reportes difíciles de accionar</h2>
        </div>
        <div className="text-card">
          <p>Dominios, subdominios, APIs, portales y servicios expuestos cambian con frecuencia. Muchas empresas dependen de revisiones manuales esporádicas, hallazgos sin seguimiento y reportes demasiado técnicos para gerencia.</p>
          <p>El riesgo operacional aumenta cuando no existe trazabilidad clara del alcance autorizado, evidencia de ownership o controles previos antes de ejecutar revisiones activas.</p>
        </div>
      </section>

      <section className="section solution">
        <p className="eyebrow">Solución</p>
        <h2>No se trata solo de escanear. Se trata de controlar alcance, autorización, evidencia, hallazgos, trazabilidad y reportes.</h2>
        <div className="feature-band">
          <span>Reconocimiento automatizado</span><span>Escaneo controlado</span><span>Hallazgos priorizados</span><span>Reportabilidad ejecutiva/técnica</span><span>Seguimiento histórico</span>
        </div>
      </section>

      <section id="modulos" className="section">
        <p className="eyebrow">Módulos comerciales</p>
        <h2>Una plataforma SaaS B2B diseñada para operación controlada</h2>
        <div className="cards">
          {modules.map(([title, text]) => (
            <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section id="funciona" className="section">
        <p className="eyebrow">Cómo funciona</p>
        <h2>Del scope autorizado al reporte accionable</h2>
        <div className="steps">
          {steps.map((step, idx) => <div className="step" key={step}><b>{idx + 1}</b><span>{step}</span></div>)}
        </div>
      </section>

      <section className="section technical">
        <div>
          <p className="eyebrow">Motor técnico</p>
          <h2>Pipeline de reconocimiento, validación y enriquecimiento</h2>
          <p>El motor combina Subfinder, Nmap, Nuclei, OWASP ZAP y Nikto, junto con enriquecimiento NVD/OSV/CVE/CWE cuando aplica. La narrativa ejecutiva y la remediación asistida por IA quedan sujetas a revisión humana.</p>
        </div>
        <div className="terminal-card">
          <code>scope → ownership → approval token → scan controlado</code>
          <code>subfinder · nmap · nuclei · zap · nikto</code>
          <code>deduplicación · evidencia · severidad · remediación</code>
          <code>reporte ejecutivo · reporte técnico · seguimiento</code>
        </div>
      </section>

      <section className="section audience">
        <p className="eyebrow">Para quién es</p>
        <h2>Claridad para gerencia. Precisión para equipos técnicos.</h2>
        <div className="cards audience-cards">
          {audiences.map(([title, text]) => <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="section benefits">
        <p className="eyebrow">Beneficios</p>
        <h2>Base para gestionar exposición, riesgo y remediación</h2>
        <div className="benefit-grid">{benefits.map((item) => <div key={item}>✓ {item}</div>)}</div>
      </section>

      <section className="section differentiation two-col">
        <div>
          <p className="eyebrow">Diferenciación</p>
          <h2>Más que un scanner</h2>
        </div>
        <div className="text-card">
          <p>TCDX ThreatWatch by TECDEX combina scope, ownership, aprobación, evidencia, trazabilidad y reporte en un flujo preparado para venta consultiva B2B, operación SaaS y servicio gestionado.</p>
          <p>Su enfoque regional permite acompañar a pymes, fintech, educación, SaaS y empresas reguladas con lenguaje claro para dirección y suficiente detalle para seguridad.</p>
        </div>
      </section>

      <section className="section transparency">
        <p className="eyebrow">Transparencia y uso responsable</p>
        <h2>Uso autorizado, revisión técnica y alcance controlado</h2>
        <blockquote>TCDX ThreatWatch no reemplaza una evaluación de seguridad humana, no garantiza ausencia de vulnerabilidades y debe utilizarse únicamente sobre activos propios o autorizados. La plataforma entrega apoyo para reconocimiento, escaneo, análisis y reportabilidad, sujeto a revisión por responsables técnicos.</blockquote>
        <ul>
          <li>Solo activos propios o autorizados.</li>
          <li>Active scan requiere autorización explícita.</li>
          <li>Resultados sujetos a revisión técnica.</li>
          <li>No reemplaza auditorías formales.</li>
          <li>No garantiza ausencia total de vulnerabilidades.</li>
        </ul>
      </section>

      <section id="demo" className="section founder two-col">
        <div>
          <p className="eyebrow">Programa fundador</p>
          <h2>Programa fundador TCDX ThreatWatch</h2>
          <p>Demo comercial, onboarding asistido, validación técnica previa, definición de scope controlado, primer reporte ejecutivo/técnico y revisión conjunta de hallazgos.</p>
          <div className="plans">{plans.map(([name, desc]) => <div key={name}><strong>{name}</strong><span>{desc}</span></div>)}</div>
        </div>
        <form className="form" action="mailto:contacto@tecdex.cl" method="post" encType="text/plain">
          <h3>Solicitar demo controlada</h3>
          <label>Empresa<input name="empresa" required /></label>
          <label>Nombre<input name="nombre" required /></label>
          <label>Cargo<input name="cargo" /></label>
          <label>Correo<input name="correo" type="email" required /></label>
          <label>Teléfono<input name="telefono" /></label>
          <label>Dominio / activo a evaluar<input name="activo" /></label>
          <label>Tipo de empresa<select name="tipo"><option>Pyme</option><option>SaaS</option><option>Fintech</option><option>Educación</option><option>Empresa regulada</option><option>Consultoría</option><option>Otro</option></select></label>
          <label>Mensaje<textarea name="mensaje" rows={4} /></label>
          <label className="check"><input type="checkbox" required />Declaro que solicito información para evaluar activos propios o autorizados.</label>
          <button className="button primary" type="submit">Solicitar demo controlada</button>
          <p className="microcopy">Un especialista de TECDEX revisará tu caso y propondrá un alcance inicial seguro.</p>
        </form>
      </section>

      <section className="section faq">
        <p className="eyebrow">FAQ</p>
        <h2>Preguntas frecuentes</h2>
        <div className="faq-grid">
          {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </section>

      <footer className="footer">
        <ShieldLogo />
        <p><strong>TCDX ThreatWatch by TECDEX</strong><br />Pentesting continuo y gestión de superficie expuesta.</p>
        <div><a href="#top">Volver arriba</a><a href="/privacidad">Privacidad</a><a href="/terminos">Términos</a></div>
      </footer>
    </main>
  );
}
