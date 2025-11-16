// src/app/en/spots/[slug]/page.tsx
export const runtime = 'nodejs';           // SSGを有効に保つ
export const dynamic = 'error';
export const dynamicParams = false;

import { notFound } from 'next/navigation';
import * as DATA from '../data';           // named/default どちらでも受け取れるように

// --- 型（no-explicit-any を避けるため unknown ベースで実装）---
type SpotMeta = { slug: string; title?: string; name?: string };

function asRecord(v: unknown): Record<string, unknown> | null {
  return v !== null && typeof v === 'object' ? (v as Record<string, unknown>) : null;
}

// 値そのものが slug を持たない場合は key(= オブジェクトのキー)を slug に補完
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

// モジュールから “spots” 配列/レコード を確実に取り出し → SpotMeta[]
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

// --- ここが SSG で使われます ---
export async function generateStaticParams() {
  const slugs = SPOTS.map((s) => s.slug);
  console.log('[build][en][slug]', slugs); // ← Vercel の Build Logs で確認できます
  return slugs.map((slug) => ({ slug }));
}

// --- 詳細ページ本体（既存の描画に差し替えてOK）---
export default function Page({ params }: { params: { slug: string } }) {
  const s = SPOTS.find((x) => x.slug === params.slug);
  if (!s) return notFound();
  const heading = s.title ?? s.name ?? params.slug;

  return (
    <main>
      {/* ここにあなたの元の JSX を戻してOK */}
      <h1>{heading}</h1>
      <p>slug: {params.slug}</p>
    </main>
  );
}
