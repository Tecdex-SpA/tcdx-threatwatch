# CHANGELOG — vulnera.tecdex.net

Registro de las tandas de la misión «web de VULNERA» (docs 47, 48 y 49 del proyecto
«TECDEX Analisis RRSS y MKT»). Una entrada por tarea: archivos, HTML antes/después
(curl) y cómo revertir.

---

## Tanda P0 — Indexación, medición y claims · 2026-10-04

**Estado:** commits en local, **sin push** (lo autoriza Mario tras revisar; el push a
`main` despliega en producción en Vercel). Copy: doc 48, con las decisiones del doc 49.

**Método de verificación:** `next build` + `next start -p 3100` y curl al HTML
servido. «Antes» = build local de `3e29d84`, idéntico a producción (curl a
`https://vulnera.tecdex.net/` el 2026-10-04, `x-vercel-cache: HIT`). El consentimiento,
GA4 y los eventos se probaron además en el navegador (servidor de desarrollo con un ID
de prueba `G-TESTP00000`, que no se commitea).

**Fuera de los commits:** el cambio de `app/globals.css` (ancho de contenedor 1140→1280)
no es de esta misión. Se guardó en stash durante la tanda y se restauró sin commitear
(decisión 8 del doc 49).

| # | Commit | Tarea |
|---|---|---|
| 1 | `e28e7d8` | P0-2 · Configuración centralizada |
| 2 | `af74ef4` | P0-3 · Sitemap y robots |
| 3 | `32b03da` | P0-1 · Meta-tags de verificación GSC/Bing |
| 4 | `50f5301` | P0-6 · Copy y claims de la home (doc 48) |
| 5 | `20ea3f8` | P0-6 · Bloque «Estado del producto» |
| 6 | `9304207` | P0 · Limpieza de assets ThreatWatch |
| 7 | `2352afd` | P0-7 · Consentimiento de cookies |
| 8 | `571fb4a` | P0-4 · GA4 propio tras consentimiento |
| 9 | `a960341` | P0-5 · Eventos de conversión + WhatsApp |
| 10 | (este archivo) | P0 · Registro |

### P0-2 · Configuración centralizada (`e28e7d8`)

- **Archivos:** `lib/site.ts`, `.env.example` (nuevo), `app/layout.tsx`, `app/manifest.ts`.
- **Qué:** `lib/site.ts` es la fuente única: dominio (`SITE_URL`), nombre, locale `es-CL`,
  organización (`@id` `https://tecdex.net/#organization`, `#vulnera`, razón social),
  contacto, flag `FEATURE_SALES_PUBLIC` (false) e IDs externos leídos de entorno:
  `ANALYTICS_GA4_ID`, `GSC_VERIFICATION`, `BING_VERIFICATION`. En los commits 4 y 9,
  `page.tsx` también pasa a leer de aquí el contacto y el enlace de WhatsApp.
- **HTML:** sin cambio de copy. Única diferencia servida: se añade `<link rel="author" href="https://tecdex.net/"/>`.
- **Revertir:** `git revert e28e7d8` (antes revertir 3-9, que dependen de esta configuración).

### P0-3 · Sitemap y robots (`af74ef4`)

- **Archivos:** `next.config.mjs` (`trailingSlash: true`), `lib/site.ts` (registro `routes`
  con `lastModified` por ruta), `app/sitemap.ts`, `app/robots.ts`.
- **Antes:**
  ```html
  <link rel="canonical" href="https://vulnera.tecdex.net"/>
  <loc>https://vulnera.tecdex.net</loc>  <lastmod>2026-07-24T14:58:16.026Z</lastmod>   (fecha de build)
  ```
- **Después:**
  ```html
  <link rel="canonical" href="https://vulnera.tecdex.net/"/>
  <meta property="og:url" content="https://vulnera.tecdex.net/"/>
  <loc>https://vulnera.tecdex.net/</loc>  <lastmod>2026-10-04</lastmod>
  ```
  `/sitemap.xml` y `/robots.txt` → `200 OK` sin redirección. `loc` == canonical.
- **Mantenimiento:** al cambiar el contenido de una ruta, actualizar su `lastModified`
  en `lib/site.ts`. En P1 se agregan ahí las rutas nuevas.
- **Revertir:** `git revert af74ef4`.

