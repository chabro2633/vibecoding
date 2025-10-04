import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 외부 도메인 허용 (Vercel 배포 시 필요할 수 있음)
    domains: ['raw.githubusercontent.com'],
    // 이미지 최적화 설정
    formats: ['image/webp', 'image/avif'],
    // 이미지 크기 제한
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 개발 환경에서 이미지 최적화 비활성화 (선택사항)
  ...(process.env.NODE_ENV === 'development' && {
    images: {
      unoptimized: true,
    },
  }),
};

export default nextConfig;
