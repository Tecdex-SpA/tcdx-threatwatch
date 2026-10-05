import { contact, integrations, organization, siteConfig, whatsappUrl } from "../../lib/site";
import { CookiePreferencesButton } from "./ConsentBanner";

// Cabecera, pie (con «Uso responsable», obligatorio en todas las páginas) y botón
// flotante de WhatsApp, compartidos por la home y las subpáginas. Los enlaces son
// absolutos (/#ancla) para que funcionen desde cualquier ruta.

export function TecdexLogo({ className = "" }: { className?: string }) {
  return (
    <img
      className={className}
      src="https://tecdex.net/wp-content/uploads/2019/08/logo-luz.svg"
      alt="TECDEX"
      width="300"
      height="79"
    />
  );
}

const navLinks = [
  ["/#solucion", "Solución"],
  ["/#como-funciona", "Cómo funciona"],
  ["/#para-quien", "Para quién"],
  ["/#preguntas", "Preguntas"],
];

export function SiteHeader() {
  return (
    <header className="site-header" data-location="nav">
      <div className="container header-main">
        <a className="brand" href="/" aria-label="VULNERA, volver al inicio">
          <TecdexLogo className="header-logo" />
          <span className="brand-divider" />
          <span className="product-name">VULNERA</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          <a className="nav-button" href="/#demo" data-cta="demo">Solicitar demo</a>
        </nav>

        <details className="mobile-nav">
          <summary aria-label="Abrir menú"><span /><span /><span /></summary>
          <nav aria-label="Navegación móvil">
            {navLinks.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            <a href="/#demo" data-cta="demo">Solicitar demo</a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <section className="responsible-use">
        <div className="container responsible-use__inner">
          <strong>Uso responsable</strong>
          <p>
            VULNERA no garantiza la ausencia total de vulnerabilidades ni reemplaza una
            evaluación humana. Los resultados requieren revisión técnica y solo deben obtenerse
            sobre activos propios o autorizados.
          </p>
        </div>
      </section>

      <footer className="footer" data-location="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <TecdexLogo className="footer-logo" />
            <p>VULNERA</p>
            <span>{siteConfig.tagline}</span>
          </div>
          <div>
            <h3>Producto</h3>
            <a href="/#solucion">Solución</a>
            <a href="/#como-funciona">Cómo funciona</a>
            <a href="/#estado">Estado del producto</a>
            <a href="/#demo" data-cta="demo">Solicitar demo</a>
          </div>
          <div>
            <h3>TECDEX</h3>
            <a href="https://tecdex.net/quienes-somos/" target="_blank" rel="noopener">Quiénes somos</a>
            <a href="https://tecdex.net/soluciones-de-seguridad-informatica-para-empresas/" target="_blank" rel="noopener">Seguridad informática</a>
            <a href={organization.privacyUrl} target="_blank" rel="noopener">Políticas de privacidad</a>
            {integrations.ga4Id ? <CookiePreferencesButton /> : null}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} TECDEX SpA · {contact.addressLines.join(", ")} ·{" "}
            <a href={`tel:${contact.phone}`}>{contact.phoneLabel}</a> ·{" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp {contact.whatsappLabel}</a>
          </span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}

function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      data-location="float"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="32" height="32" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.485.71 4.807 1.94 6.77L3 29l6.9-2.4a12.44 12.44 0 0 0 6.101 1.6h.004c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3zm0 22.7h-.003a10.16 10.16 0 0 1-5.176-1.418l-.371-.22-4.096 1.424 1.44-3.99-.242-.41A10.18 10.18 0 0 1 5.8 15.5c0-5.63 4.573-10.2 10.204-10.2 2.726 0 5.288 1.062 7.216 2.992a10.13 10.13 0 0 1 2.984 7.211c0 5.63-4.573 10.197-10.203 10.197zm5.593-7.643c-.306-.153-1.813-.895-2.094-.997-.281-.102-.486-.153-.69.154-.204.306-.792.996-.971 1.2-.179.204-.357.23-.663.077-.306-.153-1.293-.477-2.463-1.52-.91-.812-1.525-1.815-1.704-2.121-.179-.306-.019-.472.134-.624.137-.137.306-.357.46-.536.153-.179.204-.306.306-.51.102-.204.05-.383-.026-.536-.077-.153-.69-1.663-.945-2.278-.249-.599-.502-.518-.69-.527-.179-.008-.383-.01-.588-.01-.204 0-.536.077-.817.383-.281.306-1.073 1.049-1.073 2.559s1.098 2.968 1.25 3.173c.153.204 2.16 3.298 5.234 4.624.731.316 1.301.505 1.745.646.733.233 1.4.2 1.927.121.588-.088 1.813-.741 2.069-1.457.255-.715.255-1.328.179-1.457-.077-.128-.281-.204-.588-.357z" />
      </svg>
    </a>
  );
}
