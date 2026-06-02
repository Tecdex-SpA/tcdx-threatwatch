# SEO v1 — TCDX ThreatWatch by TECDEX

## Objetivo

Preparar la landing para indexación básica, vista previa social y posterior conexión con dominio propio.

## Meta principal

**Title**

TCDX ThreatWatch by TECDEX | Pentesting continuo y gestión de superficie expuesta

**Description**

Plataforma SaaS chilena para apoyar pentesting continuo, gestión de superficie expuesta, escaneos controlados, hallazgos priorizados, evidencia técnica y reportes ejecutivos/técnicos sobre activos propios o autorizados.

## H1 recomendado

Pentesting continuo con control de alcance, autorización y reportes ejecutivos

## H2 recomendados

- El problema: exposición pública sin visibilidad continua
- Una plataforma SaaS para operar revisiones autorizadas con trazabilidad
- Cómo funciona TCDX ThreatWatch
- Motor técnico de reconocimiento, escaneo y enriquecimiento
- Para gerencia, TI, seguridad y cumplimiento
- Transparencia y uso responsable
- Programa fundador TCDX ThreatWatch
- Preguntas frecuentes

## Keywords prudentes

- pentesting continuo Chile
- gestión de superficie expuesta
- escaneo de vulnerabilidades autorizado
- reportes de ciberseguridad ejecutivos
- pentesting SaaS
- seguridad para fintech
- OWASP ZAP Chile
- Nmap Nuclei ZAP reportes
- auditoría de activos expuestos
- TECDEX ciberseguridad
- superficie de ataque externa
- gestión de vulnerabilidades Chile

## OpenGraph

**OG Title**

TCDX ThreatWatch by TECDEX — Pentesting continuo y gestión de exposición

**OG Description**

Controle scopes, valide ownership, ejecute scans autorizados y genere reportes ejecutivos/técnicos para priorizar riesgos de seguridad.

**OG Image**

Usar `/og-threatwatch.svg` o reemplazar por una imagen PNG/JPG 1200x630 cuando esté lista la versión final.

## Recomendaciones Search Console

1. Conectar dominio final.
2. Agregar propiedad en Google Search Console.
3. Verificar por DNS TXT.
4. Enviar sitemap:
   `https://DOMINIO_FINAL/sitemap.xml`
5. Solicitar indexación de la home.
6. Revisar cobertura e indexación después de 24-72 horas.

## Pendiente cuando exista dominio final

Actualizar `lib/site.ts`:

```ts
siteConfig.domain = "https://threatwatch.tecdex.cl";
```

Luego ejecutar:

```bash
npm run build
git add .
git commit -m "Configure production SEO domain"
git push origin main
```
