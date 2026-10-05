# CHANGELOG — vulnera.tecdex.net

Registro de las tandas de la misión «web de VULNERA» (docs 47, 48 y 49 del proyecto
«TECDEX Analisis RRSS y MKT»). Una entrada por tarea: archivos, HTML antes/después
(curl) y cómo revertir.

---

## Tanda P0 — Indexación, medición y claims · 2026-10-04

**Estado:** **desplegada en producción** el 2026-10-04 (push autorizado por Mario; ver
«Despliegue en producción» al final de la tanda). Copy: doc 48, con las decisiones del doc 49.

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
| 10 | `47a6ec6` | P0 · Registro |
| 11 | `c9300a6` | fix · Restaura `font-family` del body |

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

### fix · Restaura `font-family` del body (`c9300a6`)

- **Archivo:** `app/globals.css` (1 línea). Solo se commiteó esta línea; el cambio ajeno
  de ancho de contenedor (1140→1280) sigue fuera de todos los commits.
- **Causa:** `body, input, select, textarea, button { font: inherit; }` hacía que el body
  heredara la fuente por defecto del navegador (Times) y anulaba `font-family: var(--font-body)`.
- **Cambio:** se quita `body` del selector; los controles de formulario siguen heredando la fuente del body.
- **CSS servido, antes:** `body,button,input,select,textarea{font:inherit}`.
- **CSS servido, después:** `button,input,select,textarea{font:inherit}`.
- **Fuente calculada del body, antes:** `Times`.
- **Fuente calculada del body, después:** `-apple-system, "system-ui", "Segoe UI", Roboto, Arial, sans-serif` (navegador sobre producción).
- **Revertir:** `git revert c9300a6`.

### Despliegue en producción

- **Push:** `git push origin main` (`3e29d84..c9300a6`, 11 commits), autorizado por Mario el 2026-10-04.
- **Deploy de Vercel:**
  - Commit desplegado: `c9300a6` (`c9300a661866997258d05f82ea0d8121a1aa2417`).
  - Entorno: Production.
  - Deployment GitHub: `6848397270`.
  - Estado: `success` (READY) a las 2026-10-04T23:43:24Z.
  - URL del deploy: `https://tcdx-threatwatch-ad54xqo2m-tecdex-projects.vercel.app`.
  - Registro en Vercel: `https://vercel.com/tecdex-projects/tcdx-threatwatch/EFzikXpT7mw8FrmvxweRQNh99Rxk`.
- **Variables de entorno en Vercel** (Production y Preview):
  - `ANALYTICS_GA4_ID=G-4Q39F6MMQM`. El código lee exactamente ese nombre en el servidor, durante el build.
  - `GSC_VERIFICATION` y `BING_VERIFICATION` quedan vacías a propósito: las propiedades se verificaron fuera del código.
- **Verificación contra `https://vulnera.tecdex.net/`:** curl, más el navegador para la fuente y el consentimiento.

  | Comprobación | Resultado |
  |---|---|
  | `<title>` | `Gestión de vulnerabilidades y remediación \| VULNERA by TECDEX` ✅ (= doc 48) |
  | `<meta name="description">` | texto del doc 48 §0 ✅ |
  | Canonical | `https://vulnera.tecdex.net/` ✅ (con barra) |
  | `og:url` / `og:title` / `og:description` / `og:locale` | `/` con barra, iguales a title/description, `es_CL` ✅ |
  | `sitemap.xml` | `HTTP/2 200` sin redirección; `loc` `https://vulnera.tecdex.net/` = canonical; `lastmod` `2026-10-04` ✅ |
  | `robots.txt` | `HTTP/2 200` sin redirección; declara el sitemap ✅ |
  | Barrido de claims prohibidos (doc 40 §11) | **0 claims**. Solo coinciden las 4 frases aprobadas (¹ ² ³ del barrido) ✅ |
  | Etiqueta «Vista de demostración · datos ilustrativos» | presente ✅ |
  | Estado del producto · Uso responsable · checkbox · «no se ejecutará ningún escaneo» | presentes ✅ |
  | Meta-tags de verificación GSC/Bing | 0 (a propósito) ✅ |
  | `G-4Q39F6MMQM` en el HTML servido | 1 (payload RSC: `{"gaId":"G-4Q39F6MMQM"}`) ✅ |
  | `googletagmanager` en el HTML servido | 0: no se carga sin consentimiento ✅ |
  | Sin decidir (banner visible) | `gtag/js` no solicitado, `gtag` undefined, sin cookies `_ga` ✅ |
  | **Rechazar** + recargar | 0 peticiones a Google, `gtag` undefined, sin cookies `_ga` ✅ |
  | Aceptar | carga `gtag/js?id=G-4Q39F6MMQM`, `config` G-4Q39F6MMQM, `g/collect` enviado, cookies `_ga` y `_ga_4Q39F6MMQM` ✅ |
  | Revocar tras aceptar | `ga-disable-G-4Q39F6MMQM` = true, cookies `_ga` borradas ✅ |
  | Fuente del body | sans-serif (`-apple-system, "system-ui", …`), ya no Times; CSS servido sin `body` en `font:inherit` ✅ |
  | Assets ThreatWatch eliminados | `og-threatwatch.svg`, `logo-threatwatch.png` y `visual-exposure-map.svg` → 404; `og.png` y `favicon.svg` → 200 ✅ |

  La prueba «Aceptar» envió **un page_view real** a G-4Q39F6MMQM desde el navegador de verificación (2026-10-04, ~23:46 UTC). Después se volvió a rechazar.

### Pendientes `ACCIÓN_MARIO` (P0)

1. ~~Search Console~~ y ~~Bing Webmaster Tools~~: dados de alta y verificados (según Mario, 2026-10-04).
2. ~~GA4 propio~~ y ~~variable en Vercel~~: hecho (`G-4Q39F6MMQM`).
3. Confirmar en GSC y Bing que `sitemap.xml` está enviado y en estado «Correcto», y pedir la indexación de la home.
4. Confirmar en GA4 (tiempo real o DebugView) el page_view de prueba y un evento de conversión.

### Observaciones fuera de alcance

- **Destino del formulario:** sigue siendo `mailto:` (P2-2: envío a Zoho CRM y página `/gracias`).

---

## P0-8 · Miniatura del hero recreada a partir del dashboard actual · 2026-10-04

**Estado:** **desplegada en producción** el 2026-10-04 (push autorizado por Mario tras ver la
comparativa; ver «Despliegue P0-8» al final de esta sección).

- **Archivos:**
  - `app/components/DashboardPreview.tsx` (nuevo)
  - `app/page.tsx` (se quita `ProductPreview`)
  - `app/globals.css` (se elimina el CSS del mock viejo y se añaden las reglas `.dash*`)
- **Referencia:** `http://localhost:8400/vulnera-lab/dashboard`, tema oscuro, leída en el
  Chrome de Mario con su sesión. No se publicó ninguna captura: la pantalla contiene notas
  internas, rutas de API y nombres de herramientas.
- **Tokens extraídos de la app y aplicados:**

  | Elemento | Valor |
  |---|---|
  | Fondo / raíl / superficie / superficie 2 | `#0E1418` / `#121A20` / `#151D23` / `#1E282F` |
  | Líneas | `#2B3740`, `#192127` |
  | Texto | `#E8EEF2`, `#C3CED5`, `#91A0AC`, `#8999A1` |
  | Marca | `#5CB2B1` |
  | Severidades | crítica `#F4574B`, alta `#F79009`, media `#EAAA08`, baja `#3FBE85`, info `#7F8F9C` |
  | Tipografía | IBM Plex Sans Condensed (cuerpo), IBM Plex Mono (etiquetas y cifras) |
  | Etiquetas | Mono 500, mayúsculas, espaciado 0,12 em |
  | Radio | 3 px |
  | Barras | 6 px sobre un carril `#2B3740` |
  | Estado | píldora con borde |
  | Ítem activo del menú | fondo `#1E282F` y borde turquesa |

  En la miniatura los tamaños se reducen de forma proporcional.
