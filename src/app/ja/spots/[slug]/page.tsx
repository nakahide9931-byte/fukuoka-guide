// src/app/ja/spots/[slug]/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { spots } from '../data';

export default function SpotPage({ params }: { params: { slug: string } }) {
  const spot = (spots as any[]).find((s: any) => (s as any).slug === params.slug) as any;

  const title = spot?.name ?? spot?.title ?? params.slug;
  const description = spot?.description ?? '';
  const image = spot?.image ?? spot?.ogImage ?? spot?.twImage;

  if (!spot) {
    return (
      <main style={{ padding: 24 }}>
        <h1>見つかりませんでした</h1>
        <p>
          指定されたスポット <code>{params.slug}</code> は存在しません。
        </p>
        <p>
          <Link href="/ja/spots">一覧に戻る</Link>
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>{title}</h1>

      {image ? (
        <Image
          src={image}
          alt={title}
          width={1200}
          height={675}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          priority
        />
      ) : null}

      {description ? <p style={{ marginTop: 16 }}>{description}</p> : null}

      <p style={{ marginTop: 24 }}>
        <Link href="/ja/spots">一覧に戻る</Link>
      </p>
    </main>
  );
}