### P0-1 · Meta-tags de verificación (`32b03da`) — `ACCIÓN_MARIO`

- **Archivos:** `app/layout.tsx` (`metadata.verification`).
- **Después, sin variables:** no se emite ningún meta de verificación.
- **Después, con `GSC_VERIFICATION=prueba-gsc-123 BING_VERIFICATION=PRUEBABING456`:**
  ```html
  <meta name="google-site-verification" content="prueba-gsc-123"/>
  <meta name="msvalidate.01" content="PRUEBABING456"/>
  ```
- **Pendiente (`ACCIÓN_MARIO`):** crear la propiedad de Search Console con prefijo
  `https://vulnera.tecdex.net/` y la de Bing Webmaster Tools. Cargar los valores
  `content` en Vercel (Environment Variables) y redeplegar. Enviar `sitemap.xml` en
  ambas y pedir la indexación de la home. Alternativa: verificar por DNS TXT, sin código.
- **Revertir:** `git revert 32b03da`.

### P0-6 · Copy y claims de la home (`50f5301`)

- **Archivos:** `app/page.tsx`, `app/layout.tsx`, `app/manifest.ts`, `lib/site.ts`, `app/globals.css`.
- **Antes (`<head>` + H1):**
  ```html
  <title>VULNERA by TECDEX | Pentesting continuo y gestión de superficie expuesta</title>
  <meta name="description" content="Plataforma SaaS chilena para apoyar pentesting continuo, gestión de superficie expuesta, escaneos controlados, …"/>
  <meta property="og:title" content="VULNERA by TECDEX — Pentesting continuo y gestión de exposición"/>
  <meta property="og:description" content="Controle scopes, valide ownership, ejecute scans autorizados y …"/>
  <meta name="keywords" content="pentesting continuo Chile,…,pentesting SaaS,…,OWASP ZAP Chile,Nmap Nuclei ZAP reportes,…"/>
  <h1>Conoce tu superficie expuesta antes que se convierta en un incidente.</h1>
  ```
- **Después:**
  ```html
  <title>Gestión de vulnerabilidades y remediación | VULNERA by TECDEX</title>
  <meta name="description" content="Plataforma de TECDEX para evaluar activos propios o autorizados, entender cada hallazgo y gestionar su corrección, del hallazgo al cierre. En desarrollo: agenda una demo guiada."/>
  <meta property="og:title" content="Gestión de vulnerabilidades y remediación | VULNERA by TECDEX"/>
  <meta property="og:description" content="(igual a la description)"/>
  <meta property="og:site_name" content="VULNERA by TECDEX"/>  <meta property="og:locale" content="es_CL"/>
  (sin meta keywords)
  <h1>Del hallazgo al cierre comprobado, no solo al informe.</h1>
  ```
- **Cambios de contenido:**
  - Hero: eyebrow, subtítulo, CTAs y sellos del doc 48.
  - Panel del hero:
    - Lleva la etiqueta visible «Vista de demostración · datos ilustrativos».
    - Se quitan «Monitoreo activo», «↓ 18%», «Últimos 30 días» y la serie semanal.
    - Se dejan los KPIs de ejemplo y las barras de severidad.
  - «La solución» (capacidades, «visibilidad continua») y la franja de contexto se sustituyen por el bloque «El problema» (Sin/Con VULNERA).
  - Ciclo de 4 pasos y roles («Una plataforma, dos lecturas») con el texto del doc 48.
  - **Se retira** el bloque «Servicio gestionado TECDEX» y la opción «Evaluar servicio gestionado» del formulario.
  - **Nuevo** bloque «¿Lo necesitas para una auditoría?», con enlace a `https://isos.tecdex.net/` y la nota de que no sustituye una certificación.
  - Formulario:
    - Título, lista y opciones de «¿Qué necesitas?» del doc 48.
    - Botón «Solicitar demo guiada».
    - Se mantienen el checkbox obligatorio y «No se ejecutará ningún escaneo automáticamente».
  - FAQ: las 5 preguntas con el texto del doc 48.
  - Footer: bajada y columnas del doc 48.
  - Manifest: `description` = bajada del footer.
  - Uso responsable: sin cambios.
- **Diff completo del copy:** `git show 50f5301 -- app/page.tsx`.
- **Revertir:** `git revert 20ea3f8 50f5301` (primero el bloque de estado).

