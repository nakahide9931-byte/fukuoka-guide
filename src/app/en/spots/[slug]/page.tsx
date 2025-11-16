// src/app/en/spots/[slug]/page.tsx

// 事前ビルドのみにして未知 slug で 404 を出す
export const dynamicParams = false;

import { notFound } from 'next/navigation';
import { spots } from '../data';

// このファイル内だけで使う最小の型（他ファイルは変更不要）
type SpotMeta = { slug: string; title?: string; name?: string };

// ← ここがポイント: Record を配列に変換
const SPOTS = Object.values(spots) as SpotMeta[];

// 事前ビルドする slug 一覧を列挙
export function generateStaticParams() {
  return SPOTS.map((s) => ({ slug: s.slug }));
}

// 詳細ページ本体
export default function Page({ params }: { params: { slug: string } }) {
  const s = SPOTS.find((x) => x.slug === params.slug);
  if (!s) return notFound();

  // 既存データに title/name が無い場合も考慮
  const heading = s.title ?? s.name ?? params.slug;

  return (
    <main>
      {/* ここを既存の描画に差し替えてOK（最小限のレンダラを置いています） */}
      <h1>{heading}</h1>
      <p>slug: {params.slug}</p>
    </main>
  );
}
