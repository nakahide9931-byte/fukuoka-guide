import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const titleMap: Record<string, string> = {
  "dazaifu-tenmangu": "太宰府天満宮",
  "nakasu-night": "中洲の夜景",
  itoshima: "糸島",
};

export default async function TwitterImage({
  params,
}: {
  params: { slug: string };
}) {
  const title = titleMap[params.slug] ?? params.slug;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0b1220",
          color: "#fff",
          padding: 48,
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.15 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, opacity: 0.9 }}>
            Fukuoka Guide（日本語）
          </div>
        </div>
        <div
          style={{
            width: 420,
            height: 236,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            opacity: 0.6,
          }}
        >
          spot
        </div>
      </div>
    ),
    { ...size }
  );
}
