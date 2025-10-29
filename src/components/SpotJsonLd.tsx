// src/components/SpotJsonLd.tsx
'use client'
type Props = { name: string; description: string; url: string; images: string[]; area: string }

export default function SpotJsonLd({ name, description, url, images, area }: Props) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name,
    description,
    url,
    image: images,
    areaServed: area,
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
}
