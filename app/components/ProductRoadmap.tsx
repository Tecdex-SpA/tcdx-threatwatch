// Recuadro «Hoja de ruta» (doc 50 §3): reemplaza al antiguo «Estado del producto».
// Lista solo lo que aún no se comunica como disponible. Se usa en las subpáginas;
// la home muestra en su lugar el bloque «Acceso anticipado».

const roadmap = [
  "Retest automático para comprobar el cierre de cada hallazgo.",
  "Integraciones y API para conectar VULNERA con tus procesos.",
  "Carga de reportes en TECDEX Compliance.",
];

export function ProductRoadmap({ id = "hoja-de-ruta" }: { id?: string }) {
  return (
    <div className="status-card" id={id}>
      <div className="status-head">
        <h2>Hoja de ruta</h2>
      </div>
      <ul className="roadmap-list">
        {roadmap.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
