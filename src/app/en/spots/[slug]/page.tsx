// === src/app/en/spots/[slug]/page.tsx ===
// SSG を確実に有効化（このページは Node 実行）
export const runtime = 'nodejs';
export const dynamic = 'error';
export const dynamicParams = false;

import { notFound } from 'next/navigation';
// ★ ここがポイント：named export で読み込む
import { spots } from '../data';

// 最小限のメタ型（他ファイルに手を入れずに済む）
type SpotMeta = { slug: string; title?: string; name?: string };

// unknown を受け取り自前で整形する型ガード
function toMeta(x: unknown): SpotMeta | null {
  if (typeof x !== 'object' || x === null) return null;
  const o = x as Record<string, unknown>;

  const slug = typeof o.slug === 'string' ? o.slug.trim() : '';
  if (!slug) return null;

  const title = typeof o.title === 'string' ? o.title : undefined;
  const name  = typeof o.name  === 'string' ? o.name  : undefined;
  return { slug, title, name };
}

// 配列／レコードどちらでも配列に正規化
function normalizeToArray(v: unknown): unknown[] {
  if (Array.isArray(v)) return v;
  if (v && typeof v === 'object') return Object.values(v as Record<string, unknown>);
  return [];
}

// ここで最終的な配列に確定
const SPOTS: SpotMeta[] =
  normalizeToArray(spots).map(toMeta).filter(Boolean) as SpotMeta[];

// 事前ビルドする slug 一覧
export async function generateStaticParams() {
  return SPOTS.map((s) => ({ slug: s.slug }));
}

// 詳細ページ本体（既存の描画に差し替えてOK）
export default function Page({ params }: { params: { slug: string } }) {
  const s = SPOTS.find((x) => x.slug === params.slug);
  if (!s) return notFound();

  const heading = s.title ?? s.name ?? params.slug;

  return (
    <main>
      <h1>{heading}</h1>
      <p>slug: {params.slug}</p>
      {/* ここに既存の JSX を戻してください（最低限のレンダラ置き） */}
    </main>
  );
}
