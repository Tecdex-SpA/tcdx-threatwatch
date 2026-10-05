// Tabla «VULNERA automatiza / Tu equipo o tu especialista decide» (doc 50 §2.2).
// Se usa en la home y en /como-funciona/ (doc 50 §3).

const rows = [
  ["Reconocimiento de activos y subdominios", "Lógica de negocio y abuso de flujos"],
  ["Descubrimiento de puertos y servicios expuestos", "Encadenamiento de vulnerabilidades"],
  ["Detección de vulnerabilidades conocidas y configuraciones inseguras", "Validación de casos complejos"],
  ["Consolidación y priorización de hallazgos", "Decisiones de riesgo y remediación"],
];

export function AutomationTable() {
  return (
    <>
      <div className="table-scroll automation-scroll">
        <table className="content-table automation-table">
          <thead>
            <tr>
              <th scope="col">VULNERA automatiza</th>
              <th scope="col">Tu equipo o tu especialista decide</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([automated, human]) => (
              <tr key={automated}>
                <td>{automated}</td>
                <td>{human}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="automation-note">Cada evaluación requiere autorización y aprobación explícita antes de ejecutarse.</p>
    </>
  );
}
