# F0 — CTA de contacto y cinco sustituciones literales D-VUL-16

**Fecha:** 2026-11-05. **Alcance:** propuesta de PR; no se autorizó despliegue ni merge.

## Hechos y fuente
- Mario autorizó los textos comerciales de VULNERA (D-VUL-16).
- No existe **aún** la demo sintética: el CTA público debe decir **«Solicitar información»**, no «Agendar demo».
- El documento local `f0-textos-sitio-vulnera-2026-11-04.md` no estaba disponible en GitHub, pero **el coordinador proporcionó textualmente las cinco sustituciones aprobadas D-VUL-16 en el mensaje vigente**. Se incorporaron esas cinco frases exactas a esta misma rama el 2026-11-05.
- Dueños operativos de los **leads**: **Leslie Muñoz y Mario**. El formulario actual envía leads a Zoho CRM (integración `lib/zoho.ts`); la asignación automática de dueños se configura del lado de Zoho y **no está verificada ni modificada por este PR**. Marketing/Integración debe comprobar asignación/alertas a ambos con un lead sintético, sin exponer correos personales ni agregarles datos a un formulario público.

## Qué cambia este PR
- CTA visible de contacto en navegación desktop/móvil/footer, home, sección de acceso anticipado, páginas de contenido, envío de formulario y página de agradecimiento.
- Remueve referencias públicas a **agendar o coordinar una demo inexistente** de las rutas tocadas; mantiene el transporte del formulario Zoho y el checkbox de consentimiento/autorización.
- Actualiza la respuesta «¿Cómo empiezo?», metadata home/FAQ y el texto de `llms.txt` para coherencia mínima del contacto.
- **Cinco sustituciones literales aplicadas:** (1) H1 y (2) héroe de `/` en `app/page.tsx`; (3) paso 03 en `lib/cycle.ts` (fuente compartida con `/como-funciona/`); (4) FAQ 8 en `lib/faqs.ts` (fuente para `/preguntas-frecuentes/` y JSON-LD); (5) acceso anticipado en `app/page.tsx`. Los textos exactos corresponden al mensaje D-VUL-16 del coordinador de 2026-11-05.
- **Compatibilidad analítica:** mantiene `#demo`, `data-cta="demo"` y `cta_demo_click` como identificadores **internos** históricos para no romper URLs, eventos GA4 y conversiones; el texto **visible** no agenda demo. Renombrar ese evento requiere decisión/migración analítica y QA adicional, no se hace silenciosamente.

## Antes de publicar (bloqueos de aceptación)
1. **Completado en rama:** las cinco sustituciones literales. QA debe cotejar el diff con el mensaje D-VUL-16 y revisar coherencia de otras afirmaciones heredadas (metadata/FAQ no incluidas en las cinco sustituciones) antes de publicar; no cambiar más copy sin autorización.
2. Confirmar que el dominio Vercel conectado corresponde a este repo y rama; no asumir que actualizar GitHub equivale a desplegar `vulnera.tecdex.net`.
3. Validar que `lib/faqs.ts` siga alimentando la FAQ visible y JSON-LD con el mismo texto; revisar SEO / sitemap `lastModified`.
4. Probar envío de lead sintético a Zoho CRM desde la URL autorizada, confirmación /gracias, captcha, atribución/consentimiento y asignación real a Leslie Muñoz y Mario. **No** afirmar que el routing comercial está habilitado solo por documentarlo.
5. Validar build/lint en SHA candidato y revisión independiente de copy/SEO/analytics.
6. Sin merge ni despliegue sin autorización humana. Mantener CTA «Solicitar información» hasta que exista demo sintética demostrable y autorizada.

**Estado:** CTA y cinco sustituciones exactas preparados en la rama; pendiente CI/build, revisión editorial/SEO y routing Zoho real. **PR #3 abierto y listo para QA, sin merge ni despliegue.**

## Revisión editorial residual — 2026-11-05

Revisión posterior solicitada por coordinación: el tagline del footer era la sexta afirmación heredada de cierre ya comprobado. Se cambió `siteConfig.tagline` a **«Pentesting automatizado y gestión de vulnerabilidades | TECDEX»**.

Se detectaron y corrigieron otras referencias **públicas** incompatibles con el estado en desarrollo:
- `app/page.tsx`: otra promesa de «cierre comprobado», automatización en presente y evidencia entregada como capacidad disponible. Se marcan como propuesta o desarrollo.
- `app/preguntas-frecuentes/page.tsx`, `app/owasp-top-10/page.tsx`, `app/pentesting-automatizado/page.tsx`: «Agenda tu demo» en contenido de FAQ y guías, cambiado por contacto; su descripción de producto se ajustó a **en desarrollo**.
- `app/llms.txt/route.ts`: «del hallazgo al cierre comprobado», automatización y evidencia en presente, corregidos como capacidades previstas; indica servicio no contratado.
- `app/como-funciona/page.tsx`, `app/gestion-de-vulnerabilidades/page.tsx`, `app/components/AutomationTable.tsx`: flujos, entregables y automatización descritos como previstos/no habilitados.
- `lib/faqs.ts`: otras respuestas ajenas a la FAQ 8 anticipaban disponibilidad y una garantía excesiva de «sin riesgos legales»; se corrigen. **La sustitución literal D-VUL-16 de la FAQ 8 no se modifica**.
- `lib/site.ts` y `lib/structured-data.ts`: metadata/OG y JSON-LD alineados con «en desarrollo». Fechas `lastModified` y `revised` de guías actualizadas al 2026-11-05, sin cambiar fechas de publicación.

**No confundir con promesa de demo:** `#demo`, `data-cta="demo"` y `cta_demo_click` son IDs internos de enlace/GA4 conservados por compatibilidad. La maqueta `DashboardPreview` usa el rótulo «Vista de demostración · datos ilustrativos» y datos sintéticos: no ofrece agendar demo. Los textos educativos genéricos de las guías sobre cómo comprobar una remediación **no son** afirmaciones de que VULNERA ya valide cierres.

**QA obligatoria:** cotejar que las cinco frases autorizadas D-VUL-16 permanecen idénticas; validar rutas visibles, FAQ/JSON-LD, sitemap, links de contacto, formularios y conversión. La compilación y flujo Zoho reales no se han demostrado desde esta revisión. Sin merge ni despliegue automático.

