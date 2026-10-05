"use client";

import { useEffect } from "react";
import { trackLead } from "../../lib/analytics";
import { isEmbedded, LEAD_OK_MESSAGE, takePendingLead } from "../../lib/lead";

// En /gracias/:
// - Dentro del iframe oculto del formulario (Zoho redirige ahí al aceptar el lead): avisa
//   a la página padre. No toca el flag ni dispara eventos.
// - Como ventana principal: respaldo. Solo si existe el flag de envío (sessionStorage)
//   dispara generate_lead una vez y lo borra; sin flag (recarga, visita directa o envío
//   sin JS) no dispara nada.
export function LeadFrameNotifier() {
  useEffect(() => {
    if (isEmbedded()) {
      window.parent.postMessage({ type: LEAD_OK_MESSAGE }, window.location.origin);
      return;
    }
    const pending = takePendingLead();
    if (pending) void trackLead(pending.need, 5000);
  }, []);
  return null;
}
