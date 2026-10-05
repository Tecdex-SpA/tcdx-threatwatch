// Preguntas frecuentes (doc 48 §6). Texto aprobado: la página /preguntas-frecuentes/
// muestra las 8, la home las 5 primeras y el JSON-LD FAQPage usa este mismo texto.

export const faqs: [question: string, answer: string][] = [
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
  [
    "¿VULNERA me deja cumpliendo ISO 27001?",
    "No por sí sola. Aporta evidencia de la gestión de vulnerabilidades técnicas (útil para el control 8.8), pero la certificación la otorga un auditor y el sistema de gestión se lleva en TECDEX Compliance.",
  ],
  [
    "¿Usa inteligencia artificial?",
    "VULNERA automatiza partes del proceso de evaluación y organización de hallazgos. No es una IA con permiso abierto para atacar: toda evaluación ocurre dentro de un alcance autorizado y con aprobación humana.",
  ],
  [
    "¿Qué pasa con mis datos?",
    "Cada organización tiene su espacio con separación de datos. Solo se evalúa lo que autorizas. Las demostraciones usan datos de ejemplo, nunca datos reales de clientes sin permiso.",
  ],
];

/** Bloque resumido de la home: las 5 primeras. */
export const homeFaqs = faqs.slice(0, 5);
