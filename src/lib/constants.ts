// TMDB API Configuration
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'
export const SMALL_IMG_BASE_URL = `${TMDB_IMAGE_BASE_URL}/w500`
export const ORIGINAL_IMG_BASE_URL = `${TMDB_IMAGE_BASE_URL}/original`

// Movie Categories
export const MOVIE_CATEGORIES = [
  'now_playing',
  'popular', 
  'top_rated',
  'upcoming'
] as const

// TV Categories  
export const TV_CATEGORIES = [
  'airing_today',
  'on_the_air', 
  'popular',
  'top_rated'
] as const

// Streaming Sources
export const getMovieStreamingSources = (movieId: number) => [
  { 
    name: "Source1 (Filmu)", 
    description: "adfree", 
    url: `https://embed.filmu.fun/media/tmdb-movie-${movieId}` 
  },
  { 
    name: "Source2 (rivestream)", 
    description: "brave browser recommended", 
    url: `https://rivestream.net/embed?type=movie&id=${movieId}` 
  },
  { 
    name: "Source3 (Videasy)", 
    description: "brave browser recommended", 
    url: `https://player.videasy.net/movie/${movieId}` 
  },
  { 
    name: "Source4 (vidlink)", 
    description: "brave browser only", 
    url: `https://vidlink.pro/movie/${movieId}` 
  },
  { 
    name: "Source5 (111movies)", 
    description: "brave browser recommended", 
    url: `https://111movies.com/movie/${movieId}` 
  },
  { 
    name: "Source6 (nontongo)", 
    description: "brave browser only", 
    url: `https://www.NontonGo.win/embed/movie/${movieId}` 
  },
  { 
    name: "Source7 (pstream)", 
    description: "adfree", 
    url: `https://iframe.pstream.org/media/tmdb-movie-${movieId}` 
  }
]

export const getTvStreamingSources = (tvId: number, season: number, episode: number) => [
  { 
    name: "Source1 (Filmu)", 
    description: "adfree", 
    url: `https://embed.filmu.fun/embed/tmdb-tv-${tvId}/${season}/${episode}` 
  },
  { 
    name: "Source2 (rivestream)", 
    description: "brave browser recommended", 
    url: `https://rivestream.net/embed?type=tv&id=${tvId}&season=${season}&episode=${episode}` 
  },
  { 
    name: "Source3 (Videasy)", 
    description: "brave browser recommended", 
    url: `https://player.videasy.net/tv/${tvId}/${season}/${episode}` 
  },
  { 
    name: "Source4 (vidlink)", 
    description: "brave browser only", 
    url: `https://vidlink.pro/tv/${tvId}/${season}/${episode}` 
  },
  { 
    name: "Source5 (111movies)", 
    description: "brave browser recommended", 
    url: `https://111movies.com/tv/${tvId}/${season}/${episode}` 
  },
  { 
    name: "Source6 (nontong)", 
    description: "brave browser only", 
    url: `https://www.NontonGo.win/embed/tv/?id=${tvId}&s=${season}&e=${episode}` 
  },
  { 
    name: "Source7 (pstream)", 
    description: "adfree", 
    url: `https://iframe.pstream.org/embed/tmdb-tv-${tvId}/${season}/${episode}` 
  }
]