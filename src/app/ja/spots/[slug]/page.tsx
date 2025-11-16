// === src/app/ja/spots/[slug]/page.tsx ===
export const runtime = 'nodejs';
export const dynamic = 'error';
export const dynamicParams = false;

import { notFound } from 'next/navigation';
import { spots } from '../data';

type SpotMeta = { slug: string; title?: string; name?: string };

function toMeta(x: unknown): SpotMeta | null {
  if (typeof x !== 'object' || x === null) return null;
  const o = x as Record<string, unknown>;
  const slug = typeof o.slug === 'string' ? o.slug.trim() : '';
  if (!slug) return null;
  const title = typeof o.title === 'string' ? o.title : undefined;
  const name  = typeof o.name  === 'string' ? o.name  : undefined;
  return { slug, title, name };
}

function normalizeToArray(v: unknown): unknown[] {
  if (Array.isArray(v)) return v;
  if (v && typeof v === 'object') return Object.values(v as Record<string, unknown>);
  return [];
}

const SPOTS: SpotMeta[] =
  normalizeToArray(spots).map(toMeta).filter(Boolean) as SpotMeta[];

export async function generateStaticParams() {
  return SPOTS.map((s) => ({ slug: s.slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const s = SPOTS.find((x) => x.slug === params.slug);
  if (!s) return notFound();

  const heading = s.title ?? s.name ?? params.slug;

  return (
    <main>
      <h1>{heading}</h1>
      <p>スラッグ: {params.slug}</p>
      {/* ここに既存の JSX を戻してください（最低限のレンダラ置き） */}
    </main>
  );
}
