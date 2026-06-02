# Patch v5 — mejoras visuales y escala tipográfica

Cambios incluidos:

- Reduce escala del H1 del hero en desktop y móvil.
- Reduce tamaño de bajada y mejora line-height.
- Reduce altura del hero y del mockup para evitar sensación de bloque sobredimensionado.
- Agrega 3 visuales SVG livianos en `public/`:
  - `visual-exposure-map.svg`
  - `visual-report-flow.svg`
  - `visual-scan-modes.svg`
- Agrega componentes visuales puntuales sin cambiar el tono comercial/legal.
- Agrega una banda de pipeline compacta en “Cómo funciona”.
- Mantiene layout v4 y SEO aplicado.

Validar localmente antes de subir:

```bash
npm run dev
npm run build
```

Si visualmente aprueba:

```bash
git add .
git commit -m "Tune hero typography and add visual assets"
git push origin main
```
