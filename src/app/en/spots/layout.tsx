// src/app/en/spots/layout.tsx
import type { ReactNode } from "react";
import SpotListJsonLd from "@/components/SpotListJsonLd";
import LanguageSwitch from "@/components/LanguageSwitch";
import { SPOT_META_EN, type SpotMeta } from "./data";

export default function SpotsLayout({ children }: { children: ReactNode }) {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fukuoka-guide.vercel.app";

  // Record<string, SpotMeta> なので s は SpotMeta と推論される
  const items = (Object.entries(SPOT_META_EN) as Array<[string, SpotMeta]>).map(
    ([slug, s], i) => ({
      position: i + 1,
      name: s.title,
      url: `${site}/en/spots/${slug}`,
      image: s.image
        ? `${site}/images/spots/${s.image}`
        : `${site}/images/spots/hero.jpg`,
    })
  );

  return (
    <html lang="en">
      <body>
        <SpotListJsonLd items={items} />

        {/* style は LanguageSwitch ではなく div 側に持たせる */}
        <div
          style={{
            position: "fixed",
            right: 16,
            top: 16,
            padding: "6px 10px",
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fff",
            zIndex: 50,
          }}
        >
          <LanguageSwitch />
        </div>

        {children}
      </body>
    </html>
  );
}
