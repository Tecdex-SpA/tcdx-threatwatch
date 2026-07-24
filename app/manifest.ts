import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VULNERA by TECDEX",
    short_name: "VULNERA",
    description:
      "Pentesting continuo y gestión de superficie expuesta para activos propios o autorizados.",
    start_url: "/",
    display: "standalone",
    background_color: "#2B3944",
    theme_color: "#2B3944",
    lang: "es-CL",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
