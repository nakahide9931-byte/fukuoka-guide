// src/app/ja/spots/[slug]/page.tsx
export const runtime = 'nodejs';
export const dynamic = 'error';
export const dynamicParams = false;

import { notFound } from 'next/navigation';
import * as DATA from '../data';

type SpotMeta = { slug: string; title?: string; name?: string };

function asRecord(v: unknown): Record<string, unknown> | null {
  return v !== null && typeof v === 'object' ? (v as Record<string, unknown>) : null;
}

function toMeta(x: unknown, key?: string): SpotMeta | null {
  const o = asRecord(x);
  if (!o) return null;

  const rawSlug = typeof o.slug === 'string' ? o.slug.trim() : '';
  const slug = rawSlug || (key ? key.trim() : '');
  if (!slug) return null;

  const title = typeof o.title === 'string' ? o.title : undefined;
  const name  = typeof o.name  === 'string' ? o.name  : undefined;
  return { slug, title, name };
}

function extractList(mod: unknown): SpotMeta[] {
  const m = asRecord(mod);
  const root: unknown = m?.default ?? (m?.spots ?? mod);

  if (Array.isArray(root)) {
    return (root.map((v) => toMeta(v)).filter(Boolean) as SpotMeta[]);
  }
  const rec = asRecord(root);
  if (rec) {
    return (Object.entries(rec)
      .map(([k, v]) => toMeta(v, k))
      .filter(Boolean) as SpotMeta[]);
  }
  return [];
}

const SPOTS: SpotMeta[] = extractList(DATA);

export async function generateStaticParams() {
  const slugs = SPOTS.map((s) => s.slug);
  console.log('[build][ja][slug]', slugs); // ← ビルドログで出ます
  return slugs.map((slug) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  const s = SPOTS.find((x) => x.slug === params.slug);
  if (!s) return notFound();
  const heading = s.title ?? s.name ?? params.slug;

  return (
    <main>
      {/* ここに元の JSX を戻してOK（最低限のレンダラ置いてます） */}
      <h1>{heading}</h1>
      <p>スラッグ: {params.slug}</p>
    </main>
  );
}
