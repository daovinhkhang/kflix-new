import { Metadata } from 'next'
import { Movie, TvShow, Person } from '@/types'

const SITE_NAME = 'KFLIX'
const SITE_URL = 'https://kflix.space'
const SITE_DESCRIPTION = 'Stream and discover movies, TV shows, and entertainment content on KFLIX. Your ultimate streaming destination with the latest releases and classic favorites.'

// SEO Keywords in multiple languages
const SEO_KEYWORDS = {
  ENGLISH: [
    'free movies online', 'watch movies free', 'streaming movies', 'free tv shows', 
    'online cinema', 'movie streaming site', 'watch series online', 'free entertainment',
    'HD movies free', '4K movies', 'latest movies', 'new releases', 'blockbuster movies',
    'classic films', 'indie movies', 'documentary films', 'action movies', 'comedy films',
    'drama series', 'thriller movies', 'horror films', 'sci-fi movies', 'romance films',
    'family movies', 'animated movies', 'TV series', 'web series', 'binge watch',
    'movie marathon', 'cinema online', 'film streaming', 'video on demand', 'VOD'
  ],
  FRENCH: [
    'films gratuits en ligne', 'regarder films gratuits', 'streaming films', 'séries gratuites',
    'cinéma en ligne', 'site de streaming', 'regarder séries en ligne', 'divertissement gratuit',
    'films HD gratuits', 'films 4K', 'derniers films', 'nouvelles sorties', 'films populaires',
    'films classiques', 'films indépendants', 'documentaires', 'films d\'action', 'comédies',
    'séries dramatiques', 'films thriller', 'films d\'horreur', 'films sci-fi', 'films romantiques',
    'films familiaux', 'films d\'animation', 'séries TV', 'séries web', 'marathon de films'
  ],
  RUSSIAN: [
    'бесплатные фильмы онлайн', 'смотреть фильмы бесплатно', 'стриминг фильмов', 'бесплатные сериалы',
    'онлайн кинотеатр', 'сайт потокового видео', 'смотреть сериалы онлайн', 'бесплатные развлечения',
    'HD фильмы бесплатно', '4K фильмы', 'новые фильмы', 'новинки кино', 'популярные фильмы',
    'классические фильмы', 'независимое кино', 'документальные фильмы', 'боевики', 'комедии',
    'драматические сериалы', 'триллеры', 'фильмы ужасов', 'научная фантастика', 'романтические фильмы',
    'семейные фильмы', 'мультфильмы', 'телесериалы', 'веб-сериалы', 'киномарафон'
  ],
  CHINESE: [
    '免费在线电影', '免费观看电影', '电影流媒体', '免费电视剧',
    '在线影院', '流媒体网站', '在线观看剧集', '免费娱乐',
    '高清免费电影', '4K电影', '最新电影', '新上映', '热门电影',
    '经典电影', '独立电影', '纪录片', '动作电影', '喜剧片',
    '电视剧', '惊悚片', '恐怖片', '科幻电影', '爱情片',
    '家庭电影', '动画电影', '电视连续剧', '网络剧', '电影马拉松'
  ],
  JAPANESE: [
    '無料オンライン映画', '無料で映画を見る', '映画ストリーミング', '無料テレビ番組',
    'オンライン映画館', 'ストリーミングサイト', 'オンラインでシリーズを見る', '無料エンターテイメント',
    'HD無料映画', '4K映画', '最新映画', '新作', '人気映画',
    'クラシック映画', 'インディー映画', 'ドキュメンタリー', 'アクション映画', 'コメディ',
    'ドラマシリーズ', 'スリラー映画', 'ホラー映画', 'SF映画', 'ロマンス映画',
    'ファミリー映画', 'アニメ映画', 'テレビシリーズ', 'ウェブシリーズ', '映画マラソン'
  ],
  GERMAN: [
    'kostenlose Filme online', 'Filme kostenlos schauen', 'Film-Streaming', 'kostenlose TV-Serien',
    'Online-Kino', 'Streaming-Website', 'Serien online schauen', 'kostenlose Unterhaltung',
    'HD Filme kostenlos', '4K Filme', 'neueste Filme', 'neue Veröffentlichungen', 'beliebte Filme',
    'klassische Filme', 'Independent-Filme', 'Dokumentarfilme', 'Action-Filme', 'Komödien',
    'Drama-Serien', 'Thriller-Filme', 'Horror-Filme', 'Sci-Fi-Filme', 'Romantik-Filme',
    'Familienfilme', 'Animationsfilme', 'TV-Serien', 'Web-Serien', 'Film-Marathon'
  ],
  SPANISH: [
    'películas gratis online', 'ver películas gratis', 'streaming de películas', 'series gratuitas',
    'cine online', 'sitio de streaming', 'ver series online', 'entretenimiento gratuito',
    'películas HD gratis', 'películas 4K', 'últimas películas', 'nuevos lanzamientos', 'películas populares',
    'películas clásicas', 'películas independientes', 'documentales', 'películas de acción', 'comedias',
    'series dramáticas', 'películas thriller', 'películas de terror', 'películas sci-fi', 'películas románticas',
    'películas familiares', 'películas animadas', 'series de TV', 'series web', 'maratón de películas'
  ],
  ITALIAN: [
    'film gratuiti online', 'guardare film gratis', 'streaming film', 'serie TV gratuite',
    'cinema online', 'sito di streaming', 'guardare serie online', 'intrattenimento gratuito',
    'film HD gratuiti', 'film 4K', 'ultimi film', 'nuove uscite', 'film popolari',
    'film classici', 'film indipendenti', 'documentari', 'film d\'azione', 'commedie',
    'serie drammatiche', 'film thriller', 'film horror', 'film sci-fi', 'film romantici',
    'film per famiglie', 'film animati', 'serie TV', 'serie web', 'maratona di film'
  ],
  PORTUGUESE: [
    'filmes grátis online', 'assistir filmes grátis', 'streaming de filmes', 'séries gratuitas',
    'cinema online', 'site de streaming', 'assistir séries online', 'entretenimento gratuito',
    'filmes HD grátis', 'filmes 4K', 'últimos filmes', 'novos lançamentos', 'filmes populares',
    'filmes clássicos', 'filmes independentes', 'documentários', 'filmes de ação', 'comédias',
    'séries dramáticas', 'filmes thriller', 'filmes de terror', 'filmes sci-fi', 'filmes românticos',
    'filmes familiares', 'filmes animados', 'séries de TV', 'séries web', 'maratona de filmes'
  ],
  KOREAN: [
    '무료 온라인 영화', '무료로 영화 보기', '영화 스트리밍', '무료 TV 프로그램',
    '온라인 영화관', '스트리밍 사이트', '온라인으로 시리즈 보기', '무료 엔터테인먼트',
    'HD 무료 영화', '4K 영화', '최신 영화', '새로운 개봉작', '인기 영화',
    '클래식 영화', '독립 영화', '다큐멘터리', '액션 영화', '코미디',
    '드라마 시리즈', '스릴러 영화', '공포 영화', 'SF 영화', '로맨스 영화',
    '가족 영화', '애니메이션 영화', 'TV 시리즈', '웹 시리즈', '영화 마라톤'
  ]
}

