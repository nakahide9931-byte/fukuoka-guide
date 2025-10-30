import type { MetadataRoute } from "next";
import { spots as jaSpots } from "./ja/spots/data";
import { spots as enSpots } from "./en/spots/data";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ja/en 両方の slug を集約（重複排除）
  const slugs = Array.from(new Set([...jaSpots, ...enSpots].map((s) => s.slug)));

  const base: MetadataRoute.Sitemap = [
    { url: `${site}/`, lastModified: now },
    { url: `${site}/ja`, lastModified: now },
    { url: `${site}/en`, lastModified: now },
    { url: `${site}/ja/spots`, lastModified: now },
    { url: `${site}/en/spots`, lastModified: now }
  ];

  const detail = slugs.flatMap((slug) => [
    { url: `${site}/ja/spots/${slug}`, lastModified: now },
    { url: `${site}/en/spots/${slug}`, lastModified: now }
  ]);

  return [...base, ...detail];
}
