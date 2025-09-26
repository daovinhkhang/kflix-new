import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/']  // Chặn tất cả bot khác
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/static/'
        ]
        // Không có crawlDelay để thả bung sức mạnh
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/static/'
        ]
        // Không có crawlDelay để thả bung sức mạnh
      }
    ],
    sitemap: 'https://kflix.space/sitemap.xml',
    host: 'https://kflix.space'
  }
}