"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { getGaClientId, trackLead } from "../../lib/analytics";
import { attributionFields, getAttribution } from "../../lib/attribution";
import { CONSENT_CHANGE_EVENT, readConsent } from "../../lib/consent";
import { LEAD_OK_MESSAGE, setPendingLead, takePendingLead } from "../../lib/lead";
import { freshCaptchaUrl, zohoForm } from "../../lib/zoho";

// Formulario de demo integrado con Zoho CRM (P0-10, doc 52). Marcado y estilos propios;
// de Zoho solo se usan action, nombres de campo, ocultos y captcha.
//
// Con JS el POST va a un iframe oculto y aislado (sandbox sin allow-modals ni
// allow-top-navigation): el visitante no sale del sitio y la página de error de Zoho
// (alert + history.back) no puede mostrarse ni mover la ventana principal. El iframe se
// precarga con /form-sink.html y se recrea tras cada intento sin confirmar: al quitarlo
// del DOM el navegador elimina su entrada del historial (el «Atrás» del visitante no queda
// consumido por el iframe).
// Sin JS el formulario hace un POST normal y Zoho redirige a /gracias/.

const SINK_NAME = "zoho-sink";
const SINK_SRC = "/form-sink.html";
const SOFT_ERROR_MS = 3000;
const HARD_TIMEOUT_MS = 20000;

const needOptions = [
  "Evaluar mis dominios y aplicaciones",
  "Un reporte para gerencia",
  "Preparar una auditoría",
  "Revisar un portal o API",
  "Otro",
];

type FieldKey = "firstName" | "lastName" | "company" | "email" | "authorized" | "captcha";
type Errors = Partial<Record<FieldKey, string>>;
type Status = "idle" | "sending" | "unconfirmed";

