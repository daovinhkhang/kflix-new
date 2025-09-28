import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Telegram Mini App optimizations */
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@telegram-apps/sdk-react'],
  },

  // Configure headers for Telegram Mini App
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Allow embedding in Telegram
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Content Security Policy for Telegram
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://web.telegram.org https://telegram.org; default-src 'self' 'unsafe-inline' 'unsafe-eval' https: wss: data: blob:;",
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Enable DNS prefetch for faster loading
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // Optimize images for mobile devices
  images: {
    domains: [
      'image.tmdb.org',
      'via.placeholder.com',
      'telegram.org',
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compress and optimize for mobile
  compress: true,

  // Disable x-powered-by header
  poweredByHeader: false,

  // Configure trailing slash behavior
  trailingSlash: false,

  // Environment variables
  env: {
    TELEGRAM_BOT_TOKEN: '8367909351:AAHNcf72bwSvOXYx4C8_sG6ovAfq_Bv2aVg',
    TELEGRAM_MINI_APP_URL: 'https://kflix.space',
  },
};

export default nextConfig;