- **Contenido (curado y sintético):**
  - **Menú lateral:** «VULNERA de TECDEX», Inicio, AUTORIZACIÓN (Objetivos y propiedad, Alcance, Evaluaciones, Aprobaciones), AUDITORÍAS (Auditorías, Hallazgos, Informes) y «Remediación y retest» marcado «En desarrollo».
  - **Barra superior:** Organización demo · Rol Owner · Alcance activo 2 alcances.
  - **Hallazgos sin revisar por severidad:** 24 en total (Crítica 2 · Alta 5 · Media 9 · Baja 6 · Info 2).
  - **Alcance y propiedad:** 2 alcances activos, 3 objetivos con propiedad vigente, 1 verificación pendiente.
  - **Últimas auditorías:** `example.com` (Completo, Completada, 14) y `demo.example.com` (Solo web, Completada, 10).
- **Excluido:**
  - Notas «sin backend / sin endpoint / sin API».
  - Rutas de API.
  - Códigos DEC-*.
  - La tarjeta «Aporte por herramienta».
  - Los nombres de herramientas y «Pentesting continuo».
- **Etiqueta:** «Vista de demostración · datos ilustrativos», visible como `figcaption` encima de la vista.
- **Responsive:**
  - Escritorio: 560×449 px en el hero.
  - Móvil 375 px: se oculta el menú lateral, las tarjetas se apilan y la tabla pierde la columna «Tipo». Sin desbordamiento horizontal (`scrollWidth` 375).
- **Fuentes:** `next/font/google` sin preload, para no competir con el LCP del hero, y con `display: swap`.
- **Verificación local** (build de producción + `next start` + curl):

  | Comprobación | Resultado |
  |---|---|
  | Miniatura en el HTML inicial (SSR) | sí ✅ |
  | «sin backend» / «sin endpoint» / «sin API» | 0 / 0 / 0 ✅ |
  | Rutas de API (`findings/summary`, `scans?status`, `domain-verifications`, `/scans/`, `narrative`, `ScanListResponse`, `by_tool`, `GET /`) | 0 ✅ |
  | Códigos `DEC-*` · «Aporte por herramienta» | 0 · 0 ✅ |
  | nuclei / nmap / subfinder / zap / testssl / naabu | 0 ✅ |
  | «Pentesting continuo» · `vulnera-lab` | 0 · 0 ✅ |
  | Barrido de claims (doc 40 §11) | sin cambios: solo las 4 frases aprobadas ✅ |
  | CSS viejo (`product-preview`, `metric-row`, `finding-row`, `severity-card`, `demo-label`) en el CSS compilado | 0 ✅ |
  | Revisión visual en escritorio (1440 y 1100 px) y móvil (375 px) | correcta ✅ |

- **Revertir:** `git revert e4d1585`.

### Despliegue P0-8

- **Push:** `c9300a6..3289e01`, 3 commits (`578fac5`, `e4d1585`, `3289e01`).
- **Deploy de Vercel:**
  - Commit desplegado: `3289e01` (`3289e01ccf5ffca6231a4e5d7251c40d30735af2`).
  - Entorno: Production.
  - Deployment GitHub: `6848700209`.
  - Estado: `success` (READY) a las 2026-10-05T00:15:08Z.
  - URL del deploy: `https://tcdx-threatwatch-htbxlykf2-tecdex-projects.vercel.app`.
- **Verificación contra `https://vulnera.tecdex.net/`:** curl, más el navegador para el render.

  | Comprobación | Resultado |
  |---|---|
  | `/`, `sitemap.xml`, `robots.txt`, `manifest.webmanifest` | `HTTP/2 200` sin redirección ✅ |
  | title / description / canonical / sitemap | sin cambios respecto al deploy de P0 ✅ |
  | Miniatura nueva en el HTML inicial | sí ✅ |
  | Exclusiones P0-8 (notas de desarrollo, rutas de API, `DEC-*`, aporte por herramienta, nombres de herramientas, «Pentesting continuo», `vulnera-lab`) | 0 en todas ✅ |
  | Barrido de claims (doc 40 §11) | solo las 4 frases aprobadas ✅ |
  | CSS servido | 0 clases del mock viejo; 55 reglas `.dash-`; arreglo de la fuente del body presente ✅ |
  | Fuentes IBM Plex Mono / Sans Condensed | cargadas en la miniatura; el body sigue en sans-serif ✅ |
  | GA4 | `G-4Q39F6MMQM` en el HTML; `googletagmanager` 0; con el consentimiento rechazado no se carga `gtag` ✅ |
  | Escritorio 1440 px | miniatura de 560×449 px ✅ |
  | Móvil 375 px | 344×540 px, sin menú lateral, `scrollWidth` 375 ✅ |

---

## Para el equipo de la app

Observaciones detectadas al preparar la miniatura (consola en `localhost:8400`, 2026-10-04).
No afectan a la web comercial, pero chocan con la matriz de claims (doc 40 §11) y con la
línea acordada para VULNERA.

1. **Pantalla de login y `<title>` de la app.**
   - El `<title>` es «VULNERA · Pentesting continuo por TecDex».
   - Bajo el logo dice «Pentesting continuo. Entra con tu cuenta corporativa…».
   - En escritorio, el panel lateral del login dice «Pentesting continuo sobre objetivos autorizados por alcance» y lista herramientas: «ORQUESTACIÓN subfinder · nmap · nuclei · ZAP».
   - El mismo panel afirma «REDUCCIÓN modelo propio de falsos positivos», una capacidad no verificada.
   - Grafía: «TecDex» en vez de «TECDEX».
   - Propuesta: alinear el título y el texto del login con la web («Gestión de vulnerabilidades con alcance autorizado») y retirar los nombres de herramientas y los claims no verificados.
2. **Propuesta: «modo demo» en la consola.** Una opción (flag de entorno o de organización) que oculte las anotaciones de desarrollo:
   - notas «sin backend / sin endpoint / sin API»;
   - rutas de API en las cabeceras de las tarjetas;
   - códigos `DEC-*`;
   - la tarjeta «Aporte por herramienta».

   Así las futuras miniaturas y las demos podrán ser capturas reales del producto, en lugar de recreaciones que se desfasan con cada cambio de UI.

---

## Tanda P1 — Estructura orgánica (SEO · AEO · GEO · LLMO) · 2026-10-05

**Estado:** commits en local, **sin push**. Pendiente de la revisión de Mario. El primer push
de P1 incluirá también `aef6b60` (registro del despliegue de P0-8). Copy: doc 48 §0, §2, §3,
§6, §7 y §8. El cambio ajeno de `globals.css` (1140→1280) sigue fuera de todos los commits.

| # | Commit | Tarea |
|---|---|---|
| 1 | `f8fd8de` | P1 · Cabecera, pie y uso responsable como componentes compartidos |
| 2 | `223e099` | P1-1 · Metadata por ruta desde un registro único de páginas |
| 3 | `dbb630d` | P1-3 · `/como-funciona/` (+ P1-2, bloque respuesta) |
| 4 | `1016008` | P1-3 · `/gestion-de-vulnerabilidades/` (+ P1-2, P1-7) |
| 5 | `c5a18d4` | P1-3 · `/preguntas-frecuentes/` (+ P1-2) |
| 6 | `76f3773` | P1-4 · JSON-LD con los `@id` de tecdex.net |
| 7 | `ef857aa` | P1-5 · `llms.txt` |
| 8 | `e85db63` | P1-3 · Alineación de las secciones de texto |
| 9 | (este registro) | P1 · CHANGELOG |

