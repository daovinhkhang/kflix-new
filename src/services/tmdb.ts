import axios from 'axios'
import {
  Movie,
  TvShow,
  TMDBResponse,
  Person,
  Credits,
  Video,
  SearchResult,
  Season,
  MovieCategory,
  TvCategory
} from '@/types'
import { TMDB_BASE_URL } from '@/lib/constants'

// Create axios instance with default config
const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjUzN2NiMDE3NzM2ZjRkMmQ5MTQ3ZjMwYzY5NjkyNSIsIm5iZiI6MTc1NzMzODgxMi4zMiwic3ViIjoiNjhiZWRjYmMyMzgyYTAzMzBiOWMwOGFjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5lNIhNyguan7SNhkepQHwNlpwgCHWUx7XzAU_vtNrdY'

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${TMDB_API_KEY}`
  }
})

// Generic fetch function with error handling
async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  try {
    console.log('Making request to:', `${TMDB_BASE_URL}${endpoint}`)
    const response = await tmdbApi.get<T>(endpoint)
    return response.data
  } catch (error) {
    console.error('TMDB API Error:', error)
    console.error('Error response:', (error as { response?: { data?: unknown } })?.response?.data)
    throw new Error(`Failed to fetch data from TMDB: ${error}`)
  }
}

// Movie API Functions
export const movieApi = {
  // Get trending movies
  getTrending: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    return fetchFromTMDB(`/movie/popular?language=en-US&page=${page}`)
  },

  // Get movie by category
  getByCategory: async (category: MovieCategory, page: number = 1): Promise<TMDBResponse<Movie>> => {
    return fetchFromTMDB(`/movie/${category}?language=en-US&page=${page}`)
  },

  // Get movie details
  getDetails: async (id: number): Promise<Movie> => {
    return fetchFromTMDB(`/movie/${id}?language=en-US`)
  },

  // Get movie credits (cast & crew)
  getCredits: async (id: number): Promise<Credits> => {
    return fetchFromTMDB(`/movie/${id}/credits?language=en-US`)
  },

  // Get movie videos/trailers
  getVideos: async (id: number): Promise<{ results: Video[] }> => {
    return fetchFromTMDB(`/movie/${id}/videos?language=en-US`)
  },

  // Get similar movies
  getSimilar: async (id: number, page: number = 1): Promise<TMDBResponse<Movie>> => {
    return fetchFromTMDB(`/movie/${id}/similar?language=en-US&page=${page}`)
  },

  // Get movie recommendations
  getRecommendations: async (id: number, page: number = 1): Promise<TMDBResponse<Movie>> => {
    return fetchFromTMDB(`/movie/${id}/recommendations?language=en-US&page=${page}`)
  },

  // Search movies
  search: async (query: string, page: number = 1): Promise<TMDBResponse<Movie>> => {
    return fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`)
  },

  // Discover movies with filters
  discover: async (params: Record<string, string | number> = {}): Promise<TMDBResponse<Movie>> => {
    const queryParams = new URLSearchParams({
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
      ...params
    }).toString()
    return fetchFromTMDB(`/discover/movie?${queryParams}`)
  },

  // Get movies by genre
  getByGenre: async (genreId: number, page: number = 1): Promise<TMDBResponse<Movie>> => {
    return fetchFromTMDB(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`)
  }
}

// TV Show API Functions
export const tvApi = {
  // Get trending TV shows
  getTrending: async (page: number = 1): Promise<TMDBResponse<TvShow>> => {
    return fetchFromTMDB(`/tv/popular?language=en-US&page=${page}`)
  },

  // Get TV shows by category
  getByCategory: async (category: TvCategory, page: number = 1): Promise<TMDBResponse<TvShow>> => {
    return fetchFromTMDB(`/tv/${category}?language=en-US&page=${page}`)
  },

  // Get TV show details
  getDetails: async (id: number): Promise<TvShow> => {
    return fetchFromTMDB(`/tv/${id}?language=en-US`)
  },

  // Get TV show credits
  getCredits: async (id: number): Promise<Credits> => {
    return fetchFromTMDB(`/tv/${id}/credits?language=en-US`)
  },

  // Get TV show videos/trailers
  getVideos: async (id: number): Promise<{ results: Video[] }> => {
    return fetchFromTMDB(`/tv/${id}/videos?language=en-US`)
  },

  // Get similar TV shows
  getSimilar: async (id: number, page: number = 1): Promise<TMDBResponse<TvShow>> => {
    return fetchFromTMDB(`/tv/${id}/similar?language=en-US&page=${page}`)
  },

  // Get season details with episodes
  getSeason: async (id: number, seasonNumber: number): Promise<Season> => {
    return fetchFromTMDB(`/tv/${id}/season/${seasonNumber}?language=en-US`)
  },

  // Search TV shows
  search: async (query: string, page: number = 1): Promise<TMDBResponse<TvShow>> => {
    return fetchFromTMDB(`/search/tv?query=${encodeURIComponent(query)}&language=en-US&page=${page}`)
  },

  // Discover TV shows with filters
  discover: async (params: Record<string, string | number> = {}): Promise<TMDBResponse<TvShow>> => {
    const queryParams = new URLSearchParams({
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
      ...params
    }).toString()
    return fetchFromTMDB(`/discover/tv?${queryParams}`)
  }
}

// People API Functions
export const peopleApi = {
  // Get person details
  getDetails: async (id: number): Promise<Person> => {
    return fetchFromTMDB(`/person/${id}?language=en-US`)
  },

  // Search people
  search: async (query: string, page: number = 1): Promise<TMDBResponse<Person>> => {
    return fetchFromTMDB(`/search/person?query=${encodeURIComponent(query)}&language=en-US&page=${page}`)
  },

  // Get popular people
  getPopular: async (page: number = 1): Promise<TMDBResponse<Person>> => {
    return fetchFromTMDB(`/person/popular?language=en-US&page=${page}`)
  }
}

// Multi-Search API
export const searchApi = {
  // Multi-search (movies, TV shows, people)
  multi: async (query: string, page: number = 1): Promise<TMDBResponse<SearchResult>> => {
    return fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=${page}`)
  }
}

