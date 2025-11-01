// src/app/en/spots/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { spots } from "../data";

// ページ個別のメタ（必要に応じて追加）
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
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  const baseTitle = "Fukuoka Guide (English)";
  const fallbackDescription =
    "Discover food, culture, and nature in Kyushu’s vibrant heart.";

  const meta = SPOT_META_EN[params.slug];
  const title = meta ? `${meta.title} | ${baseTitle}` : baseTitle;
  const description = meta?.description ?? fallbackDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `/en/spots/${params.slug}`,
      languages: {
        en: `/en/spots/${params.slug}`,
        ja: `/ja/spots/${params.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/en/spots/${params.slug}`,
      images: [`/en/spots/${params.slug}/opengraph-image`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/en/spots/${params.slug}/twitter-image`],
    },
  };
}

// ★ default export（ページ本体）— これが無いとビルドに失敗します
export default function EnSpotPage({ params }: { params: { slug: string } }) {
  const s = (spots as any[]).find((x) => x.slug === params.slug) ?? null;
  if (!s) return notFound();

  const title =
    s?.name?.en ?? s?.title ?? params.slug.replace(/-/g, " ");
  const summary = s?.summary?.en ?? s?.summary ?? "";
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