**Método de verificación:** igual que en P0. `next build` + `next start`, curl al HTML
servido de cada ruta (con `ANALYTICS_GA4_ID=G-4Q39F6MMQM`, como en Vercel) y revisión visual
en escritorio (1440 px) y móvil (375 px).

### P1 · Componentes compartidos (`f8fd8de`)

- **Archivos:** `app/components/SiteChrome.tsx` (nuevo) y `app/page.tsx`.
- **Qué:** `SiteHeader` y `SiteFooter` (este último incluye «Uso responsable», obligatorio en
  todas las páginas, y el botón flotante de WhatsApp) salen de la home para reutilizarlos en
  las rutas nuevas.
- **HTML servido:** solo cambian los `href` a rutas absolutas (`#solucion` → `/#solucion`),
  para que funcionen desde las subpáginas.
- **Revertir:** `git revert f8fd8de`. Antes hay que revertir 3-8.

### P1-1 · Metadata por ruta (`223e099`)

- **Archivos:** `lib/site.ts` (registro `pages`), `lib/seo.ts` (`pageMetadata()`) y `app/page.tsx`.
- **Qué:**
  - Cada página declara su ruta con barra, nombre, `title`, `description` (doc 48 §0),
    `lastModified` y `priority`.
  - De ese registro salen el `<title>`, la description, el canonical, OpenGraph y Twitter
    (con `og.png` global), el sitemap y las migas de pan.
- **HTML servido de la home:** idéntico (diff vacío).
- **Revertir:** `git revert 223e099`. Antes hay que revertir 3-8.

### P1-3 / P1-2 · Rutas nuevas

| Ruta | `<title>` (doc 48 §0) | H1 | Bloque respuesta (SSR) |
|---|---|---|---|
| `/como-funciona/` | Cómo funciona VULNERA: alcance, autorización y hallazgos \| TECDEX | Cómo funciona VULNERA | doc 48 §2, 55 palabras |
| `/gestion-de-vulnerabilidades/` | Qué es la gestión de vulnerabilidades y cómo hacerla \| VULNERA | Gestión de vulnerabilidades: del hallazgo a la remediación comprobada | doc 48 §3, 55 palabras |
| `/preguntas-frecuentes/` | Preguntas frecuentes sobre VULNERA \| TECDEX | Preguntas frecuentes sobre VULNERA | description de la ruta (doc 48 §0), 21 palabras ¹ |

¹ El doc 48 no trae un bloque respuesta propio para esta página. Se usa la description
aprobada en lugar de redactar uno nuevo. Queda por debajo de las 40-60 palabras de P1-2:
**decisión de Mario** (ver «Pendiente de decisión»).

- **Canonical y `og:url`:** con barra final en las tres rutas (`https://vulnera.tecdex.net/<ruta>/`).
  La versión sin barra redirige con 308 (comprobado en `/como-funciona` → `/como-funciona/`).
- **Plantilla** (`app/components/ContentPage.tsx`): H1, bloque respuesta, H2 del doc 48,
  tabla, autoría/fuentes cuando aplica, «Páginas relacionadas» y una CTA «Solicitar demo
  guiada» (`/#demo`) con `location` propio (`como-funciona`,
  `gestion-de-vulnerabilidades`, `preguntas-frecuentes`).
- **`/como-funciona/`:**
  - Secciones «¿Qué se evalúa y qué no?» (con la nota «El catálogo definitivo de pruebas se
    confirma por alcance»), «Las cuatro etapas» (tabla), «Qué recibes», «Control y
    autorización» y el recuadro «Estado del producto».
  - La tabla de etapas usa los textos aprobados del ciclo de la home, en dos columnas
    (Etapa / Qué ocurre). Ver «Pendiente de decisión».
- **`/gestion-de-vulnerabilidades/`** (pilar):
  - Contenido del doc 48 §3 completo: por qué un informe no basta, la tabla de 5 etapas,
    buenas prácticas, errores comunes, cumplimiento (deriva a TECDEX Compliance) y cómo
    ayuda VULNERA, con el recuadro de estado para marcar lo que está en desarrollo.
  - Las listas del doc 48, que venían separadas por punto y coma, se maquetan como viñetas
    con mayúscula inicial y punto final, sin cambiar el texto.
  - **P1-7:** autor TECDEX (enlace a quiénes somos), publicado y revisado el 5 de octubre de
    2026 (`<time>`) y tres fuentes enlazadas:
    - ISO/IEC 27001:2022 (A.8.8): `iso.org/standard/27001`, comprobado en el navegador
      porque Cloudflare bloquea curl;
    - Ley 21.663 (BCN): `idNorma=1202434`, comprobado que es la «LEY NÚM. 21.663, Ley Marco
      de Ciberseguridad»;
    - ANCI: `anci.gob.cl`.
- **`/preguntas-frecuentes/`:** las 8 preguntas del doc 48 §6 visibles como H2 + respuesta.
  `lib/faqs.ts` es la fuente única de este texto: la home muestra las 5 primeras (sin cambios)
  y el JSON-LD usa el mismo texto.
- **Navegación (P1-6):**
  - «Cómo funciona» y «Preguntas» de la cabecera llevan a las rutas nuevas.
  - El pie, columna Producto, añade «Gestión de vulnerabilidades» y «Preguntas frecuentes»
    (nombres de página, sin copy nuevo).
  - Grafo cerrado: cada página enlaza a las otras tres, a la demo y a tecdex.net. La pilar y
    la home enlazan además a isos.tecdex.net.
- **Sitemap:** las 4 URLs con barra y `lastmod` `2026-10-05`. La home también cambia de fecha,
  por los cambios de navegación.
- **Excluidas:** `/servicio-gestionado/`, `/precios/`, `/iso-27001-control-8-8/` y
  `/ley-21663-vulnerabilidades/` devuelven 404.
- **Revertir:** `git revert e85db63 c5a18d4 1016008 dbb630d`.

### P1-4 · JSON-LD (`76f3773`)

- **Archivos:** `lib/structured-data.ts`, `app/components/JsonLd.tsx` y las 4 páginas.
- **Un `@graph` por página:**

  | Ruta | Nodos |
  |---|---|
  | `/` | `Organization` (`https://tecdex.net/#organization`, solo `@id` + `name`) · `WebSite` (`https://vulnera.tecdex.net/#website`) · `SoftwareApplication` (`https://tecdex.net/#vulnera`) |
  | `/como-funciona/`, `/gestion-de-vulnerabilidades/` | `Organization` (ref.) · `BreadcrumbList` Inicio → página |
  | `/preguntas-frecuentes/` | `Organization` (ref.) · `BreadcrumbList` · `FAQPage` (8 preguntas) |

- **Verificado sobre el HTML servido:**
  - los `@id` coinciden con el JSON-LD vivo de tecdex.net;
  - `SoftwareApplication` no lleva `offers`, `aggregateRating` ni `review`;
  - el autor, el editor y el proveedor apuntan a `#organization`;
  - el texto de `FAQPage` es idéntico al visible (comprobado por script);
  - las URLs de las migas llevan barra final.
- **Descripción de `#vulnera`:** la del doc 48 §8.2, con la tilde de «corrección», que el
  bloque JSON del doc trae sin ella.
- **Revertir:** `git revert 76f3773`.

### P1-5 · `llms.txt` (`ef857aa`)

- **Archivo:** `app/llms.txt/route.ts` (estático).
- **Servido:** `200`, `text/plain; charset=utf-8`.
- **Contenido:** idéntico al doc 48 §7 (diff por script). La única diferencia es la barra
  final en las tres URLs de páginas, que se generan desde el registro de rutas. Está en ASCII,
  como el `llms.txt` de tecdex.net. «TecDex» aparece solo en la razón social, igual que allí.
- **Revertir:** `git revert ef857aa`.

### Barrido de claims (doc 40 §11) sobre las 4 rutas y `llms.txt`