const messages = {
  required: "Completa este campo.",
  email: "Ingresa un correo válido.",
  authorized: "Confirma que los activos son propios o expresamente autorizados.",
  captcha: "Ingresa el código de verificación.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Attempt = { active: boolean; done: boolean; timers: number[] };

/** Los 14 campos ocultos de atribución (P0-11), en el orden del doc 53 §2. */
const attributionNames = [
  ...Object.values(attributionFields.first),
  ...Object.values(attributionFields.last),
  attributionFields.gaClientId,
  attributionFields.gclid,
];

/** Rellena los campos de atribución justo antes del envío (como Description). */
function fillAttribution(form: HTMLFormElement, gaClientId: string): void {
  const consent = readConsent() === "granted";
  const data = getAttribution(consent);
  const set = (name: string, value: string) => {
    const input = form.elements.namedItem(name) as HTMLInputElement | null;
    if (input) input.value = value;
  };
  const { first, last } = attributionFields;
  set(first.source, data?.first.source ?? "");
  set(first.medium, data?.first.medium ?? "");
  set(first.campaign, data?.first.campaign ?? "");
  set(first.landing, data?.first.landing ?? "");
  set(first.referrer, data?.first.referrer ?? "");
  set(last.source, data?.last.source ?? "");
  set(last.medium, data?.last.medium ?? "");
  set(last.campaign, data?.last.campaign ?? "");
  set(last.term, data?.last.term ?? "");
  set(last.content, data?.last.content ?? "");
  set(last.landing, data?.last.landing ?? "");
  set(last.referrer, data?.last.referrer ?? "");
  set(attributionFields.gaClientId, consent ? gaClientId : "");
  set(attributionFields.gclid, data?.last.gclid ?? "");
}

export function DemoForm({
  whatsappUrl,
  privacyUrl,
  gaId,
}: {
  whatsappUrl: string;
  privacyUrl: string;
  gaId?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const sinkRef = useRef<HTMLIFrameElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const sinkReady = useRef(false);
  const sinkUsed = useRef(false);
  const inFlight = useRef(false);
  const pendingSubmit = useRef(false);
  const gaClientId = useRef("");
  const attempt = useRef<Attempt>({ active: false, done: false, timers: [] });

  const [jsReady, setJsReady] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [captchaSrc, setCaptchaSrc] = useState<string>(zohoForm.captchaImage);
  const [sinkKey, setSinkKey] = useState(0);

  const reloadCaptcha = useCallback(() => {
    setCaptchaSrc(freshCaptchaUrl());
    const input = formRef.current?.elements.namedItem(zohoForm.fields.captcha) as HTMLInputElement | null;
    if (input) input.value = "";
  }, []);

  const clearTimers = () => {
    attempt.current.timers.forEach((timer) => window.clearTimeout(timer));
    attempt.current.timers = [];
  };

  const showUnconfirmed = useCallback(() => {
    if (attempt.current.done) return;
    inFlight.current = false;
    setStatus("unconfirmed");
    reloadCaptcha();
  }, [reloadCaptcha]);

  /** Recrea el iframe (limpia su historial) y cancela el intento anterior. */
  const resetSink = useCallback(() => {
    clearTimers();
    attempt.current = { active: false, done: false, timers: [] };
    sinkReady.current = false;
    sinkUsed.current = false;
    setSinkKey((key) => key + 1);
  }, []);

  // «El éxito siempre gana»: aunque ya se mostró el aviso, una confirmación dentro de
  // los 20 s lo oculta, dispara generate_lead (una sola vez, con el flag) y va a /gracias/.
  const onSuccess = useCallback(async () => {
    if (!attempt.current.active || attempt.current.done) return;
    attempt.current.done = true;
    clearTimers();
    flushSync(() => setStatus("sending")); // Oculta el aviso antes de navegar.
    const pending = takePendingLead();
    if (pending) await trackLead(pending.need);
    window.location.assign("/gracias/");
  }, []);

  const onSinkLoad = useCallback(() => {
    let path: string | null;
    try {
      path = sinkRef.current?.contentWindow?.location.pathname ?? null;
    } catch {
      path = null; // Página de otro origen: la respuesta de Zoho.
    }

    if (!attempt.current.active) {
      if (path === SINK_SRC) {
        sinkReady.current = true;
        if (pendingSubmit.current) {
          pendingSubmit.current = false;
          formRef.current?.requestSubmit();
        }
      }
      return;
    }

    if (path === "/gracias/") {
      void onSuccess();
    } else if (path === SINK_SRC) {
      // Zoho rechazó el envío y su página ejecutó history.back() dentro del iframe.
      showUnconfirmed();
    } else if (path === null) {
      // Respuesta de Zoho sin redirección a /gracias/ todavía: aviso a los 3 s.
      attempt.current.timers.push(window.setTimeout(showUnconfirmed, SOFT_ERROR_MS));
    }
  }, [onSuccess, showUnconfirmed]);

  useEffect(() => {
    setJsReady(true);
    // El iframe pudo terminar de cargar antes de la hidratación.
    try {
      const doc = sinkRef.current?.contentWindow?.document;
      if (doc?.readyState === "complete" && sinkRef.current?.contentWindow?.location.pathname === SINK_SRC) {
        sinkReady.current = true;
      }
    } catch {
      // Sin acceso: se marcará en el siguiente load.
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== sinkRef.current?.contentWindow) return;
      if ((event.data as { type?: string } | null)?.type === LEAD_OK_MESSAGE) void onSuccess();
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimers();
    };
  }, [onSuccess]);

  // GA Client ID (P0-11): solo con consentimiento; se precarga cuando gtag está listo.
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (readConsent() !== "granted") {
        gaClientId.current = "";
        return;
      }
      for (let i = 0; i < 50 && !cancelled; i += 1) {
        const id = await getGaClientId(gaId);
        if (id) {
          gaClientId.current = id;
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    };
    void load();
    const onConsent = () => void load();
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsent);
    return () => {
      cancelled = true;
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsent);
    };
  }, [gaId]);

  const validate = (form: HTMLFormElement): Errors => {
    const value = (name: string) => ((form.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "").trim();
    const next: Errors = {};
    if (!value(zohoForm.fields.firstName)) next.firstName = messages.required;
    if (!value(zohoForm.fields.lastName)) next.lastName = messages.required;
    if (!value(zohoForm.fields.company)) next.company = messages.required;
    const email = value(zohoForm.fields.email);
    if (!email) next.email = messages.required;
    else if (!EMAIL_PATTERN.test(email)) next.email = messages.email;
    if (!(form.querySelector<HTMLInputElement>("#demo-authorized"))?.checked) {
      next.authorized = messages.authorized;
    }
    if (!value(zohoForm.fields.captcha)) next.captcha = messages.captcha;
    return next;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (inFlight.current) {
      event.preventDefault();
      return;
    }
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      event.preventDefault();
      const first = form.querySelector<HTMLElement>("[aria-invalid='true']");
      window.setTimeout(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus() ?? first?.focus(), 0);
      return;
    }
    if (sinkUsed.current || !sinkReady.current) {
      // Reintento (iframe ya usado) o iframe aún cargando: se recrea si hace falta y el
      // envío sale en cuanto /form-sink.html termine de cargar.
      event.preventDefault();
      pendingSubmit.current = true;
      setStatus("sending");
      if (sinkUsed.current) {
        takePendingLead(); // El intento anterior ya no puede confirmarse.
        resetSink();
      }
      return;
    }

    // Description = "Necesidad: <opción>" + salto de línea + contexto adicional.
    const need = form.querySelector<HTMLSelectElement>("#demo-need")?.value || "";
    const context = form.querySelector<HTMLTextAreaElement>("#demo-context")?.value.trim() || "";
    if (descriptionRef.current) {
      descriptionRef.current.value = `Necesidad: ${need || "Sin especificar"}${context ? `\n${context}` : ""}`;
    }

    fillAttribution(form, gaClientId.current);
    setPendingLead(need || "sin_especificar");
    clearTimers();
    attempt.current = { active: true, done: false, timers: [] };
    attempt.current.timers.push(
      window.setTimeout(() => {
        if (attempt.current.done) return;
        showUnconfirmed();
        // Sin confirmación en 20 s: se descarta el flag para que nada cuente este envío
        // después, y se recrea el iframe para quitar su entrada del historial.
        takePendingLead();
        resetSink();
      }, HARD_TIMEOUT_MS),
    );
    inFlight.current = true;
    sinkUsed.current = true;
    setStatus("sending");
    // Sin preventDefault: el navegador envía el POST al iframe (target).
  };

  const fieldProps = (key: FieldKey) => ({
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `demo-error-${key}` : undefined,
    onInput: () => errors[key] && setErrors((current) => ({ ...current, [key]: undefined })),
  });

  const fieldError = (key: FieldKey) =>
    errors[key] ? <span className="field-error" id={`demo-error-${key}`}>{errors[key]}</span> : null;

  return (
    <>
      <form
        ref={formRef}
        className="contact-form"
        action={zohoForm.action}
        method={zohoForm.method}
        acceptCharset="UTF-8"
        target={jsReady ? SINK_NAME : undefined}
        noValidate={jsReady}
        onSubmit={onSubmit}
        data-lead-form
      >
        {zohoForm.hidden.map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
        <input
          className="hp-field"
          type="text"
          name={zohoForm.honeypot}
          defaultValue=""
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
        />

        <div className="form-row">
          <label>Nombre
            <input name={zohoForm.fields.firstName} autoComplete="given-name" required maxLength={zohoForm.maxLength.firstName} placeholder="Tu nombre" {...fieldProps("firstName")} />
            {fieldError("firstName")}
          </label>
          <label>Apellidos
            <input name={zohoForm.fields.lastName} autoComplete="family-name" required maxLength={zohoForm.maxLength.lastName} placeholder="Tus apellidos" {...fieldProps("lastName")} />
            {fieldError("lastName")}
          </label>
        </div>
        <div className="form-row">
          <label>Empresa
            <input name={zohoForm.fields.company} autoComplete="organization" required maxLength={zohoForm.maxLength.company} placeholder="Nombre de empresa" {...fieldProps("company")} />
            {fieldError("company")}
          </label>
          <label>Correo corporativo
            <input name={zohoForm.fields.email} type="email" autoComplete="email" required maxLength={zohoForm.maxLength.email} placeholder="nombre@empresa.cl" {...fieldProps("email")} />
            {fieldError("email")}
          </label>
        </div>
        <div className="form-row">
          <label>Teléfono
            <input name={zohoForm.fields.phone} type="tel" autoComplete="tel" maxLength={zohoForm.maxLength.phone} placeholder="+56 9..." />
          </label>
          <label>Activo o dominio a evaluar
            <input name={zohoForm.fields.website} maxLength={zohoForm.maxLength.website} placeholder="empresa.cl / api.empresa.cl" />
          </label>
        </div>
        <label>¿Qué necesitas?
          {/* Sin name: con JS se compone en Description (Necesidad: …); no se envía suelto. */}
          <select id="demo-need" defaultValue="">
            <option value="" disabled>Selecciona una opción</option>
            {needOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>Contexto adicional
          {/* Sin JS se envía tal cual como Description; con JS se compone con la necesidad. */}
          <textarea id="demo-context" name={jsReady ? undefined : zohoForm.fields.description} rows={3} placeholder="Cuéntanos brevemente qué quieres revisar." />
        </label>
        {/* Atribución de origen (P0-11): se rellena justo antes del envío; sin JS va vacía. */}
        {attributionNames.map((name) => <input key={name} type="hidden" name={name} />)}
        {/* Sin value controlado: React no debe reescribirlo durante el envío. */}
        {jsReady ? <input ref={descriptionRef} type="hidden" name={zohoForm.fields.description} /> : null}

        <div className="captcha-field">
          <label htmlFor="demo-captcha">Código de verificación</label>
          <div className="captcha-row">
            <img className="captcha-image" src={captchaSrc} alt="Código de verificación" width={200} height={70} />
            {jsReady ? (
              <button type="button" className="captcha-reload" onClick={reloadCaptcha}>Recargar código</button>
            ) : null}
          </div>
          <input
            id="demo-captcha"
            name={zohoForm.fields.captcha}
            required
            maxLength={zohoForm.maxLength.captcha}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            {...fieldProps("captcha")}
          />
          {fieldError("captcha")}
        </div>

        <label className="form-check">
          {/* Obligatorio y validado en el cliente; sin name: no se envía a Zoho. */}
          <input id="demo-authorized" type="checkbox" required {...fieldProps("authorized")} />
          <span>Solicito información para evaluar activos propios o expresamente autorizados.</span>
        </label>
        {fieldError("authorized")}

        {status === "unconfirmed" ? (
          <p className="form-alert" role="alert">
            No pudimos confirmar el envío. Revisa el código de verificación e inténtalo de nuevo; si
            persiste,{" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">escríbenos por WhatsApp</a>.
          </p>
        ) : null}

        <button className="button primary form-submit" type="submit" data-cta="demo" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Agenda tu demo"}
        </button>
        <p className="privacy-consent">
          Al enviar aceptas nuestra{" "}
          <a href={privacyUrl} target="_blank" rel="noopener">Política de privacidad</a>
        </p>
        <p className="privacy-note">
          Ninguna evaluación se ejecuta sin tu autorización y aprobación explícita. Tus datos se
          usarán solo para responder esta solicitud comercial.
        </p>
      </form>
      <iframe
        key={sinkKey}
        ref={sinkRef}
        name={SINK_NAME}
        title="envío"
        src={SINK_SRC}
        sandbox="allow-forms allow-scripts allow-same-origin"
        onLoad={onSinkLoad}
        hidden
      />
    </>
  );
}
