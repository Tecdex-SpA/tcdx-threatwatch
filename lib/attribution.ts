// Atribución de origen de cada lead (P0-11, doc 53). Se captura al cargar cualquier
// página y se envía a Zoho CRM en los 14 campos ocultos del formulario.
//
// - Último clic: la visita actual, en sessionStorage. Solo se recalcula al entrar al sitio
//   (no hay toque en la sesión) o si llega una URL con UTM nuevos.
// - Primer clic: la primera visita registrada, en localStorage (90 días, no se sobrescribe)
//   y solo con consentimiento de analítica. Sin consentimiento = último clic.
// - Landing: solo la ruta + parámetros utm_*. Referrer: solo el dominio.

export type Touch = {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
  landing: string;
  referrer: string;
  gclid: string;
};

const LAST_KEY = "vulnera-attr-last";
const SESSION_FIRST_KEY = "vulnera-attr-session-first";
const FIRST_KEY = "vulnera-attr-first";
const FIRST_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_LENGTH = 255;
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/** Nombres de campo en Zoho (GA Connector), doc 53 §2. */
export const attributionFields = {
  first: { source: "LEADCF13", medium: "LEADCF14", campaign: "LEADCF17", landing: "LEADCF19", referrer: "LEADCF15" },
  last: {
    source: "LEADCF5",
    medium: "LEADCF6",
    campaign: "LEADCF9",
    term: "LEADCF8",
    content: "LEADCF10",
    landing: "LEADCF11",
    referrer: "LEADCF7",
  },
  gaClientId: "LEADCF20",
  gclid: "LEADCF31",
} as const;

const EMAIL_LIKE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_LIKE = /^\+?[\d\s().-]{7,}$/;

/** Recorta a 255 caracteres y descarta valores que parezcan correo o teléfono. */
export function clean(value: string | null | undefined): string {
  const text = (value ?? "").trim();
  if (!text || EMAIL_LIKE.test(text) || PHONE_LIKE.test(text)) return "";
  return text.slice(0, MAX_LENGTH);
}

type Rule = { test: (host: string) => boolean; source: string | ((host: string) => string); medium: string };

const is = (...domains: string[]) => (host: string) =>
  domains.some((domain) => host === domain || host.endsWith(`.${domain}`));
const isGoogleSearch = (host: string) => /(^|\.)google\.[a-z.]+$/.test(host) && !host.startsWith("gemini.");
const isYahoo = (host: string) => /(^|\.)yahoo\.[a-z.]+$/.test(host);

// Orden importante: los asistentes de IA van antes que los buscadores (gemini.google.com).
const rules: Rule[] = [
  { test: is("chatgpt.com", "chat.openai.com"), source: "chatgpt", medium: "ai-referral" },
  { test: is("perplexity.ai"), source: "perplexity", medium: "ai-referral" },
  { test: is("gemini.google.com"), source: "gemini", medium: "ai-referral" },
  { test: is("copilot.microsoft.com"), source: "copilot", medium: "ai-referral" },
  { test: is("claude.ai"), source: "claude", medium: "ai-referral" },
  { test: isGoogleSearch, source: "google", medium: "organic" },
  { test: is("bing.com"), source: "bing", medium: "organic" },
  { test: is("duckduckgo.com"), source: "duckduckgo", medium: "organic" },
  { test: isYahoo, source: "yahoo", medium: "organic" },
  { test: is("ecosia.org"), source: "ecosia", medium: "organic" },
  { test: is("linkedin.com", "lnkd.in"), source: "linkedin", medium: "social" },
  { test: is("facebook.com", "fb.com"), source: "facebook", medium: "social" },
  { test: is("instagram.com"), source: "instagram", medium: "social" },
  { test: is("t.co", "x.com", "twitter.com"), source: "x", medium: "social" },
  {
    test: (host) => ["tecdex.net", "www.tecdex.net", "isos.tecdex.net", "store.tecdex.net"].includes(host),
    source: (host) => host.replace(/^www\./, ""),
    medium: "internal-referral",
  },
];

function referrerHost(referrer: string): string {
  try {
    return referrer ? new URL(referrer).hostname.toLowerCase() : "";
  } catch {
    return "";
  }
}

