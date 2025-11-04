import Link from "next/link";
import type { Metadata } from "next";
import { SPOT_META_EN, type SpotMeta } from "./[slug]/data";

export const dynamic = "force-static";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Spots | Fukuoka Guide";
  const description = "Explore popular spots in Fukuoka.";
  const url = `${site}/en/spots`;
  const ogImage = `${site}/images/spots/hero.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical: "/en/spots",
      languages: { en: "/en/spots", ja: "/ja/spots" },
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
  const entries = Object.entries(SPOT_META_EN) as [string, SpotMeta][];
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>Spots</h1>
      <ul>
        {entries.map(([slug, meta]) => (
          <li key={slug} style={{ marginBottom: 8 }}>
            <Link href={`/en/spots/${slug}`}>{meta.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
