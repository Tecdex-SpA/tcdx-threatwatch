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

// Flag de un solo uso (sessionStorage) que marca un envío en curso. Garantiza que
// generate_lead se dispare una sola vez: lo consume la página del formulario al recibir
// la confirmación o, como respaldo, /gracias/ si carga como ventana principal con el flag.
const PENDING_KEY = "vulnera-lead-pending";
const PENDING_TTL_MS = 30 * 60 * 1000;

export function setPendingLead(need: string): void {
  try {
    window.sessionStorage.setItem(PENDING_KEY, JSON.stringify({ need, at: Date.now() }));
  } catch {
    // Sin almacenamiento: solo funciona la confirmación vía iframe.
  }
}

/** Devuelve y borra el envío pendiente (null si no hay o caducó). */
export function takePendingLead(): { need: string } | null {
  try {
    const raw = window.sessionStorage.getItem(PENDING_KEY);
    window.sessionStorage.removeItem(PENDING_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as { need?: string; at?: number };
    if (typeof data.at !== "number" || Date.now() - data.at > PENDING_TTL_MS) return null;
    return { need: data.need || "sin_especificar" };
  } catch {
    return null;
  }
}
