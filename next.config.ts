// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 例：Unsplash を許可する
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // 使っている外部ドメインがあればここに追加
      // { protocol: 'https', hostname: 'example.com' },
    ],
  },
};

export default nextConfig;