- **0 coincidencias:** «pentesting continuo», «pentesting», «monitoreo», «servicio
  gestionado», «encuentra todo», explotación/autónoma, tendencias en %, ahorro/reducción,
  casos de éxito, EPSS/KEV/SIEM, nombres de herramientas, «ilimitado» y precios.
- **Grafía:** sin «Vulnera», «ISOS» ni «TecDex/Tecdex» en las páginas.
- **Coincidencias restantes:** todas son texto aprobado del doc 48 y casi siempre negaciones:
  - «¿VULNERA reemplaza un pentest? No…», «…ni reemplaza una evaluación humana», «No
    reemplaza un pentest manual», «no garantiza…»;
  - «No es una IA con permiso abierto para atacar» (FAQ 7);
  - «no sustituye una certificación», «la certificación la otorga un auditor»;
  - «proceso continuo» (definición de gestión de vulnerabilidades en la pilar, no un claim de
    producto);
  - «no con un escaneo», «No se ejecutará ningún escaneo», «Un informe de pentest o un
    escaneo…», «Confundir “escanear” con “gestionar”»;
  - la opción «Revisar mi superficie expuesta» del formulario.

### Pendiente de decisión (Mario)

1. **Tabla «Las cuatro etapas» de `/como-funciona/`.** El doc 48 §2 pide «qué hace el usuario
   y qué hace la plataforma» en cada etapa, pero no trae ese texto. Para no redactar copy
   (y porque «la plataforma ejecuta la evaluación» chocaría con «Ejecución integrada: en
   desarrollo»), hoy la tabla usa los textos aprobados del ciclo (Etapa / Qué ocurre). Si se
   quieren las dos columnas, hace falta el texto aprobado.
2. **Bloque respuesta de `/preguntas-frecuentes/`** (21 palabras, la description aprobada).
   Aprobarlo así o aportar un texto de 40-60 palabras.
3. **Pie:** se añadieron «Gestión de vulnerabilidades» y «Preguntas frecuentes» a la columna
   Producto para cerrar el grafo de enlaces. El doc 48 fijaba solo cuatro enlaces en esa columna.

### `ACCIÓN_MARIO` / WordPress de tecdex.net (P1-8)

1. Cambiar la `description` del `@id` `https://tecdex.net/#vulnera` en el JSON-LD de
   tecdex.net. Hoy dice «…orientada a la gestión de superficie expuesta y al pentesting
   continuo. En desarrollo a septiembre de 2026…».
   - Debe quedar igual que la de la web del producto: «Plataforma de TECDEX para gestionar
     vulnerabilidades con alcance autorizado: evaluar, entender los hallazgos y seguir su
     corrección, del hallazgo al cierre. En desarrollo a octubre de 2026.»
   - Ojo: el doc 47 P1-8 trae una variante sin «, del hallazgo al cierre». Conviene usar una
     sola.
2. Actualizar el `llms.txt` de tecdex.net. Las líneas 3, 12 y 29 describen VULNERA como
   «gestión de superficie expuesta» / «pentesting continuo» y dicen «no tiene demo pública».
   Hay que alinearlas con el `llms.txt` de VULNERA: demostraciones guiadas, en desarrollo a
   octubre de 2026.
3. Purgar la caché de LiteSpeed tras ambos cambios.
4. Tras el deploy de P1:
   - enviar de nuevo el `sitemap.xml` en Search Console y Bing;
   - pedir la indexación de las 3 rutas nuevas;
   - pasar el Rich Results Test sobre `/preguntas-frecuentes/` y la home.

---

## P0-9 · Comunicación comercial v2 · 2026-10-05

**Estado:** commits en local, **sin push**, pendiente del OK de Mario.
**Fuente:** doc 50 (texto literal), con las instrucciones del doc 51. El doc 50 reemplaza solo
las secciones que indica; el resto del doc 48 sigue vigente.
**Base:** se construye sobre P1, también local y sin push. P1 ya había creado
`/como-funciona/`, `/preguntas-frecuentes/`, `llms.txt` y el JSON-LD, así que el doc 50 §3 y §6
se aplican ahí («si ya existe»). **El push que se autorice llevará `aef6b60` + P1 + P0-9.**

**Decisión de Mario (doc 50 §0):**
- La automatización de las etapas repetibles del pentesting se comunica **en presente**,
  aunque la ejecución integrada aún no funciona de punta a punta. Mario asume ese riesgo.
- No se nombran herramientas.
- Comunicación comercial en lugar de defensiva.
- «Acceso anticipado» sustituye a «Estado del producto» en la home.
- Límites que se mantienen: no «encuentra todas», no «reemplaza cualquier pentest», no
  «garantiza», no «explotación autónoma», no cifras sin medir, no «falsos positivos».

| # | Commit | Tarea (doc 51 §3) |
|---|---|---|
| 1 | `9a7f326` | Metadata comercial: home y `/como-funciona/` (doc 50 §1) |
| 2 | `43149e5` | Hero comercial (§2.1) |
| 3 | `f88bc24` | Bloque «Qué automatiza VULNERA» (§2.2) |
| 4 | `dccd8d2` | Paso 03 «Automatizar la evaluación» (§2.3), con `lib/cycle.ts` como fuente única |
| 5 | `7e2f800` | «Acceso anticipado» en la home y «Hoja de ruta» en las subpáginas (§2.4, §3) |
| 6 | `36ede28` | Pie: bajada y uso responsable (§2.6) |
| 7 | `74f4626` | FAQ v2 (§4) |
| 8 | `6f52c50` | Formulario de demo (§5) |
| 9 | `cbd3727` | `/como-funciona/`: bloque respuesta y tabla de automatización (§3) |
| 10 | `3047259` | `llms.txt` y JSON-LD (§6) |
| 11 | (este registro) | CHANGELOG (§8) |

### Antes → después (home)

| Elemento | Antes | Después |
|---|---|---|
| `<title>` | Gestión de vulnerabilidades y remediación \| VULNERA by TECDEX | Pentesting automatizado y gestión de vulnerabilidades \| VULNERA |
| description | Plataforma de TECDEX para evaluar activos propios o autorizados… En desarrollo: agenda una demo guiada. | VULNERA automatiza las etapas repetibles del pentesting sobre los activos que autorizas… Agenda tu demo. |
| Eyebrow del hero | GESTIÓN DE VULNERABILIDADES · CHILE | PENTESTING AUTOMATIZADO · CHILE |
| Subtítulo | Evaluaciones controladas sobre dominios, aplicaciones web y APIs… | VULNERA automatiza las etapas repetibles del pentesting —reconocimiento, descubrimiento y detección—… |
| CTA del hero | Solicitar demo guiada | Agenda tu demo |
| Sellos | Solo activos propios o autorizados · Evidencia trazable · Acompañamiento TECDEX | Solo activos autorizados · Evaluaciones repetibles · Acompañamiento TECDEX |
| Tras «El problema» | — | «Qué automatiza VULNERA» (tabla de dos columnas y nota) |
| Paso 03 | Evaluar con control | Automatizar la evaluación |
| Bloque de estado | «Estado del producto» (disponible / en desarrollo) | «Acceso anticipado» + CTA «Agenda tu demo» |
| Formulario | «Obtén una primera lectura, sobre datos de ejemplo.» · «No se ejecutará ningún escaneo automáticamente» | «Agenda tu demo de VULNERA.» · «Ninguna evaluación se ejecuta sin tu autorización y aprobación explícita» |
| FAQ | 5 preguntas del doc 48 | 5 primeras de la FAQ v2 |
| Pie | «Gestión de vulnerabilidades con alcance autorizado…» · uso responsable doc 48 | «Pentesting automatizado y gestión de vulnerabilidades…» · uso responsable doc 50 |

### Verificación local (build de producción + curl; doc 51 §4)

