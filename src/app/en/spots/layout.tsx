import type { ReactNode } from "react";
import SpotListJsonLd from "../../../components/SpotListJsonLd";
import { spots } from "./data";

export default function SpotsLayout({ children }: { children: ReactNode }) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const items = (spots as any[]).map((s: any, i: number) => ({
    position: i + 1,
    name:
      (s?.name?.en as string) ??
      (s?.name as string) ??
      (s?.title as string) ??
      s.slug,
    url: `${site}/en/spots/${s.slug}`,
    image: s.image ? `${site}/images/spots/${s.image}` : `${site}/hero.jpg`
  }));

  return (
    <>
      <SpotListJsonLd items={items} />
      {children}
    </>
  );
}
