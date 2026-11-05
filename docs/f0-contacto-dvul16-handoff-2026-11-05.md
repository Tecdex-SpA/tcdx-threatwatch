# F0 — CTA de contacto (D-VUL-16) y entrega pendiente de copy exacto

**Fecha:** 2026-11-05. **Alcance:** propuesta de PR; no se autorizó despliegue ni merge.

## Hechos y fuente
- Mario autorizó los textos comerciales de VULNERA (D-VUL-16).
- No existe **aún** la demo sintética: el CTA público debe decir **«Solicitar información»**, no «Agendar demo».
- El contenido textual aprobado de las cinco sustituciones (H1, héroe, paso 03, FAQ 8, acceso anticipado) está en el documento de coordinación `f0-textos-sitio-vulnera-2026-11-04.md`. Ese archivo **no estaba disponible** en la conexión GitHub ni entre los adjuntos recuperables de esta sesión. No se inventan sus frases exactas ni se reemplaza una redacción aprobada por una aproximación.
- Dueños operativos de los **leads**: **Leslie Muñoz y Mario**. El formulario actual envía leads a Zoho CRM (integración `lib/zoho.ts`); la asignación automática de dueños se configura del lado de Zoho y **no está verificada ni modificada por este PR**. Marketing/Integración debe comprobar asignación/alertas a ambos con un lead sintético, sin exponer correos personales ni agregarles datos a un formulario público.

## Qué cambia este PR
- CTA visible de contacto en navegación desktop/móvil/footer, home, sección de acceso anticipado, páginas de contenido, envío de formulario y página de agradecimiento.
- Remueve referencias públicas a **agendar o coordinar una demo inexistente** de las rutas tocadas; mantiene el transporte del formulario Zoho y el checkbox de consentimiento/autorización.
- Actualiza la respuesta «¿Cómo empiezo?», metadata home/FAQ y el texto de `llms.txt` para coherencia mínima del contacto.
- **No cambia** H1, explicación completa del héroe, paso 03, FAQ 8 ni la versión editorial exacta de acceso anticipado porque falta el Markdown fuente. La sección solo deja de prometer demo.
- **Compatibilidad analítica:** mantiene `#demo`, `data-cta="demo"` y `cta_demo_click` como identificadores **internos** históricos para no romper URLs, eventos GA4 y conversiones; el texto **visible** no agenda demo. Renombrar ese evento requiere decisión/migración analítica y QA adicional, no se hace silenciosamente.

## Antes de publicar (bloqueos de aceptación)
1. Incorporar palabra por palabra las cinco sustituciones aprobadas a partir del archivo fuente, registrando antes/después y revisión de marketing (H1, héroe, paso 03, FAQ 8, acceso anticipado).
2. Confirmar que el dominio Vercel conectado corresponde a este repo y rama; no asumir que actualizar GitHub equivale a desplegar `vulnera.tecdex.net`.
3. Validar que `lib/faqs.ts` siga alimentando la FAQ visible y JSON-LD con el mismo texto; revisar SEO / sitemap `lastModified`.
4. Probar envío de lead sintético a Zoho CRM desde la URL autorizada, confirmación /gracias, captcha, atribución/consentimiento y asignación real a Leslie Muñoz y Mario. **No** afirmar que el routing comercial está habilitado solo por documentarlo.
5. Validar build/lint en SHA candidato y revisión independiente de copy/SEO/analytics.
6. Sin merge ni despliegue sin autorización humana. Mantener CTA «Solicitar información» hasta que exista demo sintética demostrable y autorizada.

**Estado:** CTA preparado en rama; sustituciones exactas pendientes del documento fuente.