export function generateBaseMetadata(
  title: string,
  description: string = SITE_DESCRIPTION,
  image?: string,
  url?: string
): Metadata {
  const fullTitle = title === SITE_NAME ? `${title} - Free Movies & TV Shows Online` : `${title} - Free Streaming | ${SITE_NAME}`
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const imageUrl = image || `${SITE_URL}/og-default.jpg`

  // Enhanced description with global keywords
  const enhancedDescription = `${description} | Free streaming in multiple languages: English, Français, Español, Deutsch, Русский, 中文, 日本語, 한국어, Português, Italiano | No registration required | HD & 4K quality`

  // Global keywords combining all languages
  const globalKeywords = [
    ...SEO_KEYWORDS.ENGLISH.slice(0, 15),
    ...SEO_KEYWORDS.FRENCH.slice(0, 8),
    ...SEO_KEYWORDS.SPANISH.slice(0, 8),
    ...SEO_KEYWORDS.GERMAN.slice(0, 6),
    ...SEO_KEYWORDS.RUSSIAN.slice(0, 6),
    ...SEO_KEYWORDS.CHINESE.slice(0, 6),
    ...SEO_KEYWORDS.JAPANESE.slice(0, 6),
    ...SEO_KEYWORDS.KOREAN.slice(0, 4),
    ...SEO_KEYWORDS.ITALIAN.slice(0, 4),
    ...SEO_KEYWORDS.PORTUGUESE.slice(0, 4)
  ].join(', ')

  return {
    title: fullTitle,
    description: enhancedDescription,
    keywords: globalKeywords,
    openGraph: {
      title: fullTitle,
      description: enhancedDescription,
      url: fullUrl,
      siteName: `${SITE_NAME} - Free Movies & Series Streaming`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Watch Free on KFLIX`
        }
      ],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: enhancedDescription,
      images: [imageUrl],
      site: '@kflix'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': fullUrl,
        'fr': fullUrl,
        'es': fullUrl,
        'de': fullUrl,
        'ru': fullUrl,
        'zh': fullUrl,
        'ja': fullUrl,
        'ko': fullUrl,
        'it': fullUrl,
        'pt': fullUrl
      }
    },
    other: {
      'google-site-verification': 'your-verification-code',
      'msvalidate.01': 'your-bing-verification-code',
      'yandex-verification': 'your-yandex-verification-code'
    }
  }
}

export function generateMovieMetadata(movie: Movie): Metadata {
  const title = movie.title
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : ''
  const genres = movie.genres.map(g => g.name).join(', ')
  
  // Create rich description with multiple language keywords
  const freeKeywords = [
    'Watch Free', 'Stream Online', 'Full Movie', 'HD Quality', '4K Video',
    'regarder gratuitement', 'ver gratis', 'guardare gratis', 'assistir grátis',
    'kostenlos schauen', '無料で見る', '무료 시청', '免费观看', 'смотреть бесплатно'
  ]
  
  const randomKeywords = freeKeywords.slice(0, 3).join(' • ')
  
  const description = movie.overview 
    ? `${movie.overview.substring(0, 120)}... | ${randomKeywords} | ${movie.title}${year ? ` (${year})` : ''} | ${genres} | No Registration Required`
    : `Watch ${movie.title}${year ? ` (${year})` : ''} free online in HD quality. ${randomKeywords}. ${genres}. Stream now without registration on KFLIX.`

  const image = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : movie.poster_path 
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : undefined
  const url = `/movie/${movie.id}`

  // Combine keywords from all languages
  const allKeywords = [
    ...SEO_KEYWORDS.ENGLISH.slice(0, 10),
    ...SEO_KEYWORDS.FRENCH.slice(0, 5),
    ...SEO_KEYWORDS.SPANISH.slice(0, 5),
    ...SEO_KEYWORDS.GERMAN.slice(0, 3),
    ...SEO_KEYWORDS.RUSSIAN.slice(0, 3),
    ...SEO_KEYWORDS.CHINESE.slice(0, 3),
    ...SEO_KEYWORDS.JAPANESE.slice(0, 3),
    movie.title.toLowerCase(),
    ...movie.genres.map(g => g.name.toLowerCase())
  ].join(', ')

  const metadata = generateBaseMetadata(title, description, image, url)
  
  return {
    ...metadata,
    keywords: allKeywords,
    openGraph: {
      ...metadata.openGraph,
      type: 'video.movie',
      releaseDate: movie.release_date,
      tags: [...movie.genres.map(g => g.name), 'free movie', 'watch online', 'stream free', 'HD movie']
    },
    other: {
      'movie:title': movie.title,
      'movie:release_date': movie.release_date,
      'movie:rating': movie.vote_average.toString(),
      'movie:genre': movie.genres.map(g => g.name).join(', '),
      'movie:free': 'true',
      'movie:quality': 'HD, 4K',
      'movie:language': 'Multiple Languages Available'
    }
  }
}

export function generateTvMetadata(tvShow: TvShow): Metadata {
  const title = tvShow.name
  const year = tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : ''
  const genres = tvShow.genres.map(g => g.name).join(', ')
  
  // Create rich description with multiple language keywords for TV shows
  const freeSeriesKeywords = [
    'Watch Free Series', 'Stream TV Shows', 'Full Episodes', 'HD Streaming', 'Binge Watch',
    'séries gratuites', 'ver series gratis', 'serie TV gratuite', 'séries grátis',
    'kostenlose Serien', 'テレビ番組無料', '무료 드라마', '免费电视剧', 'бесплатные сериалы'
  ]
  
  const randomKeywords = freeSeriesKeywords.slice(0, 3).join(' • ')
  
  const description = tvShow.overview 
    ? `${tvShow.overview.substring(0, 120)}... | ${randomKeywords} | ${tvShow.name}${year ? ` (${year})` : ''} | ${tvShow.number_of_seasons} Season${tvShow.number_of_seasons !== 1 ? 's' : ''} | ${tvShow.number_of_episodes} Episodes | ${genres} | Watch All Episodes Free`
    : `Watch ${tvShow.name}${year ? ` (${year})` : ''} free online. ${randomKeywords}. ${tvShow.number_of_seasons} Season${tvShow.number_of_seasons !== 1 ? 's' : ''} with ${tvShow.number_of_episodes} episodes. ${genres}. Stream all episodes without registration on KFLIX.`

  const image = tvShow.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path}`
    : tvShow.poster_path 
    ? `https://image.tmdb.org/t/p/w780${tvShow.poster_path}`
    : undefined
  const url = `/tv/${tvShow.id}`

  // TV-specific keywords in multiple languages
  const allTvKeywords = [
    ...SEO_KEYWORDS.ENGLISH.filter(k => k.includes('series') || k.includes('TV') || k.includes('show')),
    ...SEO_KEYWORDS.FRENCH.filter(k => k.includes('séries') || k.includes('TV')),
    ...SEO_KEYWORDS.SPANISH.filter(k => k.includes('series') || k.includes('TV')),
    ...SEO_KEYWORDS.GERMAN.filter(k => k.includes('Serien') || k.includes('TV')),
    ...SEO_KEYWORDS.RUSSIAN.filter(k => k.includes('сериал')),
    ...SEO_KEYWORDS.CHINESE.filter(k => k.includes('电视剧')),
    ...SEO_KEYWORDS.JAPANESE.filter(k => k.includes('テレビ')),
    tvShow.name.toLowerCase(),
    ...tvShow.genres.map(g => g.name.toLowerCase()),
    'free tv series', 'watch episodes online', 'binge watch free'
  ].join(', ')

  const metadata = generateBaseMetadata(title, description, image, url)
  
  return {
    ...metadata,
    keywords: allTvKeywords,
    openGraph: {
      ...metadata.openGraph,
      type: 'video.episode',
      tags: [...tvShow.genres.map(g => g.name), 'free tv show', 'watch online', 'stream free', 'HD series', 'full episodes']
    },
    other: {
      'tv:title': tvShow.name,
      'tv:first_air_date': tvShow.first_air_date,
      'tv:rating': tvShow.vote_average.toString(),
      'tv:genre': tvShow.genres.map(g => g.name).join(', '),
      'tv:seasons': tvShow.number_of_seasons.toString(),
      'tv:episodes': tvShow.number_of_episodes.toString(),
      'tv:free': 'true',
      'tv:quality': 'HD, 4K',
      'tv:language': 'Multiple Languages Available',
      'tv:type': 'Full Episodes Available'
    }
  }
}

export function generatePersonMetadata(person: Person): Metadata {
  const title = person.name
  const description = person.biography 
    ? `${person.biography.substring(0, 160)}...`
    : `Learn more about ${person.name}, ${person.known_for_department} known for their work in entertainment.`
  const image = person.profile_path 
    ? `https://image.tmdb.org/t/p/w780${person.profile_path}`
    : undefined
  const url = `/person/${person.id}`

  return generateBaseMetadata(title, description, image, url)
}

// JSON-LD Schema Functions
export function generateMovieJsonLd(movie: Movie) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    description: movie.overview,
    image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
    datePublished: movie.release_date,
    genre: movie.genres.map(g => g.name),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: movie.vote_average,
      ratingCount: movie.vote_count,
      bestRating: 10,
      worstRating: 0
    },
    duration: movie.runtime ? `PT${movie.runtime}M` : undefined,
    url: `${SITE_URL}/movie/${movie.id}`,
    sameAs: `https://www.themoviedb.org/movie/${movie.id}`
  }
}

