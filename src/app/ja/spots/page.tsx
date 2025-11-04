import type { Metadata } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "スポット一覧 | Fukuoka Guide";
  const description = "食・文化・自然。九州の玄関口で見つける、あなたの旅。";
  const path = "/ja/spots";

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { ja: path, en: "/en/spots" },
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
