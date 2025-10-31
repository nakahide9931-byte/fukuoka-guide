// src/app/ja/spots/[slug]/page.tsx
import type { Metadata } from "next";
import SafeImage from "../../../../components/SafeImage";
import { spots } from "../data";

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return (spots as any[]).map((s) => ({ slug: (s as any).slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = params;
  const spot = (spots as any[]).find((s) => (s as any).slug === slug) as any;

  const base = "Fukuoka Guide"; // ここを「福岡ガイド」にしてもOK
  const title = spot?.name?.ja ?? (spot?.title as string) ?? slug;
  const description = spot?.summary?.ja ?? (spot?.summary as string) ?? "";
  const og = spot?.image ? `/images/spots/${spot.image}` : "/hero.jpg";

  return {
    title: `${title} | ${base}`,
    description,
    openGraph: { title, description, url: `/ja/spots/${slug}`, images: [og] },
    twitter: { card: "summary_large_image", title, description, images: [og] },
    alternates: {
      canonical: `/ja/spots/${slug}`,
      languages: { ja: `/ja/spots/${slug}`, en: `/en/spots/${slug}` },
    },
  };
}

export default function JaSpotDetail({ params }: Params) {
  const spot = (spots as any[]).find((s) => (s as any).slug === params.slug) as any;
  if (!spot) return <main><h1>見つかりませんでした</h1></main>;

  const title =
    spot?.name?.ja ?? (spot?.name as string) ?? (spot?.title as string) ?? params.slug;
  const summary = spot?.summary?.ja ?? (spot?.summary as string) ?? "";

  return (
    <main style={{ display: "grid", gap: 16 }}>
      <h1>{title}</h1>
      <SafeImage
        src={`/images/spots/${spot.image}`}
        alt={title}
        width={1200}
        height={800}
      />
      {summary && <p style={{ color: "#444" }}>{summary}</p>}
    </main>
  );
}
