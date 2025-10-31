// src/app/sitemap.ts
import type { MetadataRoute } from "next";
// それぞれの data から slug を取る想定です（既存のパスに合わせてください）
import { spots as spotsJa } from "@/app/ja/spots/data";
import { spots as spotsEn } from "@/app/en/spots/data";

const BASE = "https://fukuoka-guide.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: new Date() },
    { url: `${BASE}/ja`, lastModified: new Date() },
    { url: `${BASE}/en`, lastModified: new Date() },
    { url: `${BASE}/ja/spots`, lastModified: new Date() },
    { url: `${BASE}/en/spots`, lastModified: new Date() },
  ];

  const spotPages: MetadataRoute.Sitemap = [
    ...spotsJa.map((s) => ({ url: `${BASE}/ja/spots/${s.slug}`, lastModified: new Date() })),
    ...spotsEn.map((s) => ({ url: `${BASE}/en/spots/${s.slug}`, lastModified: new Date() })),
  ];

  return [...staticPages, ...spotPages];
}