### P0-6 · Bloque «Estado del producto» (`20ea3f8`)

- **Archivos:** `app/components/ProductStatus.tsx` (nuevo, reutilizable en `/como-funciona`), `app/page.tsx`, `app/globals.css`.
- **Después:** sección `#estado` con:
  - la insignia «Actualizado: octubre 2026» y el texto introductorio;
  - dos columnas, «Disponible para demostración» y «En desarrollo», con el contenido del doc 48 §5.

  El footer enlaza a `#estado`.
- **Mantenimiento:** actualizar las listas y la insignia de `ProductStatus.tsx` cuando cambie el estado real.
- **Revertir:** `git revert 20ea3f8`.

### P0 · Limpieza de assets ThreatWatch (`9304207`)

- **Archivos eliminados (12):**
  - `public/logo-threatwatch-header.png`
  - `public/logo-threatwatch.jpeg`
  - `public/logo-threatwatch.png`
  - `public/og-threatwatch.svg` (contenía «pentesting»)
  - `public/visual-{approval-gate,control-layers,executive-report,exposure-map,operation-model,report-flow,risk-priority,scan-modes}.svg`
- **Antes:** respondían 200 en `https://vulnera.tecdex.net/<archivo>` aunque el sitio no los usaba.
- **Después:** 404 tras el deploy. `public/` queda con `favicon.svg` y `og.png`.
- **Revertir:** `git revert 9304207`.

### P0-7 · Consentimiento de cookies (`2352afd`)

- **Archivos:** `lib/consent.ts` (nuevo), `app/components/ConsentBanner.tsx` (nuevo), `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `lib/site.ts`.
- **Qué:**
  - Banner con el texto aprobado y los botones Rechazar / Aceptar, con el mismo peso visual.
  - Enlace a la política de privacidad de TECDEX.
  - La decisión se guarda en el navegador (`localStorage`).
  - «Preferencias de cookies» en el footer permite cambiarla.
  - Solo se renderiza si `ANALYTICS_GA4_ID` tiene valor, porque sin GA4 no hay cookies no esenciales.
- **HTML servido:** el banner es de cliente y no aparece en el HTML inicial. Sin ID, tampoco hay botón en el footer; con ID, el botón aparece.
- **Verificado en el navegador:** al rechazar se cierra y guarda `denied`. Tras recargar no reaparece, y el botón del footer lo reabre.
- **Revertir:** `git revert a960341 571fb4a 2352afd` (P0-4 y P0-5 dependen de esta tarea).

### P0-4 · GA4 propio tras consentimiento (`571fb4a`) — `ACCIÓN_MARIO`

- **Archivos:** `app/components/Analytics.tsx` (nuevo, `next/script`), `app/layout.tsx`.
- **Qué:**
  - `gtag/js` solo se solicita con el consentimiento en `granted`.
  - `cookie_domain: 'none'`: las cookies quedan en `vulnera.tecdex.net`, separadas de las de `tecdex.net`.
  - Si el usuario revoca, se activa `ga-disable-<ID>` y se borran las cookies `_ga`/`_ga_*` del host.
- **Verificación:**

  | Estado | `gtag/js` solicitado | `window.gtag` | Cookies `_ga` |
  |---|---|---|---|
  | Sin decidir (banner abierto) | no | `undefined` | no |
  | **Rechazado** | **no** (0 peticiones a google*) | `undefined` | no |
  | Aceptado | sí (`gtag/js?id=G-TESTP00000`) | `function` | `_ga`, `_ga_TESTP00000` |
  | Revocado tras aceptar | — | desactivado (`ga-disable` = true) | borradas |

  En el HTML servido (curl) no hay `googletagmanager` en ningún caso: se inyecta solo en el cliente tras aceptar.
- **Pendiente (`ACCIÓN_MARIO`):**
  - Crear una propiedad GA4 propia de VULNERA.
  - Cargar `ANALYTICS_GA4_ID` en Vercel y redeplegar.
  - Confirmar un evento de prueba en DebugView.
- **Revertir:** `git revert a960341 571fb4a`.

### P0-5 · Eventos de conversión (`a960341`)

- **Archivos:** `lib/analytics.ts` (nuevo), `app/components/Analytics.tsx`, `app/page.tsx` (atributos `data-location`/`data-cta`/`data-lead-form`), `lib/site.ts`.
- **Eventos:**

  | Evento | Disparador | `location` |
  |---|---|---|
  | `cta_demo_click` | enlaces/botón con `data-cta="demo"` | `nav` (escritorio y móvil), `hero`, `footer`, `demo` (botón de envío) |
  | `click_email` | `a[href^="mailto:"]` | `demo`, `footer` |
  | `click_phone` | `a[href^="tel:"]` | `footer` |
  | `click_whatsapp` | `a[href*="wa.me/"]` | `demo`, `footer`, `float` (botón flotante) |
  | `generate_lead` | `submit` válido del formulario de demo | `demo` + `need` (valor de «¿Qué necesitas?») |

  `float` es un valor añadido para el botón flotante de WhatsApp, que no encaja en hero/nav/demo/footer.
- **WhatsApp, antes:** `https://wa.me/56989995290?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20VULNERA.` en el botón flotante; sin texto en los demás enlaces.
- **WhatsApp, después (todos los enlaces):** `https://wa.me/56989995290?text=Hola%2C%20vengo%20de%20la%20web%20de%20VULNERA%20y%20quiero%20informaci%C3%B3n.`
- **Verificado en el navegador** (`dataLayer`, con el consentimiento aceptado):
  - Los 11 disparadores emiten el evento y la `location` esperados.
  - `generate_lead {"location":"demo","need":"Preparar una auditoría"}` se emite solo con el formulario válido; sin el checkbox obligatorio no se emite.
  - Con el consentimiento rechazado no se envía nada (`gtag` no existe).
