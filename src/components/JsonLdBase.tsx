// src/components/JsonLdBase.tsx
'use client';

type Props = {
  siteUrl?: string;
  siteName?: string;
  logoUrl?: string;
};

export default function JsonLdBase({
  siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteName = 'Find Your Fukuoka',
  logoUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/favicon.ico`,
}: Props) {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: siteName,
  };

  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: siteUrl,
    name: siteName,
    logo: logoUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
    </>
  );
}
