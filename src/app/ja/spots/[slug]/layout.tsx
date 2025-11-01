// src/app/en/spots/[slug]/layout.tsx
import type { Metadata, ResolvingMetadata } from "next";
import React from "react";

// --- SEO metadata for EN spot detail pages ---
const SPOT_META_EN: Record<string, { title: string; description: string }> = {
  "dazaifu-tenmangu": {
    title: "Dazaifu Tenmangu Shrine",
    description: "Famous for plum blossoms.",
  },
  "nakasu-night": {
    title: "Nakasu Night",
    description: "Iconic night food stalls by the river.",
  },
  itoshima: {
    title: "Itoshima",
    description: "Coastal cafes and scenic drives.",
  },
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const baseTitle = "Fukuoka Guide (English)";
  const fallbackDescription =
    "Discover food, culture, and nature in Kyushu’s vibrant heart.";

  const found = SPOT_META_EN[slug];
  const title = found ? `${found.title} | ${baseTitle}` : baseTitle;
  const description = found?.description ?? fallbackDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/spots/${slug}`,
      languages: {
        en: `/en/spots/${slug}`,
        ja: `/ja/spots/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/en/spots/${slug}`,
      images: [`/en/spots/${slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/en/spots/${slug}/twitter-image`],
    },
  };
}

export default function EnSpotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
