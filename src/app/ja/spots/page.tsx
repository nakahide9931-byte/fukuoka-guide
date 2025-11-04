import Link from "next/link";
import type { Metadata } from "next";
import { SPOT_META_JA, type SpotMeta } from "./[slug]/data";

export const dynamic = "force-static";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "スポット | Fukuoka Guide";
  const description = "福岡の人気スポットをチェック。";
  const url = `${site}/ja/spots`;
  const ogImage = `${site}/images/spots/hero.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: "/ja/spots",
      languages: { ja: "/ja/spots", en: "/en/spots" },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Page() {
  const entries = Object.entries(SPOT_META_JA) as [string, SpotMeta][];
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>スポット</h1>
      <ul>
        {entries.map(([slug, meta]) => (
          <li key={slug} style={{ marginBottom: 8 }}>
            <Link href={`/ja/spots/${slug}`}>{meta.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