| Comprobación | Resultado |
|---|---|
| nmap / nuclei / subfinder / zap / testssl / naabu / owasp / burp / metasploit (4 rutas + `llms.txt`) | **0** ✅ |
| «encuentra todas», «100 %», «reemplaza cualquier pentest», «explotación autónoma» | **0** ✅ |
| «falsos positivos» | **0** ✅ |
| «escaneo inmediato», «resultados en minutos», plazos (minutos, horas, días, inmediato) | **0** ✅ |
| «Estado del producto» en la home | **0** ✅ |
| «garantiza» como subcadena | 5: todas negaciones exigidas por el propio doc 50 («no garantizan» en el uso responsable §2.6, presente en las 4 rutas; «No garantiza…» en `llms.txt` §6) ⚠️ ver abajo |
| «pentesting continuo», «servicio gestionado», ahorro/reducción | 0 ✅ |
| «Vista de demostración · datos ilustrativos» | presente ✅ |
| Checkbox de activos autorizados (`required`) | presente ✅ |
| «Ninguna evaluación se ejecuta sin tu autorización» | presente ✅ |
| Home: title / description / canonical | doc 50 §1 · `https://vulnera.tecdex.net/` ✅ |
| `/como-funciona/`: title / description / canonical / bloque respuesta | doc 50 §1 · con barra · doc 50 §3 (41 palabras) ✅ |
| JSON-LD `#vulnera` | description del doc 50 §6 ✅ |
| `FAQPage` | 8 preguntas v2, idénticas al texto visible ✅ |
| Desbordamiento horizontal | ninguno a 1440 px ni a 375 px en las 4 rutas ✅ |
| GA4, cookies **aceptadas** (ID de prueba local) | `cta_demo_click` con nav (×2), hero, acceso-anticipado, demo y footer; `click_email`, `click_whatsapp` (demo, float), `click_phone`; `generate_lead {location: demo, need}` ✅ |
| GA4, cookies **rechazadas** | 0 peticiones a Google, `gtag` sin definir ✅ |

### Textos del doc 50 que no se pudieron maquetar tal cual, o que quedan por decidir

1. **«garantiza» en el barrido.** El doc 51 §4 exige 0 coincidencias, pero el propio doc 50
   pide «no garantizan» (uso responsable) y «No garantiza la ausencia de vulnerabilidades…»
   (`llms.txt`). Se maquetó el texto literal: son negaciones, no claims.
2. **Description de `/preguntas-frecuentes/`.** El doc 50 §1 la deja «sin cambios» (doc 48),
   pero menciona «si reemplaza un pentest» y «estado actual del producto», temas que la FAQ v2
   ya no trata. También es el bloque respuesta de esa página. Necesita texto nuevo aprobado.
3. **`llms.txt`.**
   - El resumen inicial sigue diciendo «En desarrollo a octubre de 2026», que no encaja con
     «En acceso anticipado»; el doc 50 §6 no lo toca.
   - Las líneas nuevas se escribieron en ASCII (sin tildes), como el resto del archivo y el
     `llms.txt` de tecdex.net.
   - «No ejecuta pruebas fuera de un alcance autorizado» se mantiene: el doc 50 no pide quitarla.
4. **«Hoja de ruta» también en la página pilar.** El doc 50 §3 la define para `/como-funciona/`.
   La pilar usaba el recuadro de estado para «marcar lo que está en desarrollo» (doc 48 §3), así
   que pasa también a «Hoja de ruta»: el recuadro de estado ya no existe.
5. **Pie.** El enlace «Estado del producto» (`/#estado`) apuntaba a un bloque que ya no existe;
   pasa a «Acceso anticipado» (`/#acceso-anticipado`).
6. **Titular de la tabla en `/como-funciona/`.** La tabla de automatización lleva como H2 el
   titular aprobado del §2.2 («Automatiza lo repetible…»).
7. **CTA de demo en las subpáginas.** Reutilizaba el titular y el botón del bloque de demo; ahora
   usa los del doc 50 §5 («Agenda tu demo de VULNERA.» / «Agenda tu demo»).
8. **Sin cambios, porque el doc 50 no los menciona:**
   - CTA de navegación y pie «Solicitar demo»;
   - eyebrow «Demo guiada»;
   - opciones del select del formulario, incluida «Revisar mi superficie expuesta»;
   - texto de la cabecera de la FAQ de la home;
   - badge «En desarrollo» de «Remediación y retest» en la miniatura (coherente con la hoja de ruta).

### Para el equipo de la app (doc 50 §8)

Coherente con la decisión «herramientas ocultas para el usuario»:
- La pantalla de login lista herramientas («subfinder · nmap · nuclei · ZAP») y menciona
  «modelo propio de falsos positivos».
- El dashboard muestra la tarjeta «Aporte por herramienta» con nombres de motores.
- El `<title>` de la app dice «Pentesting continuo por TecDex».

Recomendación: ocultar los nombres de motores en la UI de cliente y dejarlos solo en vistas
internas o de diagnóstico. Se suma a la propuesta de «modo demo» registrada en P0-8.

### `ACCIÓN_MARIO` (WordPress de tecdex.net)

- La description del `@id` `#vulnera` en tecdex.net debe pasar a la del doc 50 §6: «Plataforma
  de TECDEX que automatiza las etapas repetibles del pentesting sobre activos autorizados y
  gestiona cada hallazgo hasta su corrección. En acceso anticipado.» Sustituye a la propuesta
  de P1-8.
- Su `llms.txt` debe alinearse con el nuevo de VULNERA.
- Purgar la caché de LiteSpeed.

### Decisiones de Mario sobre P1 y P0-9 y ajustes aplicados · 2026-10-05

| # | Duda | Decisión | Commit |
|---|---|---|---|
| 1 | «garantiza» en el barrido | Aprobado tal cual: son negaciones exigidas por el doc 50 | — |
| 2 | Description y bloque respuesta de `/preguntas-frecuentes/` | Textos nuevos aprobados (description y bloque de 46 palabras) | `020270f` |
| 3 | `llms.txt` «En desarrollo a octubre de 2026» | Pasa a «En acceso anticipado (octubre de 2026)», en ASCII | `e48d734` |
| 4 | «Hoja de ruta» en `/gestion-de-vulnerabilidades/` | Aprobado | — |
| 5 | Enlace del pie a «Acceso anticipado» | Aprobado | — |
| 6 | CTA «Solicitar demo» de la navegación y el pie | Unificada en «Agenda tu demo», con los mismos `data-cta` y `location` | `ef718eb` |
| 6b | Opción del formulario «Revisar mi superficie expuesta» | Pasa a «Evaluar mis dominios y aplicaciones» | `70a90cf` |
| 7 | P1: tabla de etapas, enlaces del pie y tilde en JSON-LD | Tabla Etapa / Qué ocurre sin división usuario/plataforma; enlaces del pie y tilde aprobados | — |

**Verificación tras los ajustes** (build de producción local + curl, y eventos en el navegador
con un ID de GA4 de prueba):

| Comprobación | Resultado |
|---|---|
| Barrido del doc 51 §4 en 4 rutas + `llms.txt` | 0 en todo, salvo «garantiza» (5, negaciones aprobadas) ✅ |
| «superficie expuesta», «Solicitar demo», «En desarrollo a octubre» | 0 en todas las rutas y en `llms.txt` ✅ |
| Etiqueta de demostración, checkbox `required`, «Ninguna evaluación se ejecuta sin tu autorización» | presentes ✅ |
| `/preguntas-frecuentes/`: description nueva, bloque respuesta de 46 palabras; `FAQPage` idéntica al visible | ✅ |
| Rutas 200, `/como-funciona` → 308 con barra, `/servicio-gestionado/` y `/precios/` → 404 | ✅ |
| JSON-LD | sin `offers`/`aggregateRating`/`review`; `#vulnera` con la description del doc 50 §6 ✅ |
| Cookies aceptadas | 6 CTA «Agenda tu demo» → `cta_demo_click` (nav ×2, hero, acceso-anticipado, demo, footer); `click_email`, `click_whatsapp` (demo, float), `click_phone`; `generate_lead {need: "Evaluar mis dominios y aplicaciones"}`; sin checkbox no se emite; CTA de `/como-funciona/` → `location: como-funciona` ✅ |
| Cookies rechazadas | 0 peticiones a Google ✅ |
| Botón de navegación «Agenda tu demo» a 1100 px (ancho mínimo de la navegación de escritorio) | una línea (42 px) ✅ |
| Desbordamiento horizontal | ninguno a 1100 y 375 px en las 4 rutas ✅ |

