'use client';

import { useEffect, useState } from 'react';

type Props = {
  slug: string;
  className?: string;
  label?: { save: string; remove: string };
};

export default function FavoriteButton({
  slug,
  className,
  label = { save: '★ Save', remove: '★ Saved' },
}: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const arr: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      setSaved(arr.includes(slug));
    } catch {}
  }, [slug]);

  const toggle = () => {
    try {
      const arr: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      const set = new Set(arr);
      if (set.has(slug)) set.delete(slug); else set.add(slug);
      localStorage.setItem('favorites', JSON.stringify([...set]));
      setSaved((v) => !v);
    } catch {}
  };

  return (
    <button type="button" className={className} onClick={toggle} aria-pressed={saved}>
      {saved ? label.remove : label.save}
    </button>
  );
}
