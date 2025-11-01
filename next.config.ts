// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 例: 外部画像ドメインを許可したい場合はここに追加
      // { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "example.com" },
    ],
  },

  // ✅ Vercel の本番ビルド中に ESLint エラーで止めない
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
