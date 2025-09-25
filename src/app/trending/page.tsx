import { Suspense } from 'react'
import { movieApi, tvApi } from '@/services/tmdb'
import { MovieGrid } from '@/components/ui/MovieCard'
import { TvGrid } from '@/components/ui/TvCard'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata = generateBaseMetadata(
  'Trending - KFLIX',
  'Discover trending movies and TV shows. Watch the most popular content that everyone is talking about on KFLIX.'
)

async function TrendingContent() {
  try {
    // Fetch 2 pages for each category to get 40 items instead of 20
    const [
      [moviesP1, moviesP2],
      [tvP1, tvP2]
    ] = await Promise.all([
      Promise.all([movieApi.getTrending(1), movieApi.getTrending(2)]),
      Promise.all([tvApi.getTrending(1), tvApi.getTrending(2)])
    ])

    // Combine results from both pages
    const trendingMovies = { results: [...moviesP1.results, ...moviesP2.results] }
    const trendingTv = { results: [...tvP1.results, ...tvP2.results] }

    return (
      <div className="space-y-12 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Trending</h1>
            <p className="mt-2 text-gray-400">
              Discover what&apos;s trending right now in movies and TV shows
            </p>
          </div>

          {/* Trending Movies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Trending Movies</h2>
            <MovieGrid movies={trendingMovies.results} />
          </section>

          {/* Trending TV Shows */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Trending TV Shows</h2>
            <TvGrid shows={trendingTv.results} />
          </section>
        </div>
      </div>
    )
  } catch {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400">Unable to load trending content. Please try again later.</p>
        </div>
      </div>
    )
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12 px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="h-8 bg-gray-700 rounded w-48 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-96"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="space-y-3 animate-pulse">
              <div className="bg-gray-700 rounded-lg aspect-[2/3]" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function TrendingPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <TrendingContent />
    </Suspense>
  )
}