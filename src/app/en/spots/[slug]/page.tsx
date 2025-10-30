'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { spots } from '../data';

export default function SpotPage({ params }: { params: { slug: string } }) {
  const spot = useMemo(
    () => (spots as any[]).find((s) => (s as any).slug === params.slug) as any,
    [params.slug],
  );

  const title = spot?.name ?? spot?.title ?? params.slug;
  const description = spot?.description ?? '';
  const image = spot?.image ?? spot?.ogImage ?? spot?.twImage;

  if (!spot) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Not found</h1>
        <p>
          Spot <code>{params.slug}</code> was not found.
        </p>
        <p>
          <Link href="/en/spots">Back to list</Link>
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{title}</h1>

      {image ? (
        <img src={image} alt={title} style={{ maxWidth: '100%', height: 'auto' }} />
      ) : null}

      {description ? <p style={{ marginTop: 16 }}>{description}</p> : null}

      <p style={{ marginTop: 24 }}>
        <Link href="/en/spots">Back to list</Link>
      </p>
    </main>
  );
}
