// src/app/ja/spots/[slug]/layout.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug;
  const ja = `/ja/spots/${slug}`;
  const en = `/en/spots/${slug}`;
  return {
    title: `スポット | ${slug}`,
    alternates: {
      canonical: ja,
      languages: { ja, en },
    },
    openGraph: {
      type: 'article',
      url: ja,
      title: `スポット | ${slug}`,
      siteName: 'Fukuoka Guide',
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
