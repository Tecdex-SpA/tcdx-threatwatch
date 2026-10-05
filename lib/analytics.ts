// Eventos de conversión (P0-5, doc 47). Sin consentimiento gtag no existe y
// track() no envía nada; no hay cola previa al consentimiento.

/** Valores de `location`: dónde ocurrió la interacción (atributo data-location). */
export type TrackLocation =
  | "hero"
  | "nav"
  | "demo"
  | "footer"
  | "float"
  | "acceso-anticipado"
  | "gracias"
  // CTA de demo de cada página de contenido (P1-3)
  | "como-funciona"
  | "gestion-de-vulnerabilidades"
  | "preguntas-frecuentes";

export type ConversionEvent =
  | "cta_demo_click"
  | "click_whatsapp"
  | "click_email"
  | "click_phone"
  | "generate_lead";

type Gtag = (...args: unknown[]) => void;

function getGtag(): Gtag | undefined {
  return (window as unknown as { gtag?: Gtag }).gtag;
}

export function track(event: ConversionEvent, params: Record<string, string>): void {
  getGtag()?.("event", event, params);
}

/**
 * generate_lead (P0-10): solo cuando Zoho aceptó el lead. Espera a que gtag esté
 * disponible (hasta `waitMs`) y resuelve cuando GA4 confirma el envío o a los 1,2 s,
 * para poder navegar después sin perder el evento.
 */
export async function trackLead(need: string, waitMs = 0): Promise<void> {
  const start = Date.now();
  while (!getGtag() && Date.now() - start < waitMs) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const gtag = getGtag();
  if (!gtag) return;
  await new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, 1200);
    gtag("event", "generate_lead", {
      location: "demo",
      need,
      event_callback: () => {
        clearTimeout(timer);
        resolve();
      },
    });
  });
}

/**
 * Escucha clics y envíos del documento y los traduce a eventos:
 * - [data-cta="demo"]          → cta_demo_click
 * - a[href^="mailto:"]         → click_email
 * - a[href^="tel:"]            → click_phone
 * - a[href*="wa.me/"]          → click_whatsapp
 * `location` se toma del ancestro más cercano con data-location.
 * generate_lead no se dispara aquí: lo dispara el formulario (trackLead) cuando Zoho
 * confirma el lead (P0-10).
 */
export function listenConversions(): () => void {
  const locationOf = (element: Element) =>
    element.closest<HTMLElement>("[data-location]")?.dataset.location ?? "other";

  const onClick = (event: MouseEvent) => {
    const element = (event.target as Element | null)?.closest<HTMLElement>("a[href], [data-cta]");
    if (!element) return;
    const location = locationOf(element);
    const href = element.getAttribute("href") ?? "";
    if (element.dataset.cta === "demo") track("cta_demo_click", { location });
    else if (href.startsWith("mailto:")) track("click_email", { location });
    else if (href.startsWith("tel:")) track("click_phone", { location });
    else if (href.includes("wa.me/")) track("click_whatsapp", { location });
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}
