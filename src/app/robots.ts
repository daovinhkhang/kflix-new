import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/static/'
        ],
        crawlDelay: 1
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
        ],
        crawlDelay: 0
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
        ],
        crawlDelay: 1
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/static/'
        ],
        crawlDelay: 2
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/static/'
        ],
        crawlDelay: 3
      }
    ],
    sitemap: 'https://kflix.space/sitemap.xml',
    host: 'https://kflix.space'
  }
}