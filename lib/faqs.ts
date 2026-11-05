// Preguntas frecuentes v2 (doc 50 §4, reemplaza doc 48 §6). Texto aprobado: la página
// /preguntas-frecuentes/ muestra las 8, la home las 5 primeras y el JSON-LD FAQPage
// usa este mismo texto.

export const faqs: [question: string, answer: string][] = [
  [
    "¿Qué parte del pentesting está prevista automatizar en VULNERA?",
    "El diseño contempla apoyar etapas repetibles, como reconocimiento, descubrimiento y detección de vulnerabilidades conocidas, siempre dentro de un alcance autorizado. El servicio aún está en desarrollo y no sustituye el criterio humano.",
  ],
  [
    "¿Qué activos se contempla evaluar?",
    "Se contemplan dominios, subdominios, aplicaciones web y APIs propios o expresamente autorizados. Antes de cualquier evaluación, deberán validarse propiedad o autorización y alcance exacto; esto no elimina por sí solo los riesgos técnicos o legales.",
  ],
  [
    "¿Qué información se contempla entregar?",
    "Se contempla presentar hallazgos con severidad, evidencia y recomendaciones, con vistas para gerencia y equipos técnicos. La disponibilidad de esos entregables está pendiente de validación integral.",
  ],
  [
    "¿Cómo empiezo?",
    "Solicita información al equipo TECDEX. Revisaremos tu consulta, explicaremos el estado actual de VULNERA y cómo se gestionan las autorizaciones y el alcance de una posible evaluación.",
  ],
  [
    "¿Tengo apoyo para interpretar los resultados?",
    "Puedes solicitar orientación al equipo TECDEX sobre alcance, hallazgos y prioridades. Las funciones automatizadas de VULNERA aún no están habilitadas como servicio.",
  ],
  [
    "¿Por qué no basta con un informe de seguridad?",
    "Porque un informe es una foto. Sin seguimiento, los hallazgos quedan en una planilla y la siguiente auditoría encuentra lo mismo. La diferencia está en cerrar cada hallazgo y poder demostrarlo.",
  ],
  [
    "¿Me sirve para auditorías ISO 27001 o la Ley 21.663?",
    "El diseño contempla aportar evidencia técnica útil para la gestión de vulnerabilidades, pero VULNERA aún no está habilitada como servicio y no certifica cumplimiento. TECDEX Compliance aborda la gestión de controles y evidencias.",
  ],
  [
    "¿Qué pasa con mis datos?",
    "La arquitectura contempla organizaciones y permisos por rol. Su validación integral es un requisito previo a habilitar el servicio. Solo se evalúa lo que autorizas.",
  ],
];

/** Bloque resumido de la home: las 5 primeras. */
export const homeFaqs = faqs.slice(0, 5);

/**
 * Remate hacia la guía de pentesting automatizado (P1-9, doc 58 PASO 4.2a).
 * Solo en `/preguntas-frecuentes/`: la home mantiene la respuesta aprobada del doc 50.
 * La página lo renderiza con enlace y el JSON-LD con el mismo texto plano.
 */
export const pentestingGuideNote = {
  before: "Más detalle en la guía de ",
  linkText: "pentesting automatizado",
  href: "/pentesting-automatizado/",
  after: ".",
};

const noteText = `${pentestingGuideNote.before}${pentestingGuideNote.linkText}${pentestingGuideNote.after}`;

/** Las mismas 8 preguntas, con el remate añadido a la primera. */
export const faqPageFaqs: [question: string, answer: string][] = faqs.map(([question, answer], index) =>
  index === 0 ? [question, `${answer} ${noteText}`] : [question, answer],
);
