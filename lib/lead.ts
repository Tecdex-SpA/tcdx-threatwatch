// Flujo de envío del formulario de demo a Zoho CRM (P0-10).
// /gracias/ cargada dentro del iframe oculto avisa a la página padre con este mensaje.

export const LEAD_OK_MESSAGE = "vulnera-lead-ok";

/** true si la página corre dentro de un iframe (p. ej. el iframe oculto del formulario). */
export function isEmbedded(): boolean {
  try {
    return window.top !== window.self;
  } catch {
    // Acceso a window.top bloqueado: solo ocurre si el padre es de otro origen.
    return true;
  }
}
