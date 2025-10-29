// src/app/en/spots/[slug]/layout.tsx
import type { Metadata } from 'next';
import React from 'react';
import { spots } from '../data';

// export const dynamicParams = false;

export function generateStaticParams() {
  return (spots as any[]).map((s) => ({ slug: String((s as any).slug) }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const spot = (spots as any[]).find((s) => (s as any).slug === params.slug) as any;
  const base = 'Fukuoka Guide';
  const title = spot ? `${spot?.name ?? spot?.title ?? params.slug} | ${base}` : base;
  const description = spot?.description ?? 'Travel guide to Fukuoka spots.';
  const ogImage = spot?.ogImage ?? spot?.image ?? '/og-default-en.png';
  const twImage = spot?.twImage ?? ogImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: twImage ? [twImage] : [],
    },
    robots: { index: true, follow: true },
  };
}

type LayoutProps = Readonly<{ children: React.ReactNode }>;
export default function SpotSlugLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
