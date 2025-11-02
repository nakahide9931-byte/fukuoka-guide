// src/components/FavoriteButton.tsx
'use client';

import * as React from 'react';
import { gaEvent } from '@/lib/ga';

type Props = {
  /** 一意なスラッグ（/ja/spots/[slug] の slug を想定） */
  slug: string;
  /** 画面表示用のタイトル（イベントに載せる用・任意） */
  title?: string;
  /** ボタンの見た目を調整したい場合 */
  className?: string;
};

const STORAGE_KEY = 'fav:spots';

function readMap(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

function writeMap(map: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // no-op
  }
}

export default function FavoriteButton({ slug, title, className }: Props) {
  const [on, setOn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const map = readMap();
    setOn(!!map[slug]);
  }, [slug]);

  const toggle = React.useCallback(() => {
    const map = readMap();
    const next = !on;
    map[slug] = next;
    if (!next) delete map[slug];
    writeMap(map);
    setOn(next);

    const lang = typeof document !== 'undefined'
      ? document.documentElement.lang || ''
      : '';

    gaEvent(next ? 'favorite_add' : 'favorite_remove', {
      slug,
      title: title || '',
      language: lang,
      page: typeof location !== 'undefined' ? location.pathname : '',
    });
  }, [on, slug, title]);

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={toggle}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        borderRadius: 8,
        border: '1px solid #ddd',
        background: on ? '#fff7d1' : '#fff',
        cursor: 'pointer',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 18 }}>
        {on ? '★' : '☆'}
      </span>
      <span>{on ? 'お気に入り済み' : 'お気に入りに追加'}</span>
    </button>
  );
}
