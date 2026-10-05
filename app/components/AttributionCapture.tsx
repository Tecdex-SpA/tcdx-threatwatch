"use client";

import { useEffect } from "react";
import { captureAttribution, forgetFirstClick, persistFirstClick } from "../../lib/attribution";
import { CONSENT_CHANGE_EVENT, readConsent, type ConsentState } from "../../lib/consent";
import { isEmbedded } from "../../lib/lead";

// Captura la atribución de origen al cargar cualquier página (P0-11). Dentro del iframe
// del formulario no hace nada. Si se acepta el consentimiento después, persiste en ese
// momento el primer clic de la sesión; si se rechaza, lo borra.
export function AttributionCapture() {
  useEffect(() => {
    if (isEmbedded()) return;
    captureAttribution(readConsent() === "granted");
    const onConsent = (event: Event) => {
      const state = (event as CustomEvent<ConsentState>).detail;
      if (state === "granted") persistFirstClick();
      else forgetFirstClick();
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsent);
  }, []);
  return null;
}
