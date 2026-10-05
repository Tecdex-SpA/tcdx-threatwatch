// Preguntas frecuentes v2 (doc 50 §4, reemplaza doc 48 §6). Texto aprobado: la página
// /preguntas-frecuentes/ muestra las 8, la home las 5 primeras y el JSON-LD FAQPage
// usa este mismo texto.

export const faqs: [question: string, answer: string][] = [
  [
    "¿Qué parte del pentesting automatiza VULNERA?",
    "Las etapas repetibles: reconocimiento, descubrimiento de servicios y detección de vulnerabilidades conocidas. Así evalúas con más frecuencia y reservas a los especialistas para lo que exige criterio humano, como la lógica de negocio o los ataques encadenados.",
  ],
  [
    "¿Qué activos puedo evaluar?",
    "Tus dominios, subdominios, aplicaciones web y APIs. Cada evaluación parte confirmando que el activo es tuyo o que tienes autorización: trabajas con respaldo y sin riesgos legales.",
  ],
  [
    "¿Qué obtiene mi empresa?",
    "Una lectura clara del riesgo para gerencia y el detalle accionable para TI: cada hallazgo con severidad, evidencia y recomendación de corrección.",
  ],
  [
    "¿Cómo empiezo?",
    "Agenda una demo. Revisamos tu caso, definimos un alcance inicial y te mostramos cómo se vería la gestión de vulnerabilidades de tu organización en VULNERA.",
  ],
  [
    "¿Tengo apoyo para interpretar los resultados?",
    "Sí. El equipo de TECDEX te ayuda a definir el alcance, interpretar los hallazgos y priorizar qué corregir primero.",
  ],
  [
    "¿Por qué no basta con un informe de seguridad?",
    "Porque un informe es una foto. Sin seguimiento, los hallazgos quedan en una planilla y la siguiente auditoría encuentra lo mismo. La diferencia está en cerrar cada hallazgo y poder demostrarlo.",
  ],
  [
    "¿Me sirve para auditorías ISO 27001 o la Ley 21.663?",
    "Sí, como fuente de evidencia de tu gestión de vulnerabilidades técnicas. El sistema de gestión completo lo llevas en TECDEX Compliance, la plataforma hermana de VULNERA.",
  ],
  [
    "¿Qué pasa con mis datos?",
    "Cada organización tiene su espacio, con datos separados y acceso por roles. Solo se evalúa lo que autorizas.",
  ],
];

/** Bloque resumido de la home: las 5 primeras. */
export const homeFaqs = faqs.slice(0, 5);
