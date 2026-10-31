import type { Metadata } from "next";
import { structuredData } from "../../lib/structured-data";
import { JsonLd } from "../components/JsonLd";
import { articleMetadata } from "../../lib/seo";
import { guides } from "../../lib/site";
import { guideDates, owaspFaqs, owaspSources } from "../../lib/guides";
import { ContentTable, DemoCta, GuideByline, GuideFaq, PageHero } from "../components/ContentPage";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

// Copy literal del doc 57 §2 (tanda P1-9, doc 58). Claude Code maqueta, no reescribe.

const page = guides.owaspTop10;

export const metadata: Metadata = articleMetadata(page, {
  published: guideDates.published.iso,
  modified: guideDates.revised.iso,
});

const categoryTable = [
  ["A01", "Pérdida de control de acceso", "Un usuario ve o hace algo que no le corresponde", "Pruebas automatizadas y revisión manual por rol"],
  ["A02", "Configuración de seguridad incorrecta", "Ajustes por defecto, servicios de más o permisos amplios", "Pruebas automatizadas y revisión de configuración"],
  ["A03", "Fallas en la cadena de suministro de software", "El riesgo llega por un componente o proveedor de terceros", "Inventario de componentes y seguimiento de vulnerabilidades conocidas"],
  ["A04", "Fallas criptográficas", "Datos sensibles sin cifrar o con cifrado débil", "Pruebas automatizadas y revisión de cómo se guardan los datos"],
  ["A05", "Inyección", "El sistema ejecuta como instrucción algo que era un dato", "Pruebas automatizadas y revisión de código"],
  ["A06", "Diseño inseguro", "La falla está en cómo se pensó el flujo, no en cómo se programó", "Revisión de diseño y modelado de amenazas"],
  ["A07", "Fallas de autenticación", "Es fácil hacerse pasar por otro usuario", "Pruebas automatizadas y revisión manual de flujos"],
  ["A08", "Fallas en la integridad del software o de los datos", "Se confía en código o datos sin verificar que no fueron alterados", "Revisión del proceso de desarrollo y despliegue"],
  ["A09", "Fallas en el registro, alerta y monitoreo de seguridad", "Un ataque ocurre y nadie se entera", "Revisión de registros y ejercicios de detección"],
  ["A10", "Manejo inadecuado de condiciones excepcionales", "Un error inesperado deja el sistema en un estado inseguro", "Revisión de código y pruebas de casos límite"],
];

const categories = [
  {
    heading: "A01 · Pérdida de control de acceso",
    que: "también conocida como «control de acceso roto», ocurre cuando el sistema no impide que un usuario vea o haga algo fuera de sus permisos. Desde 2025 incluye los casos en que se induce al servidor a consultar destinos internos no autorizados (SSRF).",
    ejemplo: "un cliente cambia el número de su factura en la dirección web y ve la factura de otro cliente.",
    impacto: "filtración de datos de clientes y acciones no autorizadas.",
    prevencion: "negar por defecto, verificar permisos en el servidor en cada solicitud y probar cada rol.",
  },
  {
    heading: "A02 · Configuración de seguridad incorrecta",
    que: "ajustes por defecto, servicios innecesarios, mensajes de error detallados o permisos demasiado amplios.",
    ejemplo: "un panel de administración accesible desde internet con la configuración de fábrica.",
    impacto: "acceso no autorizado y exposición de información interna.",
    prevencion: "una configuración base endurecida y repetible, eliminar lo que no se usa y revisar después de cada cambio.",
  },
  {
    heading: "A03 · Fallas en la cadena de suministro de software",
    que: "riesgos que llegan a través de librerías, dependencias, herramientas o procesos de construcción y actualización de terceros.",
    ejemplo: "una librería muy usada publica una vulnerabilidad crítica, o la actualización de un proveedor llega comprometida.",
    impacto: "robo de datos o credenciales y compromisos masivos, porque el componente corre con los mismos permisos que la aplicación.",
    prevencion: "inventario de componentes (SBOM), fuentes oficiales, actualizaciones oportunas y probadas, y acceso controlado al proceso de despliegue.",
  },
  {
    heading: "A04 · Fallas criptográficas",
    que: "datos sensibles que viajan o se guardan sin cifrar, o con métodos débiles u obsoletos.",
    ejemplo: "contraseñas guardadas con un método de cifrado ya superado.",
    impacto: "exposición de datos personales o financieros, con costos legales y reputacionales.",
    prevencion: "clasificar los datos, cifrar con algoritmos vigentes, gestionar bien las claves y no guardar lo que no se necesita.",
  },
  {
    heading: "A05 · Inyección",
    que: "la aplicación trata datos ingresados por un usuario como si fueran instrucciones para la base de datos, el sistema o el navegador.",
    ejemplo: "un campo de búsqueda que, ante una entrada maliciosa, termina modificando la consulta a la base de datos.",
    impacto: "lectura, alteración o borrado de datos y robo de sesiones.",
    prevencion: "consultas parametrizadas, validación de entradas y frameworks que separan datos de instrucciones.",
  },
  {
    heading: "A06 · Diseño inseguro",
    que: "fallas en la lógica o en el flujo del sistema. OWASP advierte que un diseño inseguro no se corrige con una implementación perfecta.",
    ejemplo: "una recuperación de contraseña basada en preguntas cuyas respuestas son fáciles de averiguar.",
    impacto: "abuso de funciones legítimas y fraude.",
    prevencion: "modelado de amenazas al diseñar, requisitos de seguridad desde el inicio y revisión de los flujos críticos.",
  },
  {
    heading: "A07 · Fallas de autenticación",
    que: "debilidades en cómo se verifica la identidad y se manejan las sesiones.",
    ejemplo: "un inicio de sesión sin límite de intentos o sesiones que nunca expiran.",
    impacto: "toma de cuentas de clientes o de administradores.",
    prevencion: "doble factor de autenticación, límites de intentos, contraseñas revisadas contra listas de filtradas y sesiones que expiran.",
  },
  {
    heading: "A08 · Fallas en la integridad del software o de los datos",
    que: "confiar en código, actualizaciones o datos sin comprobar que no fueron alterados.",
    ejemplo: "una aplicación que instala actualizaciones sin verificar su firma.",
    impacto: "ejecución de código no autorizado y manipulación de datos.",
    prevencion: "firmas digitales, verificación de integridad y control de cambios en el proceso de despliegue.",
  },
  {
    heading: "A09 · Fallas en el registro, alerta y monitoreo de seguridad",
    que: "no registrar los eventos relevantes o no generar alertas cuando algo anómalo ocurre. OWASP reconoce que es una categoría muy difícil de probar.",
    ejemplo: "cientos de intentos fallidos de acceso que nadie revisa.",
    impacto: "brechas que se detectan tarde; según OWASP, pueden pasar años sin ser descubiertas.",
    prevencion: "registrar los eventos de seguridad con contexto, proteger los registros y definir alertas con un procedimiento de respuesta.",
  },
  {
    heading: "A10 · Manejo inadecuado de condiciones excepcionales",
    que: "cómo responde el sistema ante errores y situaciones inesperadas, incluido el caso en que «falla abierto» en vez de fallar de forma segura.",
    ejemplo: "un error a mitad de un pago deja la transacción incompleta o inconsistente.",
    impacto: "indisponibilidad, datos inconsistentes y fraude.",
    prevencion: "manejar cada error donde ocurre, revertir transacciones completas y fallar de forma segura.",
  },
];

