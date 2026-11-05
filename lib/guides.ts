// Contenido de las guías del clúster (P1-9, docs 56 y 57). Fuente única de las
// preguntas frecuentes y de las fuentes: la página las muestra y
// `structured-data.ts` genera el JSON-LD desde aquí, de modo que el texto
// visible y el de `FAQPage` no puedan separarse (doc 58 PASO 3).

export type Faq = [question: string, answer: string];
/** `href` vacío = fuente citada sin enlace (sitio fuera de servicio). */
export type Source = [label: string, href?: string];

/** Fecha del deploy de P1-9: alimenta la línea de autoría, el JSON-LD y el sitemap. */
export const guideDates = {
  published: { iso: "2026-10-31", label: "31 de octubre de 2026" },
  revised: { iso: "2026-11-05", label: "5 de noviembre de 2026" },
};

export const pentestingFaqs: Faq[] = [
  [
    "¿El pentesting automatizado reemplaza al pentest manual?",
    "No. Lo complementa. La evaluación automatizada cubre con frecuencia las etapas repetibles, como el reconocimiento, el descubrimiento y la detección de vulnerabilidades conocidas. El pentest manual aporta lo que requiere criterio humano: la lógica de negocio, los ataques encadenados y la validación de casos complejos.",
  ],
  [
    "¿Cuál es la diferencia entre un pentest y un escaneo de vulnerabilidades?",
    "Un escaneo busca debilidades conocidas y entrega una lista de posibles problemas. Un pentest intenta confirmar si esas debilidades se pueden aprovechar, en qué orden y con qué impacto, dentro de un alcance autorizado. El pentesting automatizado ejecuta con método las etapas de un pentest que se pueden estandarizar.",
  ],
  [
    "¿Cada cuánto se debe hacer un pentest?",
    "Depende de cuánto cambian tus sistemas y de lo que te exijan clientes o reguladores. Como referencia, PCI DSS v4.0.1 pide un pentest al menos cada 12 meses y después de cambios significativos. Un criterio práctico es combinar una evaluación automatizada recurrente con un pentest manual anual sobre los sistemas críticos.",
  ],
  [
    "¿Se puede hacer un pentest automatizado sin autorización?",
    "No. Solo se deben evaluar activos propios o con autorización expresa de su dueño, y dentro de un alcance escrito que diga qué se prueba, cuándo y qué queda excluido. Probar sistemas de terceros sin autorización puede tener consecuencias legales.",
  ],
  [
    "¿Una prueba automatizada puede afectar el funcionamiento de mis sistemas?",
    "Cualquier prueba activa genera tráfico y carga sobre el sistema evaluado. Por eso el alcance debe definir horarios, intensidad y exclusiones, y cada evaluación debe tener un responsable que la apruebe y pueda detenerla si es necesario.",
  ],
  [
    "¿Un pentest automatizado sirve como evidencia para una auditoría?",
    "Puede aportar evidencia técnica de que las vulnerabilidades se evalúan y se gestionan, pero no certifica el cumplimiento de ninguna norma. La gestión del sistema completo, por ejemplo para ISO 27001 o la Ley 21.663, se trabaja en TECDEX Compliance.",
  ],
];

export const pentestingSources: Source[] = [
  [
    "NIST, SP 800-115: Technical Guide to Information Security Testing and Assessment (2008, versión final vigente)",
    "https://csrc.nist.gov/pubs/sp/800/115/final",
  ],
  // pentest-standard.org no responde (comprobado el 2026-10-31 por curl y por
  // navegador; el DNS resuelve, no hay respuesta HTTP). Se cita sin enlace en vez
  // de mandar al lector a un sitio caído. La afirmación del cuerpo («PTES lo
  // detalla en siete secciones») no depende del enlace.
  ["Penetration Testing Execution Standard (PTES) — sitio fuera de servicio al 31 de octubre de 2026"],
  [
    "OWASP Foundation, Web Security Testing Guide (versión estable 4.2; la 5.0 está en desarrollo)",
    "https://owasp.org/www-project-web-security-testing-guide/",
  ],
  ["NCSC (Reino Unido), Penetration testing", "https://www.ncsc.gov.uk/guidance/penetration-testing"],
  [
    "CIS Controls v8.1, control 7 (gestión continua de vulnerabilidades) y control 18 (pruebas de penetración)",
    "https://www.cisecurity.org/controls/penetration-testing",
  ],
  [
    "PCI Security Standards Council, PCI DSS v4.0.1, requisitos 11.3 y 11.4",
    "https://www.pcisecuritystandards.org/document_library/",
  ],
];

export const owaspFaqs: Faq[] = [
  [
    "¿Qué es el OWASP Top 10?",
    "Es la lista de referencia de la OWASP Foundation con las diez categorías de riesgo más críticas en aplicaciones web, elaborada a partir de datos reales y de una encuesta a la comunidad. Sirve como idioma común para priorizar qué revisar y qué exigir a desarrolladores y proveedores.",
  ],
  [
    "¿Cuál es la versión vigente del OWASP Top 10?",
    "Al 31 de octubre de 2026, la edición vigente es la de 2025. Respecto de 2021, incorpora las fallas en la cadena de suministro de software y el manejo inadecuado de condiciones excepcionales, e integra la falsificación de solicitudes del lado del servidor (SSRF) en el control de acceso.",
  ],
  [
    "¿El OWASP Top 10 es obligatorio?",
    "No. Es un documento de concienciación, no una norma ni una certificación. Muchas empresas lo usan como referencia en requisitos de desarrollo y en contratos con proveedores. Para verificar requisitos de seguridad de forma sistemática, OWASP recomienda su estándar ASVS.",
  ],
  [
    "¿Cómo usa el OWASP Top 10 una empresa que no desarrolla software?",
    "Como lista de lo que debe exigir y revisar: pedir a los proveedores que sus aplicaciones se prueben frente a estas categorías, evaluar periódicamente las aplicaciones que la empresa tiene expuestas y dar seguimiento a la corrección de lo que se encuentre.",
  ],
  [
    "¿Una evaluación automatizada cubre todo el OWASP Top 10?",
    "No. Las pruebas automatizadas detectan bien muchas fallas de configuración, inyección o componentes con vulnerabilidades conocidas. Categorías como el diseño inseguro o las fallas en el registro, alerta y monitoreo requieren revisión humana del diseño, del código y de los procesos.",
  ],
];

export const owaspSources: Source[] = [
  ["OWASP Foundation, OWASP Top 10:2025", "https://top10.owasp.org/2025/"],
  [
    "OWASP Foundation, Introducción al Top 10:2025 (cambios y datos de la edición)",
    "https://top10.owasp.org/2025/0x00_2025-Introduction/",
  ],
  [
    "OWASP Foundation, OWASP Top 10:2025 en español (nombres de las categorías)",
    "https://top10.owasp.org/2025/es/",
  ],
  ["OWASP Foundation, página del proyecto Top 10 (edición vigente)", "https://owasp.org/www-project-top-ten/"],
  [
    "OWASP Foundation, Application Security Verification Standard (ASVS 5.0.0)",
    "https://owasp.org/www-project-application-security-verification-standard/",
  ],
];