- **Revertir:** `git revert a960341`.

### Barrido de claims (doc 40 §11) sobre el HTML servido

Se extrae el texto visible y los `content` de los meta del HTML de `/`, y se buscan los
patrones prohibidos.

| Patrón | Antes | Después |
|---|---:|---:|
| «pentesting continuo» | 8 | **0** |
| «pentesting» (cualquiera) | 9 | **0** |
| «monitoreo» | 1 | **0** |
| «servicio gestionado» | 3 | **0** |
| «continuo» / «visibilidad continua» | 9 | **0** |
| cifras de tendencia (↓ 18 %) | 2 | **0** |
| herramientas (ZAP/Nmap/Nuclei/OWASP) | 5 | **0** |
| «scan(s)» / «escaneos» | 7 | 1 ¹ |
| «superficie expuesta» | 8 | 1 ² |
| «reemplaza» | 2 | 2 ³ |
| encuentra todo · garantiza (afirmativo) · IA · autónomo · ahorro/reducción · casos de éxito · EPSS/KEV/SIEM · ilimitado · precios · grafía «Vulnera»/«ISOS» | 0 | 0 |

¹ «No se ejecutará ningún escaneo automáticamente.» (aviso obligatorio).
² Opción del formulario «Revisar mi superficie expuesta» (doc 48 §4): describe lo que pide el usuario, no es un claim.
³ «¿VULNERA reemplaza un pentest? — No.» y «…ni reemplaza una evaluación humana» (negaciones aprobadas).

Las cifras 24 / 12 / 96 % solo aparecen dentro del panel etiquetado «Vista de demostración · datos ilustrativos».

### Pendientes `ACCIÓN_MARIO` (P0)

1. Search Console: propiedad de prefijo `https://vulnera.tecdex.net/`.
2. Bing Webmaster Tools: propiedad del subdominio (se puede importar desde GSC).
3. GA4: propiedad propia de VULNERA.
4. Vercel: cargar `ANALYTICS_GA4_ID`, `GSC_VERIFICATION` y `BING_VERIFICATION`, y redeplegar.
5. Tras el deploy: enviar `sitemap.xml` en GSC y Bing, pedir la indexación de la home y confirmar los eventos en DebugView.

### Observaciones fuera de alcance (no tocadas)

- **Tipografía del cuerpo:** el cuerpo se renderiza en la serif por defecto del navegador (Times), también en producción. La causa es que `body, input, … { font: inherit; }` en `globals.css` pisa el `font-family` del body. Se resuelve con el rediseño de P2 (Inter en el cuerpo).
- **Destino del formulario:** sigue siendo `mailto:` (P2-2: envío a Zoho CRM y página `/gracias`).