export function generateTvShowJsonLd(tvShow: TvShow) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    name: tvShow.name,
    description: tvShow.overview,
    image: tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : undefined,
    datePublished: tvShow.first_air_date,
    genre: tvShow.genres.map(g => g.name),
    numberOfSeasons: tvShow.number_of_seasons,
    numberOfEpisodes: tvShow.number_of_episodes,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tvShow.vote_average,
      ratingCount: tvShow.vote_count,
      bestRating: 10,
      worstRating: 0
    },
    url: `${SITE_URL}/tv/${tvShow.id}`,
    sameAs: `https://www.themoviedb.org/tv/${tvShow.id}`
  }
}

export function generatePersonJsonLd(person: Person) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    description: person.biography,
    image: person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : undefined,
    jobTitle: person.known_for_department,
    birthDate: person.birthday,
    deathDate: person.deathday,
    birthPlace: person.place_of_birth,
    url: `${SITE_URL}/person/${person.id}`,
    sameAs: `https://www.themoviedb.org/person/${person.id}`
  }
}

export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`
    }))
  }
}

// Function to get random SEO keywords for variety
export function getRandomSeoKeywords(type: 'movie' | 'tv' | 'general' = 'general', count: number = 5): string[] {
  const movieKeywords = [
    ...SEO_KEYWORDS.ENGLISH.filter(k => k.includes('movie') || k.includes('film')),
    ...SEO_KEYWORDS.FRENCH.filter(k => k.includes('film')),
    ...SEO_KEYWORDS.SPANISH.filter(k => k.includes('película')),
    ...SEO_KEYWORDS.GERMAN.filter(k => k.includes('Film')),
    ...SEO_KEYWORDS.RUSSIAN.filter(k => k.includes('фильм')),
    ...SEO_KEYWORDS.CHINESE.filter(k => k.includes('电影')),
    ...SEO_KEYWORDS.JAPANESE.filter(k => k.includes('映画'))
  ]

  const tvKeywords = [
    ...SEO_KEYWORDS.ENGLISH.filter(k => k.includes('series') || k.includes('TV') || k.includes('show')),
    ...SEO_KEYWORDS.FRENCH.filter(k => k.includes('série')),
    ...SEO_KEYWORDS.SPANISH.filter(k => k.includes('serie')),
    ...SEO_KEYWORDS.GERMAN.filter(k => k.includes('Serie')),
    ...SEO_KEYWORDS.RUSSIAN.filter(k => k.includes('сериал')),
    ...SEO_KEYWORDS.CHINESE.filter(k => k.includes('电视剧')),
    ...SEO_KEYWORDS.JAPANESE.filter(k => k.includes('シリーズ'))
  ]

  const allKeywords = [
    ...SEO_KEYWORDS.ENGLISH,
    ...SEO_KEYWORDS.FRENCH,
    ...SEO_KEYWORDS.SPANISH,
    ...SEO_KEYWORDS.GERMAN,
    ...SEO_KEYWORDS.RUSSIAN,
    ...SEO_KEYWORDS.CHINESE,
    ...SEO_KEYWORDS.JAPANESE,
    ...SEO_KEYWORDS.KOREAN,
    ...SEO_KEYWORDS.ITALIAN,
    ...SEO_KEYWORDS.PORTUGUESE
  ]

  let keywords: string[]
  
  switch (type) {
    case 'movie':
      keywords = movieKeywords
      break
    case 'tv':
      keywords = tvKeywords
      break
    default:
      keywords = allKeywords
      break
  }

  // Shuffle and return random keywords
  return keywords
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
}

// Enhanced Schema.org for Organization
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Free streaming platform for movies and TV shows in multiple languages',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Français', 'Español', 'Deutsch', 'Русский', '中文', '日本語', '한국어', 'Português', 'Italiano']
    },
    sameAs: [
      'https://twitter.com/kflix',
      'https://facebook.com/kflix',
      'https://instagram.com/kflix'
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

// Website Schema with enhanced multilingual support
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Free movies and TV shows streaming platform with multilingual support',
    inLanguage: ['en', 'fr', 'es', 'de', 'ru', 'zh', 'ja', 'ko', 'it', 'pt'],
    audience: {
      '@type': 'Audience',
      geographicArea: 'Worldwide'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}