import type { MetadataRoute } from "next";
import { SPOT_META_EN } from "./en/spots/[slug]/data";
import { SPOT_META_JA } from "./ja/spots/[slug]/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/en",
    "/ja",
    "/en/favorites",
    "/ja/favorites",
    "/en/spots",
    "/ja/spots",
  ];

  const spotUrls = [
    ...Object.keys(SPOT_META_EN).map((slug) => `/en/spots/${slug}`),
    ...Object.keys(SPOT_META_JA).map((slug) => `/ja/spots/${slug}`),
  ];

  return [...pages, ...spotUrls].map((url) => ({
    url,
    lastModified: new Date(),
  }));
}
