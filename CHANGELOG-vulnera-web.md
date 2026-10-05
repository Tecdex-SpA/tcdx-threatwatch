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
