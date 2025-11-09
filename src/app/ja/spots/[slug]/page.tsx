// src/app/ja/spots/[slug]/page.tsx
// スクショの構成に合わせて JSON-LD を自動挿入する版

import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import SpotAffiliateCtas from "@/components/SpotAffiliateCtas";
import SpotAutoJsonLd from "@/components/SpotAutoJsonLd";

const SPOT_META_JA: Record<string, { title: string; description: string; hero?: string }> = {
  "dazaifu-tenmangu": {
    title: "太宰府天満宮",
    description: "学問の神様。写真映えスポット多数。",
    hero: "/images/spots/dazaifu-tenmangu.jpg",
  },
  "nakasu-night": {
    title: "中洲の夜景",
    description: "屋台と川沿いの夜景が人気。",
    hero: "/images/spots/nakasu-night.jpg",
  },
  itoshima: {
    title: "糸島",
    description: "海カフェと海沿いドライブで話題のエリア。",
    hero: "/images/spots/itoshima.jpg",
  },
};

export async function generateMetadata(
  { params }: { params: { slug: string } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const baseTitle = "Fukuoka Guide（日本語）";
  const fallbackDescription = "食・文化・自然。九州の玄関口で見つかる、あなたの旅。";
  const found = SPOT_META_JA[params.slug];
  const title = found ? `${found.title} | ${baseTitle}` : baseTitle;
  const description = found?.description ?? fallbackDescription;
  const slug = params.slug;

  return {
    title,
    description,
    alternates: {
      canonical: `/ja/spots/${slug}`,
      languages: { ja: `/ja/spots/${slug}`, en: `/en/spots/${slug}` },
    },
    openGraph: {
      type: "article",
      url: `/ja/spots/${slug}`,
      title,
      description,
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

export default function Page({ params }: { params: { slug: string } }) {
  const m = SPOT_META_JA[params.slug];
  const title = m?.title ?? params.slug;
  const hero = m?.hero ?? "/images/spots/hero.jpg";
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";
  const Cta = SpotAffiliateCtas as any;

  return (
    <main style={{ padding: 24 }}>
      {/* パンくず JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: "Fukuoka Guide", url: `${base}/ja` },
          { name: "スポット", url: `${base}/ja/spots` },
          { name: title, url: `${base}/ja/spots/${params.slug}` },
        ]}
      />

      <h1 style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: 16 }}>
        {title}
      </h1>

      <div
        style={{
          border: "1px solid #eee",
          borderRadius: 8,
          overflow: "hidden",
          maxWidth: 960,
        }}
      >
        <Image
          src={hero}
          alt={title}
          width={1280}
          height={720}
          style={{ width: "100%", height: "auto", display: "block" }}
          priority
        />
      </div>

      {/* CTA（アフィリエイト） */}
      <div style={{ marginTop: 20 }}>
        <Cta lang="ja" slug={params.slug} title={title} />
      </div>

      {/* ▼ 3-3：TouristAttraction の JSON-LD を自動出力 */}
      <SpotAutoJsonLd nameOverride={title} image={hero} description={m?.description} />
    </main>
  );
}
