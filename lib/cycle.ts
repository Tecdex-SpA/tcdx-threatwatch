// Ciclo de cuatro pasos (doc 48 §1, paso 03 según doc 50 §2.3). Lo usan el bloque
// «Control por diseño» de la home y la tabla «Las cuatro etapas» de /como-funciona/.

export const cycleSteps: [number: string, title: string, text: string][] = [
  ["01", "Definir el alcance", "Registras dominios, IPs, APIs y servicios que se pueden evaluar."],
  ["02", "Validar autorización", "Se confirma propiedad o evidencia verificable antes de cualquier revisión."],
  ["03", "Automatizar la evaluación", "VULNERA ejecuta reconocimiento, descubrimiento y detección dentro del alcance aprobado."],
  ["04", "Priorizar y cerrar", "La evidencia se convierte en decisiones, responsables y seguimiento."],
];
