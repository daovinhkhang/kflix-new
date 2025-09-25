// Movie Types
export interface Movie {
  id: number
  title: string
  overview: string
  release_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  runtime?: number
  tagline?: string
  genres: Genre[]
  adult: boolean
  original_language: string
  popularity: number
}

// TV Show Types
export interface TvShow {
  id: number
  name: string
  overview: string
  first_air_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  genres: Genre[]
  number_of_seasons: number
  number_of_episodes: number
  seasons: Season[]
  adult: boolean
  original_language: string
  popularity: number
}

// Season Types
export interface Season {
  id: number
  name: string
  overview: string
  poster_path: string | null
  season_number: number
  episode_count: number
  air_date: string
  episodes?: Episode[]
}

// Episode Types
export interface Episode {
  id: number
  name: string
  overview: string
  still_path: string | null
  episode_number: number
  season_number: number
  air_date: string
  runtime: number | null
  vote_average: number
  vote_count: number
}

// Genre Types
export interface Genre {
  id: number
  name: string
}

// Cast & Crew Types
export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  known_for_department: string
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
  known_for_department: string
}

export interface Credits {
  cast: CastMember[]
  crew: CrewMember[]
}

// Person Types
export interface Person {
  id: number
  name: string
  profile_path: string | null
  known_for_department: string
  biography?: string
  birthday?: string
  deathday?: string | null
  place_of_birth?: string
  popularity: number
  known_for?: (Movie | TvShow)[]
}

// Video/Trailer Types
export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  size: number
  published_at: string
  official: boolean
}

// Search Types
export interface SearchResult {
  id: number
  media_type: 'movie' | 'tv' | 'person'
  title?: string
  name?: string
  overview?: string
  poster_path?: string | null
  backdrop_path?: string | null
  profile_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  popularity: number
}

// API Response Types
export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface TMDBError {
  status_code: number
  status_message: string
  success: boolean
}

// Streaming Source Types
export interface StreamingSource {
  name: string
  description: string
  url: string
}

// Component Props Types
export interface MovieCardProps {
  movie: Movie
  size?: 'small' | 'medium' | 'large'
}

export interface TvCardProps {
  tvShow: TvShow
  size?: 'small' | 'medium' | 'large'
}

export interface PersonCardProps {
  person: Person
  size?: 'small' | 'medium' | 'large'
}

// Navigation Types
export interface NavigationItem {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  current?: boolean
}

// SEO Types
export interface SEOProps {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title: string
    description: string
    image?: string
    type?: string
  }
  twitter?: {
    card: string
    title: string
    description: string
    image?: string
  }
  jsonLd?: Record<string, unknown>
}

// Category Types
export type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming'
export type TvCategory = 'airing_today' | 'on_the_air' | 'popular' | 'top_rated'
export type SearchType = 'movie' | 'tv' | 'person' | 'multi'

// Watchlist Types
export interface WatchlistItem {
  id: number
  type: 'movie' | 'tv'
  title: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  release_date?: string
  first_air_date?: string
  genres: Genre[]
  added_at: string
  overview: string
}

export interface WatchlistState {
  items: WatchlistItem[]
  isLoading: boolean
  error: string | null
}

// Share Types
export interface ShareOptions {
  url: string
  title: string
  description: string
  image?: string
  hashtags?: string[]
}

export interface SharePlatform {
  name: string
  icon: string
  color: string
  action: (options: ShareOptions) => void
}

// History Types
export interface WatchHistoryItem {
  id: number
  type: 'movie' | 'tv'
  title: string
  poster_path: string | null
  watched_at: string
  progress?: number // for TV episodes
  season?: number
  episode?: number
}