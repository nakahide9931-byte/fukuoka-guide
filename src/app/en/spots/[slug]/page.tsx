/* eslint-disable @typescript-eslint/no-explicit-any */

// SSGを強制（EdgeでもこのページはNodeで動かす）
export const runtime = 'nodejs';
export const dynamic = 'error';
export const dynamicParams = false;

import { notFound } from 'next/navigation';
import * as DATA from '../data'; // ★ default が無くてもOKにする

// 必要最小限の型
type SpotMeta = { slug: string; title?: string; name?: string };

// unknown から安全に取り出す型ガード
function toMeta(x: any): SpotMeta | null {
  if (!x || typeof x !== 'object') return null;
  const o = x as Record<string, unknown>;
  const slug = typeof o.slug === 'string' ? o.slug.trim() : '';
  if (!slug) return null;
  const title = typeof o.title === 'string' ? o.title : undefined;
  const name = typeof o.name === 'string' ? o.name : undefined;
  return { slug, title, name };
}

// default / named / record どれでも配列に正規化
function normalizeToArray(v: any): any[] {
  if (Array.isArray(v)) return v;
  if (v && typeof v === 'object') {
    if (Array.isArray(v.default)) return v.default;  // default export が配列
    if (Array.isArray(v.spots)) return v.spots;      // named export: spots
    return Object.values(v);                         // record 形式
  }
  return [];
}

// 最終的な配列に確定
const SPOTS: SpotMeta[] = normalizeToArray(DATA)
  .map(toMeta)
  .filter(Boolean) as SpotMeta[];

// SSG する slug 一覧
export async function generateStaticParams() {
  return SPOTS.map((s) => ({ slug: s.slug }));
}

// 詳細ページ本体（既存の描画に差し替えOK）
export default function Page({ params }: { params: { slug: string } }) {
  const s = SPOTS.find((x) => x.slug === params.slug);
  if (!s) return notFound();

  const heading = s.title ?? s.name ?? params.slug;

  return (
    <main>
      {/* ここを既存のJSXに置き換えてOK（最低限のレンダラを置いています） */}
      <h1>{heading}</h1>
      <p>slug: {params.slug}</p>
    </main>
  );
}
