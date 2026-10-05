import { IBM_Plex_Mono, IBM_Plex_Sans_Condensed } from "next/font/google";

// Miniatura del hero (P0-8): recreación reducida del dashboard actual de la app
// (tema oscuro, tokens de la consola). Contenido curado y cifras sintéticas:
// sin anotaciones de desarrollo, rutas de API ni nombres de herramientas.
// La etiqueta «Vista de demostración · datos ilustrativos» es obligatoria (doc 48 §1).

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  preload: false,
});

const plexSans = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-plex-sans",
  preload: false,
});

const navGroups = [
  { label: "Autorización", items: ["Objetivos y propiedad", "Alcance", "Evaluaciones", "Aprobaciones"] },
  { label: "Auditorías", items: ["Auditorías", "Hallazgos", "Informes"] },
];

const severities = [
  ["Crítica", "critical", 2],
  ["Alta", "high", 5],
  ["Media", "medium", 9],
  ["Baja", "low", 6],
  ["Info", "info", 2],
] as const;

const maxSeverity = Math.max(...severities.map(([, , count]) => count));
const totalFindings = severities.reduce((sum, [, , count]) => sum + count, 0);

const scope = [
  ["Alcances activos", 2],
  ["Objetivos con propiedad vigente", 3],
  ["Verificaciones pendientes", 1],
] as const;

const audits = [
  ["example.com", "Completo", 14],
  ["demo.example.com", "Solo web", 10],
] as const;

export function DashboardPreview() {
  return (
    <figure className={`dash ${plexMono.variable} ${plexSans.variable}`} aria-label="Vista de demostración de la plataforma">
      <figcaption className="dash-label">Vista de demostración · datos ilustrativos</figcaption>

      <div className="dash-app">
        <aside className="dash-rail" aria-hidden="true">
          <div className="dash-brand">
            <strong>VULNERA</strong>
            <span>de TECDEX</span>
          </div>
          <span className="dash-nav is-active">Inicio</span>
          {navGroups.map((group) => (
            <div className="dash-nav-group" key={group.label}>
              <span className="dash-mono-label">{group.label}</span>
              {group.items.map((item) => <span className="dash-nav" key={item}>{item}</span>)}
            </div>
          ))}
          <span className="dash-nav is-muted">
            Remediación y retest <em>En desarrollo</em>
          </span>
        </aside>

        <div className="dash-main">
          <div className="dash-top">
            <span className="dash-mono-label">Inicio</span>
            <dl className="dash-context">
              <div><dt>Organización</dt><dd>Organización demo</dd></div>
              <div><dt>Rol</dt><dd>Owner</dd></div>
              <div><dt>Alcance activo</dt><dd>2 alcances</dd></div>
            </dl>
          </div>

          <div className="dash-body">
            <section className="dash-card dash-severity">
              <span className="dash-mono-label">Hallazgos sin revisar por severidad</span>
              <p className="dash-total"><strong>{totalFindings}</strong> hallazgos sin revisar</p>
              <ul>
                {severities.map(([label, level, count]) => (
                  <li key={level}>
                    <span>{label}</span>
                    <span className="dash-track">
                      <span className={`dash-fill dash-sev-${level}`} style={{ width: `${(count / maxSeverity) * 100}%` }} />
                    </span>
                    <span className="dash-num">{count}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="dash-card dash-scope">
              <span className="dash-mono-label">Alcance y propiedad</span>
              <dl>
                {scope.map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd className="dash-num">{value}</dd></div>
                ))}
              </dl>
            </section>

            <section className="dash-card dash-audits">
              <span className="dash-mono-label">Últimas auditorías</span>
              <table>
                <thead>
                  <tr><th>Objetivo</th><th className="dash-col-type">Tipo</th><th>Estado</th><th>Hallazgos</th></tr>
                </thead>
                <tbody>
                  {audits.map(([target, type, findings]) => (
                    <tr key={target}>
                      <td className="dash-num">{target}</td>
                      <td className="dash-col-type">{type}</td>
                      <td><span className="dash-status">Completada</span></td>
                      <td className="dash-num">{findings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </figure>
  );
}
