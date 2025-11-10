// src/components/SpotJsonLd.tsx
import React from "react";

type Props = {
  name: string;
  description?: string;
  image: string; // 絶対URL
  url: string;   // ページの絶対URL
  sameAs?: string[];
};

export default function SpotJsonLd({
  name,
  description,
  image,
  url,
  sameAs = [],
}: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    ...(description ? { description } : {}),
    image: [image],
    url,
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
