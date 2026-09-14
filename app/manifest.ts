import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Micro Farms Australia",
    short_name: "Micro Farms",
    description:
      "We transform suburban backyards into thriving micro farm ecosystems — chickens, bees, gardens, and even miniature cows. Country living, right outside your door.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAF6EE",
    theme_color: "#3D2B1F",
    lang: "en-AU",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
