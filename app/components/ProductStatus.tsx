// Bloque «Estado del producto» (doc 48 §5). Obligatorio en la home y en /como-funciona.
// Actualizar contenido e insignia cuando cambie el estado real del producto.

const available = [
  "Organizaciones, roles y separación de datos entre clientes",
  "Flujo de alcance, validación de propiedad y aprobación",
  "Vista de hallazgos con severidad, evidencia y recomendación",
  "Informes para gerencia y para TI (sobre datos de ejemplo)",
];

const inDevelopment = [
  "Ejecución integrada de evaluaciones dentro de la plataforma",
  "Seguimiento de remediación y retest de cierre",
  "API, claves y webhooks (hoy en vista previa)",
  "Carga de reportes en TECDEX Compliance",
];

export function ProductStatus({ id = "estado" }: { id?: string }) {
  return (
    <div className="status-card" id={id}>
      <div className="status-head">
        <h2>Estado del producto</h2>
        <span className="status-badge">Actualizado: octubre 2026</span>
      </div>
      <p className="status-intro">
        VULNERA está en desarrollo activo. Preferimos decirte con exactitud en qué punto está, en
        vez de prometer lo que todavía no ejecuta.
      </p>
      <div className="status-cols">
        <div className="status-col status-col--available">
          <h3>Disponible para demostración</h3>
          <ul>{available.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="status-col status-col--dev">
          <h3>En desarrollo</h3>
          <ul>{inDevelopment.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
