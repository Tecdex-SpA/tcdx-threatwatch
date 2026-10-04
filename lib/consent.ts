// Consentimiento de cookies no esenciales (analítica). P0-7, doc 47.
// La decisión se guarda solo en el navegador del visitante; si el almacenamiento
// no está disponible, se pregunta en cada visita y no se carga analítica.

export type ConsentState = "granted" | "denied";

const STORAGE_KEY = "vulnera-consent-analytics";
export const CONSENT_CHANGE_EVENT = "vulnera:consent-change";
export const CONSENT_OPEN_EVENT = "vulnera:consent-open";

export function readConsent(): ConsentState | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(state: ConsentState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // Sin almacenamiento: la decisión vale solo para esta página.
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_CHANGE_EVENT, { detail: state }));
}

export function openConsentPreferences(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
