// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { spots as jaSpots } from "./ja/spots/data";
import { spots as enSpots } from "./en/spots/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const urls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/en`, lastModified: now },
    { url: `${SITE_URL}/ja`, lastModified: now },
  ];

  for (const s of jaSpots as any[]) {
    urls.push({ url: `${SITE_URL}/ja/spots/${s.slug}`, lastModified: now });
  }
  for (const s of enSpots as any[]) {
    urls.push({ url: `${SITE_URL}/en/spots/${s.slug}`, lastModified: now });
  }

  return urls;
}
