"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_OPEN_EVENT,
  openConsentPreferences,
  readConsent,
  writeConsent,
  type ConsentState,
} from "../../lib/consent";

export function ConsentBanner({ privacyUrl }: { privacyUrl: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const decide = (state: ConsentState) => {
    writeConsent(state);
    setOpen(false);
  };

  return (
    <div className="consent-banner" role="region" aria-label="Preferencias de cookies">
      <p>
        Usamos cookies de analítica (Google Analytics) solo si las aceptas, para medir el uso de
        este sitio. Más información en nuestra{" "}
        <a href={privacyUrl} target="_blank" rel="noopener">Política de privacidad</a>.
      </p>
      <div className="consent-actions">
        <button type="button" className="button ghost" onClick={() => decide("denied")}>Rechazar</button>
        <button type="button" className="button primary" onClick={() => decide("granted")}>Aceptar</button>
      </div>
    </div>
  );
}

export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      className="footer-link-button"
      onClick={openConsentPreferences}
    >
      Preferencias de cookies
    </button>
  );
}
