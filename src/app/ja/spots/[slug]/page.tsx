// --- SEO metadata for JA spot detail pages ---
import type { Metadata, ResolvingMetadata } from "next";

const SPOT_META_JA: Record<string, { title: string; description: string }> = {
  "dazaifu-tenmangu": {
    title: "太宰府天満宮",
    description: "梅と学問の神様。写真映えスポット多数。",
  },
  "nakasu-night": {
    title: "中洲の夜景",
    description: "屋台と川沿いの夜景が人気。",
  },
  itoshima: {
    title: "糸島",
    description: "海カフェと絶景ドライブで話題のエリア。",
  },
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  const baseTitle = "Fukuoka Guide（日本語）";
  const fallbackDescription = "食・文化・自然。九州の玄関口で見つける、あなたの旅。";

  const found = SPOT_META_JA[slug];
  const title = found ? `${found.title} | ${baseTitle}` : baseTitle;
  const description = found?.description ?? fallbackDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/ja/spots/${slug}`,
      languages: {
        ja: `/ja/spots/${slug}`,
        en: `/en/spots/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/ja/spots/${slug}`,
      images: [`/ja/spots/${slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/ja/spots/${slug}/twitter-image`],
    },
  };
}
