import Link from "next/link";
import { SPOT_META_EN } from "./data";

export const dynamic = "force-static";

export default function Page() {
  const entries = Object.entries(SPOT_META_EN);

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>
        Spots
      </h1>
      <ul>
        {entries.map(([slug, meta]) => (
          <li key={slug} style={{ marginBottom: 8 }}>
            <Link href={`/en/spots/${slug}`}>
              {(meta as any).title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
