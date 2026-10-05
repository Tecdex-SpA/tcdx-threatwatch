// Formulario web «Formulario-VULNERA» de Zoho CRM (módulo Leads), P0-10.
// Valores copiados literalmente del código fuente generado por Zoho (2026-10-05).
// Configuración en Zoho (no se cambia desde aquí): URL permitida https://vulnera.tecdex.net,
// redirección a /gracias/, etiqueta VULNERA, asignación automática, captcha estándar.

export const zohoForm = {
  action: "https://crm.zoho.com/crm/WebToLeadForm",
  method: "POST",
  /** Campos ocultos obligatorios, tal cual vienen en el código de Zoho. */
  hidden: [
    ["xnQsjsdp", "44e6d080aaecfb6f4ea071fb15be9120b8e5c5401aefe848738d3d7bc734b654"],
    ["zc_gad", ""],
    ["xmIwtLD", "e9ff7ac7647c635c17644400bf94ff45eec7a9db1fe8a0d2721e62efaf3e661401b21982fb32c27b2bb5155490e7e9cb"],
    ["actionType", "TGVhZHM="],
    ["returnURL", "https://vulnera.tecdex.net/gracias/"],
    // Selects ocultos del formulario de Zoho, enviados con su valor seleccionado.
    ["Lead Source", "Formulario Web"],
    ["Lead Status", "Nuevo"],
  ] as const,
  /** Honeypot antispam de Zoho: debe enviarse vacío. */
  honeypot: "aG9uZXlwb3Q",
  /** Nombres de los campos visibles en Zoho. */
  fields: {
    firstName: "First Name",
    lastName: "Last Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    website: "Website",
    description: "Description",
    captcha: "enterdigest",
  },
  maxLength: {
    firstName: 40,
    lastName: 80,
    company: 200,
    email: 100,
    phone: 30,
    website: 255,
    captcha: 10,
  },
  captchaImage:
    "https://crm.zoho.com/crm/CaptchaServlet?formId=e9ff7ac7647c635c17644400bf94ff45eec7a9db1fe8a0d2721e62efaf3e661401b21982fb32c27b2bb5155490e7e9cb&grpid=44e6d080aaecfb6f4ea071fb15be9120b8e5c5401aefe848738d3d7bc734b654",
} as const;

/** Igual que reloadImg() de Zoho: añade "&d<timestamp>" para forzar una imagen nueva. */
export function freshCaptchaUrl(): string {
  return `${zohoForm.captchaImage}&d${Date.now()}`;
}
