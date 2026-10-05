"use client";

import { useEffect } from "react";
import { isEmbedded, LEAD_OK_MESSAGE } from "../../lib/lead";

// En /gracias/: si la página se cargó dentro del iframe oculto del formulario (Zoho
// redirige ahí tras aceptar el lead), avisa a la página padre. Como página principal
// no hace nada: generate_lead lo dispara el formulario al recibir este aviso.
export function LeadFrameNotifier() {
  useEffect(() => {
    if (isEmbedded()) {
      window.parent.postMessage({ type: LEAD_OK_MESSAGE }, window.location.origin);
    }
  }, []);
  return null;
}
