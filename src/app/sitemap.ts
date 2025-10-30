import type { MetadataRoute } from "next";
import { spots as jaSpots } from "./ja/spots/data";
import { spots as enSpots } from "./en/spots/data";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";

type WithSlug = { slug: string }; // ← 最低限 slug だけ使う

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ja/en をまとめて slug 重複排除（型差を WithSlug で吸収）
  const slugs = Array.from(
    new Set(
      ([...jaSpots, ...enSpots] as WithSlug[]).map((s) => s.slug)
    )
  );

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
