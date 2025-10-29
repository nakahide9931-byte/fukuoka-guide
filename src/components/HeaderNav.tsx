// src/components/HeaderNav.tsx
import Link from 'next/link';
import LanguageSwitch from '@/components/LanguageSwitch';

export default function HeaderNav() {
  return (
    <header
      style={{
        padding: '8px 16px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <nav style={{ display: 'flex', gap: 16 }}>
        {/* 必要に応じてメニューは調整 */}
        <Link href="/">Home</Link>
        <Link href="/ja/spots">スポット</Link>
        <Link href="/ja/favorites">お気に入り</Link>
        <Link href="/en/spots">Spots</Link>
        <Link href="/en/favorites">Favorites</Link>
      </nav>
      <LanguageSwitch />
    </header>
  );
}