// Anime API Functions (using discover with specific parameters)
export const animeApi = {
  // Get popular anime movies (using keyword-based discovery)
  getPopularMovies: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    return fetchFromTMDB(`/discover/movie?with_keywords=210024&sort_by=popularity.desc&page=${page}`)
  },

  // Get Japanese animation movies
  getJapaneseAnimation: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    return fetchFromTMDB(`/discover/movie?with_genres=16&with_origin_country=JP&sort_by=popularity.desc&page=${page}`)
  },

  // Get anime TV shows
  getPopularTv: async (page: number = 1): Promise<TMDBResponse<TvShow>> => {
    return fetchFromTMDB(`/discover/tv?with_genres=16&with_origin_country=JP&sort_by=popularity.desc&page=${page}`)
  }
}

// Utility functions
export const tmdbUtils = {
  // Get full image URL
  getImageUrl: (path: string | null, size: 'w300' | 'w500' | 'w780' | 'original' = 'w500'): string => {
    if (!path) return '/placeholder-image.jpg'
    return `https://image.tmdb.org/t/p/${size}${path}`
  },

  // Format release date
  formatDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  },

  // Format runtime
  formatRuntime: (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
  },

  // Get director from crew
  getDirector: (crew: Credits['crew']): string => {
    const director = crew.find(person => 
      (person.known_for_department === 'Directing' && 
       (person.job === 'Director' || person.job === 'Writer' || person.job === 'Producer')) || 
      person.job === 'Director'
    )
    return director ? director.name : 'Unknown'
  },

  // Get main trailer
  getMainTrailer: (videos: Video[]): Video | null => {
    return videos.find(video => 
      video.type === 'Trailer' && 
      video.site === 'YouTube' && 
      video.official
    ) || videos.find(video => video.type === 'Trailer' && video.site === 'YouTube') || null
  }
}