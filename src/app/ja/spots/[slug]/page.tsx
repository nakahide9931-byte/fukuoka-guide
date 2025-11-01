// src/app/ja/spots/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { spots } from "../data";

// ページ個別のメタ（必要に応じて追加）
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
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  const baseTitle = "Fukuoka Guide（日本語）";
  const fallbackDescription =
    "食・文化・自然。九州の玄関口で見つける、あなたの旅。";

  const meta = SPOT_META_JA[params.slug];
  const title = meta ? `${meta.title} | ${baseTitle}` : baseTitle;
  const description = meta?.description ?? fallbackDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/ja/spots/${params.slug}`,
      languages: {
        ja: `/ja/spots/${params.slug}`,
        en: `/en/spots/${params.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/ja/spots/${params.slug}`,
      images: [`/ja/spots/${params.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/ja/spots/${params.slug}/twitter-image`],
    },
  };
}

// ★ default export（ページ本体）— これが無いとビルドに失敗します
export default function JaSpotPage({ params }: { params: { slug: string } }) {
  const s = (spots as any[]).find((x) => x.slug === params.slug) ?? null;
  if (!s) return notFound();

  const title =
    s?.name?.ja ?? s?.title ?? params.slug.replace(/-/g, " ");
  const summary = s?.summary?.ja ?? s?.summary ?? "";
  const image = (s as any)?.image as string | undefined;

  return (
    <main>
      <h1>{title}</h1>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          width={800}
          height={533}
          style={{ display: "block", borderRadius: 8 }}
        />
      ) : null}
      {summary && <p style={{ marginTop: 12 }}>{summary}</p>}
    </main>
  );
}
