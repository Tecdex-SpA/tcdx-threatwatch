// Eventos de conversión (P0-5, doc 47). Sin consentimiento gtag no existe y
// track() no envía nada; no hay cola previa al consentimiento.

/** Valores de `location`: dónde ocurrió la interacción (atributo data-location). */
export type TrackLocation =
  | "hero"
  | "nav"
  | "demo"
  | "footer"
  | "float"
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

export function track(event: ConversionEvent, params: Record<string, string>): void {
  const { gtag } = window as unknown as { gtag?: (...args: unknown[]) => void };
  gtag?.("event", event, params);
}

/**
 * Escucha clics y envíos del documento y los traduce a eventos:
 * - [data-cta="demo"]          → cta_demo_click
 * - a[href^="mailto:"]         → click_email
 * - a[href^="tel:"]            → click_phone
 * - a[href*="wa.me/"]          → click_whatsapp
 * - form[data-lead-form] submit → generate_lead (con `need` = ¿Qué necesitas?)
 * `location` se toma del ancestro más cercano con data-location.
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

  const onSubmit = (event: SubmitEvent) => {
    const form = event.target as HTMLFormElement;
    if (!form.matches("[data-lead-form]")) return;
    const need = form.elements.namedItem("necesidad") as HTMLSelectElement | null;
    track("generate_lead", { location: locationOf(form), need: need?.value || "sin_especificar" });
  };

  document.addEventListener("click", onClick, true);
  document.addEventListener("submit", onSubmit, true);
  return () => {
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("submit", onSubmit, true);
  };
}
