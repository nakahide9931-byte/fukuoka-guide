// === src/app/en/spots/page.tsx ===
export const runtime = 'nodejs';
export const dynamic = 'error';

import Link from 'next/link';
import { spots } from './data';

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
function toArray(v: unknown): unknown[] {
  if (Array.isArray(v)) return v;
  if (v && typeof v === 'object') return Object.values(v as Record<string, unknown>);
  return [];
}
const LIST: SpotMeta[] = toArray(spots).map(toMeta).filter(Boolean) as SpotMeta[];

export default function Page() {
  return (
    <main>
      <h1>Spots</h1>
      <ul>
        {LIST.map(s => (
          <li key={s.slug}>
            <Link href={`/en/spots/${s.slug}`}>{s.title ?? s.name ?? s.slug}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