Con estas decisiones, Mario autoriza el push conjunto: `aef6b60` + P1 + P0-9 + estos ajustes.

### Despliegue en producción de P1 + P0-9 · 2026-10-05

- **Push:** `git push origin main`, `3289e01..634c9f1`, 26 commits (`aef6b60` + P1 + P0-9 + ajustes).
- **Deploy de Vercel:**
  - Commit desplegado: `634c9f1` (`634c9f132dac55f3f0b98ca32d2ec78f05693fe1`).
  - Entorno: Production.
  - Deployment GitHub: `6867399604`.
  - Estado: `success` (READY) a las 2026-10-05T18:55:28Z.
  - URL del deploy: `https://tcdx-threatwatch-4ekwq10aw-tecdex-projects.vercel.app`.
- **Verificación contra `https://vulnera.tecdex.net/`:** curl, más el navegador para el consentimiento y el desbordamiento.

  | Comprobación | Resultado |
  |---|---|
  | `/`, `/como-funciona/`, `/gestion-de-vulnerabilidades/`, `/preguntas-frecuentes/`, `/llms.txt`, `/sitemap.xml`, `/robots.txt` | `HTTP/2 200` sin redirección ✅ |
  | `/como-funciona` (sin barra) | `308` → `/como-funciona/` ✅ |
  | `/servicio-gestionado/`, `/precios/`, `/iso-27001-control-8-8/`, `/ley-21663-vulnerabilidades/` | `404` ✅ |
  | Sitemap | 4 URLs con barra, `lastmod` 2026-10-05; `loc` == canonical ✅ |
  | Title / description / canonical de las 4 rutas | doc 50 §1 (home, `/como-funciona/`), doc 48 §0 (pilar), aprobados 2026-10-05 (FAQ) ✅ |
  | Bloques respuesta (SSR) | 41 / 55 / 46 palabras ✅ |
  | Barrido del doc 51 §4 | 0 en todo, salvo «garantiza» (5, negaciones aprobadas) ✅ |
  | «superficie expuesta», «Solicitar demo», «En desarrollo a octubre» | 0 ✅ |
  | Etiqueta de demostración, checkbox `required`, «Ninguna evaluación se ejecuta sin tu autorización» | presentes ✅ |
  | JSON-LD | `@id` de tecdex.net; `#vulnera` con la description del doc 50 §6; `FAQPage` = 8 preguntas idénticas al visible; `BreadcrumbList` con barra; sin `offers`/`aggregateRating`/`review` ✅ |
  | `llms.txt` | `text/plain; charset=utf-8`; «En acceso anticipado (octubre de 2026)» ✅ |
  | GA4 | `G-4Q39F6MMQM` en el HTML; `googletagmanager` 0 en el HTML servido ✅ |
  | Cookies rechazadas (home y `/preguntas-frecuentes/`) | 0 peticiones a Google, `gtag` sin definir, sin cookies `_ga` ✅ |
  | CTA de demo en la home | las 6 dicen «Agenda tu demo» ✅ |
  | Desbordamiento horizontal | ninguno a 1440 px ni a 375 px en las 4 rutas ✅ |
  | Fuente del body | sans-serif ✅ |

- **Eventos de conversión:** no se dispararon contra la propiedad real para no registrar leads
  falsos. Se verificaron en local con un ID de prueba (ver la tabla anterior); el código de
  medición no cambió en este deploy.

### `ACCIÓN_MARIO` tras este deploy

1. Search Console y Bing: volver a enviar `sitemap.xml` y pedir la indexación de
   `/como-funciona/`, `/gestion-de-vulnerabilidades/` y `/preguntas-frecuentes/`.
2. Rich Results Test sobre la home y `/preguntas-frecuentes/`.
3. WordPress de tecdex.net:
   - la description de `#vulnera` debe pasar a la del doc 50 §6;
   - el `llms.txt` corporativo debe alinearse;
   - purgar la caché de LiteSpeed.

---

## P0-10 · Formulario de demo integrado con Zoho CRM · 2026-10-05

**Estado:** commits en local, **sin push**. Verificado en local; la prueba con lead real se hace
en producción tras el OK de Mario, que debe ser avisado antes de enviarlo (opción b: Zoho solo
acepta envíos desde `https://vulnera.tecdex.net`).
**Fuente:** doc 52 (misión), código del formulario web de Zoho pegado por Mario y textos del doc 50 §5.

| # | Commit | Tarea |
|---|---|---|
| 1 | `51eceb6` | Página `/gracias/` y aviso al formulario desde el iframe |
| 2 | `d7ef792` | Formulario integrado con Zoho CRM vía iframe aislado |
| 3 | `8b265af` | `/gracias/` como respaldo de `generate_lead` con flag de un solo uso |
| 4 | (este registro) | CHANGELOG |

### Configuración en Zoho CRM (doc 52 §3; no se cambia desde el repo)

| Elemento | Valor |
|---|---|
| Formulario | `Formulario-VULNERA`, módulo Posibles clientes (Leads) |
| URL de ubicación permitida | `https://vulnera.tecdex.net` (solo ese dominio) |
| Al enviar | redirige a `https://vulnera.tecdex.net/gracias/` (`returnURL`) |
| Propietario | regla «Asignación Automática Posible Cliente» |
| Etiqueta | `VULNERA` |
| Fuente (oculto) | `Formulario Web` (`Lead Source`) |
| Estado (oculto) | `Nuevo` (`Lead Status`) |
| Antispam | captcha estándar de Zoho (`enterdigest`) + honeypot `aG9uZXlwb3Q` |
| Notificación | al propietario del lead: sí · al visitante: no (lo cubre `/gracias/`) |

**Mapeo de campos** (los `name` son literales del código de Zoho, en `lib/zoho.ts`):

| Web | `name` en Zoho | Obligatorio |
|---|---|---|
| Nombre | `First Name` | sí |
| Apellidos (nuevo) | `Last Name` | sí |
| Empresa | `Company` | sí |
| Correo corporativo | `Email` | sí |
| Teléfono | `Phone` | no |
| Activo o dominio a evaluar | `Website` | no |
| ¿Qué necesitas? + Contexto adicional | `Description` = «Necesidad: <opción>» + salto de línea + contexto | no |
| Código de verificación | `enterdigest` (imagen de `CaptchaServlet`) | sí |
| Ocultos | `xnQsjsdp`, `zc_gad`, `xmIwtLD`, `actionType`, `returnURL`, `Lead Source`, `Lead Status` | — |

`action`: `https://crm.zoho.com/crm/WebToLeadForm` (POST, UTF-8). El checkbox de activos
autorizados es obligatorio, se valida en el cliente y **no** se envía a Zoho.

### Diseño de la integración

- **Marcado propio.** Mismo diseño, tipografía y textos; de Zoho solo se usan `action`, los
  nombres de campo, los ocultos y el captcha. Se añaden:
  - el campo «Apellidos»;
  - el captcha con el estilo del sitio y su «Recargar código»;
  - «Al enviar aceptas nuestra Política de privacidad», enlazada a la política de TECDEX.
