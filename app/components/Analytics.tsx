"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, readConsent, type ConsentState } from "../../lib/consent";

// GA4 propio de VULNERA (P0-4). gtag.js solo se solicita tras aceptar cookies.
// Las cookies quedan en el host (cookie_domain "none"), separadas de las de tecdex.net.

function clearGaCookies() {
  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/`;
    });
}

export function Analytics({ gaId }: { gaId: string }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (event: Event) => setConsent((event as CustomEvent<ConsentState>).detail);
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  useEffect(() => {
    // Opt-out oficial de GA: si se revoca tras aceptar, gtag deja de enviar datos.
    (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = consent !== "granted";
    if (consent === "denied") clearGaCookies();
  }, [consent, gaId]);

  if (consent !== "granted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{cookie_domain:'none'});`}
      </Script>
    </>
  );
}
