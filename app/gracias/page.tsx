import type { Metadata } from "next";
import { whatsappUrl } from "../../lib/site";
import { LeadFrameNotifier } from "../components/LeadFrameNotifier";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

// Página de confirmación del formulario de demo (doc 50 §5, P0-10). Sin indexar, fuera
// del sitemap y de llms.txt. No dispara eventos de GA4.

export const metadata: Metadata = {
  title: { absolute: "Gracias | VULNERA" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  alternates: { canonical: "/gracias/" },
};

export default function GraciasPage() {
  return (
    <main id="inicio">
      <LeadFrameNotifier />
      <SiteHeader />
      <section className="page-hero thanks-hero" data-location="gracias">
        <div className="container">
          <h1>Gracias.</h1>
          <p className="answer-block">Recibimos tu solicitud y te contactaremos para coordinar la demo.</p>
          <div className="hero-actions">
            <a className="button primary" href="/">Volver al inicio</a>
            <a className="button ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
