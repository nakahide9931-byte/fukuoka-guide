// 既存の import はそのまま残す
import type { Metadata } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Spots | Fukuoka Guide";
  const description = "Discover food, culture, and nature in Kyushu's vibrant heart.";
  const path = "/en/spots";

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: path, ja: "/ja/spots" },
    },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      images: [`${SITE}/hero.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE}/hero.jpg`],
    },
  };
}
