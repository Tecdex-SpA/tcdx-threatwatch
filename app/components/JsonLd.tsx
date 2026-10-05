// Inserta JSON-LD en el HTML inicial. Se escapa "<" para que el contenido no pueda
// cerrar la etiqueta <script>.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