- **Con JavaScript** el POST va a un iframe oculto `zoho-sink` con
  `sandbox="allow-forms allow-scripts allow-same-origin"`, **sin** `allow-modals`,
  `allow-top-navigation` ni `allow-popups`.
  - Motivo: con captcha incorrecto, Zoho responde con una página que ejecuta
    `alert("Invalid CAPTCHA code…")` y `history.back()` (comprobado con curl, sin crear leads).
  - El sandbox bloquea el diálogo en inglés e impide que esa página mueva la ventana principal.
  - El iframe se precarga con `/form-sink.html` (noindex) y se recrea tras cada intento sin
    confirmar, para no dejar entradas en el historial del visitante.
- **Confirmación.** Zoho redirige el iframe a `/gracias/` (mismo origen). El formulario lo
  detecta leyendo la ruta del iframe y, además, `/gracias/` envía `postMessage`, validando el
  origen y la fuente.
  - **Sin confirmación a los 3 s:** «No pudimos confirmar el envío. Revisa el código de
    verificación e inténtalo de nuevo; si persiste, escríbenos por WhatsApp.» (con enlace).
    Se recarga y vacía el captcha y se reactiva el botón.
  - **El éxito gana hasta los 20 s:** se oculta el aviso, se dispara `generate_lead` y se
    navega a `/gracias/`.
  - **A los 20 s sin confirmación:** se descarta el flag.
- **`generate_lead`.** Solo cuando Zoho aceptó el lead, una vez, con un flag de un solo uso en
  `sessionStorage`.
  - Lo dispara la página del formulario.
  - `/gracias/` como ventana principal solo lo dispara si encuentra el flag (respaldo) y lo borra.
  - Recargas, visitas directas y envíos sin JS no cuentan.
  - Se elimina el disparo anterior en el evento `submit`.
- **Dentro del iframe** no se cargan GA4 ni el banner de cookies (sin page_view fantasma).
- **Sin JavaScript:** el `<form>` servido no tiene `target`; es un POST normal y Zoho redirige
  a `/gracias/`. Con captcha incorrecto, en ese caso extremo se vería el `alert` de Zoho.
- **Seguridad.**
  - El sitio no tiene CSP ni `X-Frame-Options` (solo HSTS): no hace falta abrir excepciones.
  - Sin `mailto:` en el formulario; el correo de contacto queda como enlace aparte.

### Excluido del código de Zoho (aprobado por Mario)

- **Script `WebFormAnalyticsServeServlet`** (analítica de formularios de Zoho) y la variable
  `_wFa_ajax_will_be_replaced`.
  - **Consecuencia: el embudo del formulario en Zoho no contará VULNERA; esa medición la cubre GA4.**
- **Iframe `captchaFrame`:** no lleva `target` ni lo usa ningún script.
- **Scripts de validación con `alert()`** y los estilos de Zoho: los reemplazan la validación
  y el diseño del sitio.

### Verificación local (antes del push)

| # | Comprobación (doc 52 §5) | Resultado |
|---|---|---|
| 2 | HTML servido | 0 `mailto:` dentro de `<form>`; `action` HTTPS de Zoho; sin `target` (POST normal sin JS) ✅ |
| 3 | Validación del cliente | vacío: 6 errores en línea; correo inválido: «Ingresa un correo válido.»; sin checkbox: error; en ningún caso se envía ni se crea el flag ✅ |
| 4 | Captcha incorrecto (POST real a Zoho, sin lead) | aviso a los 3,3 s; captcha recargado y vacío; botón reactivado; 0 `generate_lead`; URL principal sin cambios ✅ |
| — | Sandbox | iframe de prueba con los mismos permisos: `alert()` vuelve en 0 ms sin diálogo; `history.back()` no mueve la ventana principal ✅ |
| — | Datos enviados (evento `formdata`) | los 16 campos de Zoho; `Description` = «Necesidad: … \n contexto»; honeypot vacío ✅ |
| — | Reintento | iframe recreado y reenvío correcto ✅ |
| 5 | Éxito con 302 (servidor local que imita a Zoho) | sin aviso; `generate_lead` ×1 con `need`; navega a `/gracias/`; `/gracias/` no lo repite; flag consumido ✅ |
| — | «El éxito siempre gana» (página intermedia que redirige a los 5 s) | aviso a los 3,2 s → se oculta → `generate_lead` ×1 → `/gracias/` ✅ |
| 7 | `/gracias/` recargada o directa sin flag | 0 `generate_lead` ✅; con flag de respaldo: ×1 y lo borra ✅ |
| 9 | Escritorio 1440 px y móvil 375 px | sin desbordamiento; captcha legible a 200 px; aviso y errores visibles ✅ |
| 10 | Barrido del doc 51 §4 | sin cambios: 0, salvo «garantiza» ×5 (negaciones aprobadas) ✅ |
| — | `/gracias/` y `/form-sink.html` | `noindex`; fuera del sitemap y de `llms.txt` ✅ |

**Pendiente en producción** (tras el OK de Mario, avisándole antes del lead de prueba):
1. Chrome sin el aviso «formulario no seguro» y con autocompletado.
2. Envío correcto con el lead de prueba (Nombre «Prueba», Apellidos «VULNERA P0-10», Empresa
   «TECDEX QA», correo de TECDEX): navega a `/gracias/` sin salir del dominio y `generate_lead` ×1.
3. En Zoho CRM: lead con etiqueta `VULNERA`, fuente `Formulario Web`, estado `Nuevo` y
   `Description` con «Necesidad: …».
4. Captcha incorrecto y envío sin JS en el dominio real.
5. Confirmar cómo responde Zoho cuando el envío es correcto (302 o página intermedia).

### Mejoras posteriores (doc 52 §7, no ahora)

- Correo automático de confirmación al visitante: requiere una regla de respuesta en Zoho con
  texto de marca aprobado.
- reCAPTCHA en lugar del captcha estándar: requiere registrar `vulnera.tecdex.net` en la
  consola de reCAPTCHA y que Mario cargue las claves en Zoho.

### Despliegue en producción de P0-10 · 2026-10-05

- **Push:** `git push origin main`, `634c9f1..927c49d` (`ecf0764` + P0-10), autorizado por Mario.
- **Deploy de Vercel:**
  - Commit desplegado: `927c49d` (`927c49de97ff764275ec7acb70880d884a8375d3`).
  - Entorno: Production.
  - Deployment GitHub: `6870661243`.
  - Estado: `success` (READY) a las 2026-10-05T22:19:28Z.
- **Verificación con curl contra `https://vulnera.tecdex.net/`:**
  - todas las rutas responden 200;
  - `/gracias/` va con `noindex` y fuera del sitemap;
  - `/form-sink.html` responde 200;
  - el formulario tiene 0 `mailto:`, el `action` `https://crm.zoho.com/crm/WebToLeadForm`, ningún `target` servido y los 16 `name` de Zoho;
  - el iframe lleva `sandbox="allow-forms allow-scripts allow-same-origin"`;
  - el barrido del doc 51 no cambia.
- **Aviso «formulario no seguro»:** no apareció en Chrome al enfocar «Nombre». Se cumplen las condiciones: contexto seguro, `action` HTTPS y 0 formularios inseguros. El desplegable nativo de autocompletado no siempre se ve en las capturas; queda confirmado por condiciones.
- **Lead de prueba:**
  - Mario confirmó en el doc 53 que el primer lead real entró en Zoho.
  - El registro instrumentado en el panel del navegador **no capturó el envío**: el panel estaba en la home y sin registro; el envío se hizo fuera de esa pestaña o la pestaña se recreó.
  - Por eso **no hay datos medidos** de si Zoho respondió con 302 o con una página intermedia, ni del número de `generate_lead`.
  - Se medirá en la prueba real de P0-11 con el mismo registro.
- **Envío sin JS con captcha incorrecto:** pendiente; se hará junto con la prueba de P0-11.

