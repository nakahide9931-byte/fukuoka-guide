// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Vercel などの本番ビルドでは ESLint をスキップ
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
