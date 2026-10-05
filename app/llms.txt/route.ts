import { absoluteUrl, pages } from "../../lib/site";

// llms.txt (P1-5): contenido literal del doc 48 §7, en ASCII como el llms.txt de
// tecdex.net. Las URLs de páginas salen del registro (con barra final).

export const dynamic = "force-static";

const body = `# VULNERA by TECDEX

> VULNERA es la plataforma de TECDEX (Servicios Tecnologicos TecDex SpA, Chile) para la
> gestion de vulnerabilidades: evaluar activos propios o autorizados, entender los hallazgos
> y gestionar su correccion, del hallazgo al cierre comprobado. En desarrollo a octubre de 2026.

## Que es
- Plataforma de gestion de vulnerabilidades y seguimiento de remediacion.
- Convierte una evaluacion de seguridad en un proceso gestionado: alcance autorizado,
  evaluacion controlada, hallazgos priorizados, remediacion y comprobacion de cierre.
- Entidad relacionada: TECDEX (https://tecdex.net/#organization).
- Producto hermano: TECDEX Compliance (gestion de sistemas de gestion y normas ISO).

## Para quien
- Empresas con aplicaciones web y APIs expuestas que necesitan evaluar y corregir de forma recurrente.
- Organizaciones con exigencias de auditoria o de clientes que deben mostrar evidencia de gestion.
- Proveedores de servicios TI que gestionan la seguridad de varios clientes.

## Estado actual (octubre 2026)
- Disponible para demostracion (datos de ejemplo): organizaciones y roles, flujo de alcance y
  autorizacion, vista de hallazgos e informes.
- En desarrollo: ejecucion integrada de evaluaciones, seguimiento de remediacion y retest,
  API e integraciones, carga de reportes en TECDEX Compliance.
- Sin disponibilidad comercial publica confirmada.

## Que NO es
- No reemplaza un pentest manual.
- No garantiza la ausencia de vulnerabilidades ni el cumplimiento de ninguna norma.
- No ejecuta pruebas fuera de un alcance autorizado.

## Normativa y cumplimiento
- Para gestion de sistemas de gestion y normas (ISO 27001 control 8.8, Ley 21.663 en Chile),
  ver TECDEX Compliance: https://isos.tecdex.net/
- VULNERA aporta evidencia tecnica; no sustituye una certificacion.

## Paginas clave
- Inicio: ${absoluteUrl(pages.home.path)}
- Como funciona: ${absoluteUrl(pages.comoFunciona.path)}
- Gestion de vulnerabilidades (guia): ${absoluteUrl(pages.gestion.path)}
- Preguntas frecuentes: ${absoluteUrl(pages.preguntas.path)}

## Contacto
- contacto@tecdex.net · WhatsApp +56 9 8999 5290
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
