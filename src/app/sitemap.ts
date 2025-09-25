import { MetadataRoute } from 'next'
import { movieApi, tvApi } from '@/services/tmdb'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://kflix.space'
  
  // Enhanced static pages with SEO-focused URLs
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/movies`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tv`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/popular`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/top-rated`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/now-playing`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upcoming`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/history`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/watchlist`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }
  ]

  try {
    // Get multiple pages of content for comprehensive sitemap
    const [
      popularMovies1, popularMovies2, popularMovies3,
      popularTvShows1, popularTvShows2, popularTvShows3,
      topRatedMovies1, topRatedMovies2,
      topRatedTvShows1, topRatedTvShows2,
      nowPlayingMovies, upcomingMovies,
      trendingMovies, trendingTvShows
    ] = await Promise.all([
      movieApi.getByCategory('popular', 1),
      movieApi.getByCategory('popular', 2),
      movieApi.getByCategory('popular', 3),
      tvApi.getByCategory('popular', 1),
      tvApi.getByCategory('popular', 2),
      tvApi.getByCategory('popular', 3),
      movieApi.getByCategory('top_rated', 1),
      movieApi.getByCategory('top_rated', 2),
      tvApi.getByCategory('top_rated', 1),
      tvApi.getByCategory('top_rated', 2),
      movieApi.getByCategory('now_playing', 1),
      movieApi.getByCategory('upcoming', 1),
      movieApi.getTrending(1),
      tvApi.getTrending(1)
    ])

    // Comprehensive movie pages (up to 500 movies for better indexing)
    const allMovies = [
      ...popularMovies1.results,
      ...popularMovies2.results,
      ...popularMovies3.results,
      ...topRatedMovies1.results,
      ...topRatedMovies2.results,
      ...nowPlayingMovies.results,
      ...upcomingMovies.results,
      ...trendingMovies.results
    ]

    const moviePages = [...new Set(allMovies.map(m => m.id))]
      .slice(0, 500)
      .map((movieId) => {
        const movie = allMovies.find(m => m.id === movieId)!
        return {
          url: `${baseUrl}/movie/${movieId}`,
          lastModified: new Date(movie.release_date || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: movie.vote_average > 7 ? 0.8 : 0.7,
        }
      })

    // Comprehensive TV show pages (up to 400 shows)
    const allTvShows = [
      ...popularTvShows1.results,
      ...popularTvShows2.results,
      ...popularTvShows3.results,
      ...topRatedTvShows1.results,
      ...topRatedTvShows2.results,
      ...trendingTvShows.results
    ]

    const tvPages = [...new Set(allTvShows.map(tv => tv.id))]
      .slice(0, 400)
      .map((tvId) => {
        const tvShow = allTvShows.find(tv => tv.id === tvId)!
        return {
          url: `${baseUrl}/tv/${tvId}`,
          lastModified: new Date(tvShow.first_air_date || Date.now()),
          changeFrequency: 'weekly' as const,
          priority: tvShow.vote_average > 7 ? 0.8 : 0.7,
        }
      })

    // Add watch pages for popular content
    const watchPages = [
      ...allMovies.slice(0, 100).map(movie => ({
        url: `${baseUrl}/watch/${movie.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
      // TV seasons for popular shows
      ...allTvShows.slice(0, 50).map(tvShow => ({
        url: `${baseUrl}/tv/${tvShow.id}/season/1`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
      }))
    ]

    return [...staticPages, ...moviePages, ...tvPages, ...watchPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages if API calls fail
    return staticPages
  }
}