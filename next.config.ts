// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ build 中に ESLint エラーで止まらないようにする
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // 使う外部ドメインがあればここに追加
      // { protocol: "https", hostname: "images.unsplash.com" },
      // { protocol: "https", hostname: "example.com" },
    ],
  },
};

export default nextConfig;