---

## P0-11 · Atribución de origen en cada lead (Zoho CRM) · 2026-10-05

**Estado:** commits en local, **sin push**; resultado mostrado a Mario antes del push.
**Fuente:** doc 53. **Motivo:** el primer lead real entró con los campos de origen vacíos
(antes los rellenaba el script de analítica de Zoho, excluido en P0-10).

| # | Commit | Tarea |
|---|---|---|
| 1 | `84a39d5` | Módulo de atribución de origen: primer y último clic (`lib/attribution.ts`, `AttributionCapture`) |
| 2 | `fe7acfc` | Los 14 campos de atribución en el formulario de Zoho |
| 3 | (este registro) | CHANGELOG |

### Campos en Zoho (doc 53 §2; integración GA Connector, configurada en Zoho)

| Campo en Zoho | `name` | Qué se envía |
|---|---|---|
| First Click Source | `LEADCF13` | Fuente de la primera visita |
| First Click Medium | `LEADCF14` | Medio de la primera visita |
| First Click Campaign | `LEADCF17` | Campaña de la primera visita |
| First Click Landing Page | `LEADCF19` | Página de entrada de la primera visita |
| First Click Referrer | `LEADCF15` | Dominio de referencia de la primera visita |
| Last Click Source | `LEADCF5` | Fuente de la visita actual |
| Last Click Medium | `LEADCF6` | Medio de la visita actual |
| Last Click Campaign | `LEADCF9` | Campaña de la visita actual |
| Last Click Term | `LEADCF8` | `utm_term` de la visita actual |
| Last Click Content | `LEADCF10` | `utm_content` de la visita actual |
| Last Click Landing Page | `LEADCF11` | Página de entrada de la visita actual |
| Last Click Referrer | `LEADCF7` | Dominio de referencia de la visita actual |
| GA Client ID | `LEADCF20` | Client ID de GA4 (solo con consentimiento) |
| GCLID (GA Connector) | `LEADCF31` | `gclid` si viene en la URL |

### Reglas de clasificación (doc 53 §3)

- **Con UTM:** `source`, `medium` y `campaign` salen de `utm_source`, `utm_medium` y `utm_campaign`, más `term` y `content`.
- **Con `gclid` y sin UTM:** `google` / `cpc`.
- **Sin UTM**, se deduce del referrer:

  | Referrer | source | medium |
  |---|---|---|
  | google.\*, bing.com, duckduckgo.com, yahoo.\*, ecosia.org | `google`, `bing`, `duckduckgo`, `yahoo`, `ecosia` | `organic` |
  | chatgpt.com, chat.openai.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai | `chatgpt`, `perplexity`, `gemini`, `copilot`, `claude` | `ai-referral` |
  | linkedin.com / lnkd.in, facebook.com / fb.com / m.facebook.com, instagram.com / l.instagram.com, t.co / x.com | `linkedin`, `facebook`, `instagram`, `x` | `social` |
  | tecdex.net, isos.tecdex.net, store.tecdex.net | ese dominio | `internal-referral` |
  | otro dominio externo | el dominio | `referral` |
  | sin referrer (o el propio sitio) | `(direct)` | `(none)` |

  Los asistentes de IA se evalúan antes que los buscadores, para que gemini.google.com no cuente como google.
- **Último clic:**
  - es la visita actual, guardada en `sessionStorage`;
  - se calcula al entrar y solo se reemplaza si llega una URL con UTM nuevos;
  - la navegación interna no lo pisa.
- **Primer clic:**
  - se guarda en `localStorage` 90 días y no se sobrescribe;
  - **solo con consentimiento de analítica**;
  - si se acepta a mitad de sesión, se persiste en ese momento el primer clic de la sesión;
  - si se rechaza, se borra;
  - sin consentimiento, el primer clic se envía igual al último clic.
- **Landing page:** solo la ruta más los `utm_*`. Ningún otro parámetro de la URL.
- **Referrer:** solo el dominio.
- **GA Client ID:** `gtag('get', '<ID GA4>', 'client_id')` solo con consentimiento; sin él, vacío.
- **Límites:** cada valor se recorta a 255 caracteres; se descartan los que parecen correo o teléfono.
- **Sin JavaScript:** los 14 campos van vacíos (aceptado).
- **Lo visible no cambia:** el texto de la home es idéntico al de P0-10.
- **Simulación de referrer para pruebas** (`?__test_referrer=`): solo en desarrollo; no existe en el bundle de producción (comprobado con grep).

### Verificación local (doc 53 §5; `formdata` capturado y envío cancelado, sin crear leads)

| # | Entrada | Primer clic (source / medium / campaign · landing · referrer) | Último clic | GA Client ID | Resultado |
|---|---|---|---|---|---|
| 1 | `/?utm_source=linkedin&utm_medium=social&utm_campaign=vulnera-lanzamiento` | linkedin / social / vulnera-lanzamiento · `/` + UTM | igual | presente | ✅ |
| 2 | referrer `https://www.google.com/` | google / organic · `/` · `www.google.com` | igual | presente | ✅ |
| 3 | referrer `https://chatgpt.com/` | chatgpt / ai-referral · `/` · `chatgpt.com` | igual | presente | ✅ |
| 4 | sin referrer | (direct) / (none) · `/` | igual | presente | ✅ |
| 5 | visita 1 con UTM, visita 2 directa (consentimiento **aceptado**) | linkedin / social / vulnera-lanzamiento | (direct) / (none) · `/` | presente | ✅ |
| 6 | mismo caso, consentimiento **rechazado** | (direct) / (none) = último clic | (direct) / (none) | **vacío** | ✅ nada de atribución en `localStorage` |
| 7 | `/?email=x@y.com&utm_source=test` | test · landing `/?utm_source=test` | igual | presente | ✅ el correo no aparece en ningún campo |
| 8 | barrido del doc 51 | — | — | — | ✅ sin cambios (0; «garantiza» ×5, negaciones aprobadas) |

**Comprobaciones extra:**

| Caso | Resultado |
|---|---|
| `/?gclid=…` sin UTM | google / cpc; `LEADCF31` = gclid; landing `/` (sin gclid) ✅ |
| Entrada en `/como-funciona/` con UTM y navegación interna a `/` | último clic sigue en linkedin; landing `/como-funciona/` + UTM ✅ |
| Consentimiento aceptado a mitad de sesión y luego rechazado | al aceptar se guarda whatsapp / messaging / vulnera-202610; al rechazar se borra ✅ |

En todos los envíos salieron los 16 campos anteriores más los 14 de atribución.

**Pendiente en producción** (tras el OK de Mario; él resuelve el captcha):
1. Lead real desde `https://vulnera.tecdex.net/?utm_source=prueba&utm_medium=qa&utm_campaign=p0-11`.
   Comprobar en Zoho los 14 campos y medir la respuesta de Zoho (302 o página intermedia) y el
   número de `generate_lead`, con el registro instrumentado.
2. Envío sin JS con captcha incorrecto (pendiente de P0-10).

### Convención de UTM para el equipo de contenidos (doc 53 §6)

| Canal | utm_source | utm_medium | utm_campaign |
|---|---|---|---|
| LinkedIn orgánico | linkedin | social | `<tema>-<aaaamm>` |
| Instagram / Facebook orgánico | instagram / facebook | social | `<tema>-<aaaamm>` |
| WhatsApp (mensajes y estados) | whatsapp | messaging | `<tema>-<aaaamm>` |
| Correo | email | email | `<tema>-<aaaamm>` |
| Enlace desde tecdex.net / isos | tecdex / isos | internal-referral | `<sección>` |

Todo en minúsculas y con guiones, sin tildes ni espacios. Ejemplo:
`https://vulnera.tecdex.net/?utm_source=linkedin&utm_medium=social&utm_campaign=automatizacion-202610`
