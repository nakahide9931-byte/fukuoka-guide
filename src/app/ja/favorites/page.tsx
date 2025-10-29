'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Spot } from '../spots/data';
import spots from '../spots/data';

const STORAGE_KEY = 'fyf:favorites';

export default function Page() {
  const [list, setList] = useState<Spot[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const slugs = raw ? (JSON.parse(raw) as string[]) : [];
      setList((spots as Spot[]).filter((s) => slugs.includes(s.slug)));
    } catch {
      setList([]);
    }
  }, []);

  return (
    <main className="wrap">
      <h1>お気に入り</h1>
      {list.length === 0 ? (
        <p>まだありません。<Link href="/ja/spots">スポット一覧</Link>から追加してください。</p>
      ) : (
        <ul className="grid">
          {list.map((s) => {
            const img = s.image ? `/images/spots/${s.image}` : '/hero.jpg';
            return (
              <li key={s.slug} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
                <Link href={`/ja/spots/${s.slug}`} style={{ display: 'block' }}>
                  <img
                    src={img}
                    alt={s.name}
                    style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                    onError={(e) => ((e.currentTarget as HTMLImageElement).src = '/hero.jpg')}
                  />
                </Link>
                <div style={{ padding: '12px 12px 16px' }}>
                  <h3 style={{ margin: 0 }}>{s.name}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