/** Clasifica una visita a partir de la URL de entrada y el referrer (doc 53 §3). */
export function classify(href: string, referrer: string, ownHost: string): Touch {
  const url = new URL(href);
  const params = url.searchParams;
  const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, clean(params.get(key))])) as Record<
    (typeof UTM_KEYS)[number],
    string
  >;

  const landingParams = new URLSearchParams();
  UTM_KEYS.forEach((key) => {
    if (utm[key]) landingParams.set(key, utm[key]);
  });
  const query = landingParams.toString();
  const landing = clean(`${url.pathname}${query ? `?${query}` : ""}`);

  let host = referrerHost(referrer);
  if (host === ownHost) host = ""; // Navegación interna o recarga: no es una fuente.
  const gclid = clean(params.get("gclid"));

  const touch: Touch = {
    source: "(direct)",
    medium: "(none)",
    campaign: "",
    term: "",
    content: "",
    landing,
    referrer: clean(host),
    gclid,
  };

  if (utm.utm_source) {
    return {
      ...touch,
      source: utm.utm_source,
      medium: utm.utm_medium,
      campaign: utm.utm_campaign,
      term: utm.utm_term,
      content: utm.utm_content,
    };
  }
  if (gclid) return { ...touch, source: "google", medium: "cpc" };
  if (!host) return touch;

  const rule = rules.find((candidate) => candidate.test(host));
  if (rule) {
    const source = typeof rule.source === "function" ? rule.source(host) : rule.source;
    return { ...touch, source: clean(source), medium: rule.medium };
  }
  return { ...touch, source: clean(host), medium: "referral" };
}

function readJson<T>(storage: Storage, key: string): T | null {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(storage: Storage, key: string, value: unknown): void {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento: la atribución de esta visita se pierde, el formulario sigue igual.
  }
}

function currentReferrer(): string {
  // Solo en desarrollo: permite simular el referrer en las pruebas (?__test_referrer=...).
  // En el build de producción este bloque se elimina.
  if (process.env.NODE_ENV !== "production") {
    const simulated = new URLSearchParams(window.location.search).get("__test_referrer");
    if (simulated !== null) return simulated;
  }
  return document.referrer;
}

/** Se llama al cargar cualquier página (fuera de iframes). */
export function captureAttribution(consentGranted: boolean): void {
  let session: Storage;
  try {
    session = window.sessionStorage;
  } catch {
    return;
  }
  const hasUtm = UTM_KEYS.some((key) => new URLSearchParams(window.location.search).get(key));
  const existing = readJson<Touch>(session, LAST_KEY);
  if (!existing || hasUtm) {
    const touch = classify(window.location.href, currentReferrer(), window.location.hostname.toLowerCase());
    writeJson(session, LAST_KEY, touch);
    if (!readJson<Touch>(session, SESSION_FIRST_KEY)) writeJson(session, SESSION_FIRST_KEY, touch);
  }
  if (consentGranted) persistFirstClick();
}

/** Con consentimiento: guarda el primer clic (el primero de esta sesión) si no hay uno vigente. */
export function persistFirstClick(): void {
  try {
    const stored = readJson<{ touch: Touch; at: number }>(window.localStorage, FIRST_KEY);
    if (stored && Date.now() - stored.at < FIRST_TTL_MS) return;
    const sessionFirst = readJson<Touch>(window.sessionStorage, SESSION_FIRST_KEY);
    if (sessionFirst) writeJson(window.localStorage, FIRST_KEY, { touch: sessionFirst, at: Date.now() });
  } catch {
    // Sin almacenamiento.
  }
}

/** Al rechazar el consentimiento se borra el primer clic persistente. */
export function forgetFirstClick(): void {
  try {
    window.localStorage.removeItem(FIRST_KEY);
  } catch {
    // Sin almacenamiento.
  }
}

/** Primer y último clic para el envío. Sin consentimiento, primer clic = último clic. */
export function getAttribution(consentGranted: boolean): { first: Touch; last: Touch } | null {
  try {
    const last = readJson<Touch>(window.sessionStorage, LAST_KEY);
    if (!last) return null;
    if (!consentGranted) return { first: last, last };
    const stored = readJson<{ touch: Touch; at: number }>(window.localStorage, FIRST_KEY);
    const first = stored && Date.now() - stored.at < FIRST_TTL_MS ? stored.touch : last;
    return { first, last };
  } catch {
    return null;
  }
}