const usageTable = [
  [
    "1. Priorizar",
    "Inventariar las aplicaciones y APIs expuestas y ordenarlas por los datos que manejan y su importancia para el negocio",
    "Una lista de qué evaluar primero",
  ],
  [
    "2. Evaluar periódicamente",
    "Combinar evaluaciones automatizadas recurrentes con revisión manual en lo crítico, y exigir el Top 10 en los requisitos a desarrolladores y proveedores",
    "Hallazgos clasificados por categoría",
  ],
  [
    "3. Seguir la corrección",
    "Asignar a cada hallazgo prioridad, responsable y plazo, y volver a probar antes de darlo por cerrado",
    "Hallazgos cerrados con evidencia",
  ],
  [
    "4. Aprender",
    "Revisar en qué categorías se repiten los hallazgos y corregir la causa: capacitación, diseño o proceso",
    "Menos hallazgos repetidos",
  ],
];

export default function OwaspTopTenPage() {
  return (
    <main id="inicio">
      <JsonLd data={structuredData.owaspTop10} />
      <SiteHeader />
      <PageHero
        page={page}
        title="OWASP Top 10 explicado para empresas"
        answer="El OWASP Top 10 es la lista de referencia, publicada por la OWASP Foundation, con las diez categorías de riesgo más críticas en aplicaciones web. La edición vigente es la de 2025. No es una norma ni una certificación: es un punto de partida para decidir qué revisar primero, cómo prevenirlo y qué exigir a quienes desarrollan tus sistemas."
      />

      <section className="prose-section">
        <div className="container">
          <article className="prose">
            <h2>¿Qué es OWASP y qué es el Top 10?</h2>
            <p>
              OWASP (Open Worldwide Application Security Project) es una fundación sin fines de lucro
              que produce guías, estándares y herramientas abiertas para mejorar la seguridad del
              software. Su proyecto más conocido es el Top 10: un documento de concienciación que
              agrupa las debilidades más frecuentes y de mayor impacto en aplicaciones web en diez
              categorías, ordenadas a partir de datos reales y de una encuesta a la comunidad.
            </p>
            <p>
              Para una empresa, el Top 10 funciona como un idioma común. Permite que gerencia, el
              equipo de TI, los desarrolladores y los proveedores hablen de los mismos riesgos con los
              mismos nombres.
            </p>

            <h2>¿Qué cambió en la edición 2025?</h2>
            <p>
              La edición 2025 se construyó con datos de más de 2,8 millones de aplicaciones y analizó
              589 tipos de debilidades (CWE). Respecto de la edición 2021:
            </p>
            <ul>
              <li>
                <strong>Dos categorías nuevas:</strong> fallas en la cadena de suministro de software
                (A03), que amplía la antigua categoría de componentes vulnerables, y manejo
                inadecuado de condiciones excepcionales (A10).
              </li>
              <li>
                <strong>Una fusión:</strong> la falsificación de solicitudes del lado del servidor
                (SSRF) pasa a formar parte del control de acceso (A01).
              </li>
              <li>
                <strong>Cambios de posición:</strong> la configuración incorrecta de seguridad sube
                del quinto al segundo lugar.
              </li>
            </ul>

            <h2>¿Cuáles son las 10 categorías del OWASP Top 10 2025?</h2>
            <ContentTable
              head={["Código", "Categoría", "En una frase", "Dónde suele detectarse"]}
              rows={categoryTable}
            />
            <p className="table-note">
              Los nombres en español siguen la versión en español del sitio de OWASP; el nombre
              original de cada categoría está en inglés. La columna «Dónde suele detectarse» es una
              orientación de TECDEX, no parte del documento de OWASP.
            </p>

            <h2>¿Qué significa cada categoría para tu empresa?</h2>
            {categories.map((category) => (
              <div key={category.heading} className="owasp-category">
                <h3>{category.heading}</h3>
                <ul>
                  <li>
                    <strong>Qué es:</strong> {category.que}
                  </li>
                  <li>
                    <strong>Ejemplo:</strong> {category.ejemplo}
                  </li>
                  <li>
                    <strong>Impacto:</strong> {category.impacto}
                  </li>
                  <li>
                    <strong>Cómo se previene:</strong> {category.prevencion}
                  </li>
                </ul>
              </div>
            ))}

            <h2>¿Cómo usar el OWASP Top 10 en la empresa?</h2>
            <p>El Top 10 sirve cuando se convierte en un proceso, no cuando se cita en una presentación.</p>
            <ContentTable head={["Paso", "Qué hacer", "Resultado"]} rows={usageTable} />
            <p>
              El ciclo completo está explicado en la guía de{" "}
              <a href="/gestion-de-vulnerabilidades/">gestión de vulnerabilidades</a>, y la diferencia
              entre evaluar de forma automatizada y manual, en la de{" "}
              <a href="/pentesting-automatizado/">pentesting automatizado</a>.
            </p>

            <h2>¿Qué no es el OWASP Top 10?</h2>
            <ul>
              <li>
                <strong>No es una norma ni una certificación.</strong> Nadie «cumple» el Top 10. Para
                verificar requisitos de seguridad de forma sistemática, OWASP recomienda su estándar
                ASVS, cuya versión estable vigente es la 5.0.0.
              </li>
              <li>
                <strong>No es una lista completa.</strong> Cubre las categorías más críticas, no todas
                las debilidades posibles.
              </li>
              <li>
                <strong>No sustituye a un sistema de gestión.</strong> Si tu empresa responde a ISO
                27001 o a la Ley 21.663, esos requisitos se trabajan en{" "}
                <a href="https://isos.tecdex.net/" target="_blank" rel="noopener">TECDEX Compliance</a>.
              </li>
            </ul>

            <h2>Cómo lo aborda VULNERA</h2>
            <p>
              VULNERA ayuda a detectar y gestionar vulnerabilidades web del tipo que describe el OWASP
              Top 10 en aplicaciones y APIs propias o autorizadas. Automatiza el reconocimiento, el
              descubrimiento y la detección, y convierte cada hallazgo en una decisión priorizada, con
              evidencia, recomendación y responsable.
            </p>
            <p>
              No cubre todas las categorías del Top 10: las de diseño, lógica y procesos internos,
              como el diseño inseguro o las fallas en el registro, alerta y monitoreo, requieren
              revisión humana. Ninguna evaluación parte sin un alcance definido y una aprobación
              explícita.
            </p>
            <p className="inline-links">
              <a href="/como-funciona/">Mira cómo funciona, paso a paso</a>
              {" · "}
              <a href="/">Conoce VULNERA</a>
              {" · "}
              <a href="/#demo" data-cta="demo">Agenda tu demo</a>
            </p>

            <GuideFaq items={owaspFaqs} />

            <p className="inline-links keep-reading">
              <strong>Sigue leyendo:</strong>{" "}
              <a href="/gestion-de-vulnerabilidades/">
                Gestión de vulnerabilidades: del hallazgo a la remediación comprobada
              </a>
              {" · "}
              <a href="/pentesting-automatizado/">
                Pentesting automatizado: qué es y en qué se diferencia del pentest manual
              </a>
              {" · "}
              <a href="/preguntas-frecuentes/">Preguntas frecuentes sobre VULNERA</a>
            </p>
          </article>
        </div>
      </section>

      <section className="related-section">
        <div className="container">
          <GuideByline
            published={guideDates.published}
            revised={guideDates.revised}
            sources={owaspSources}
          />
        </div>
      </section>

      <DemoCta location="owasp-top-10" />
      <SiteFooter />
    </main>
  );
}
