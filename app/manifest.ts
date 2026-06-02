import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TCDX ThreatWatch by TECDEX",
    short_name: "ThreatWatch",
    description:
      "Pentesting continuo y gestión de superficie expuesta para activos propios o autorizados.",
    start_url: "/",
    display: "standalone",
    background_color: "#06111f",
    theme_color: "#06111f",
    lang: "es-CL",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/logo-threatwatch-header.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
