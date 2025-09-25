import { Suspense } from 'react'
import { movieApi } from '@/services/tmdb'
import { MovieGrid } from '@/components/ui/MovieCard'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata = generateBaseMetadata(
  'Movies - KFLIX',
  'Discover and stream the latest movies. Browse popular, trending, top-rated, and upcoming films on KFLIX.'
)

async function MoviesContent() {
  try {
    // Fetch 2 pages for each category to get 40 movies instead of 20
    const [
      [popularP1, popularP2],
      [topRatedP1, topRatedP2],
      [nowPlayingP1, nowPlayingP2],
      [upcomingP1, upcomingP2]
    ] = await Promise.all([
      Promise.all([movieApi.getByCategory('popular', 1), movieApi.getByCategory('popular', 2)]),
      Promise.all([movieApi.getByCategory('top_rated', 1), movieApi.getByCategory('top_rated', 2)]),
      Promise.all([movieApi.getByCategory('now_playing', 1), movieApi.getByCategory('now_playing', 2)]),
      Promise.all([movieApi.getByCategory('upcoming', 1), movieApi.getByCategory('upcoming', 2)])
    ])

    // Combine results from both pages for each category
    const popular = { results: [...popularP1.results, ...popularP2.results] }
    const topRated = { results: [...topRatedP1.results, ...topRatedP2.results] }
    const nowPlaying = { results: [...nowPlayingP1.results, ...nowPlayingP2.results] }
    const upcoming = { results: [...upcomingP1.results, ...upcomingP2.results] }

    return (
      <div className="space-y-12 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Movies</h1>
            <p className="mt-2 text-gray-400">
              Discover the latest and greatest movies from around the world
            </p>
          </div>

          {/* Popular Movies */}
          <section>
            <MovieGrid
              movies={popular.results}
              title="Popular Movies"
            />
          </section>

          {/* Top Rated Movies */}
          <section>
            <MovieGrid
              movies={topRated.results}
              title="Top Rated Movies"
            />
          </section>

          {/* Now Playing */}
          <section>
            <MovieGrid
              movies={nowPlaying.results}
              title="Now Playing"
            />
          </section>

          {/* Upcoming */}
          <section>
            <MovieGrid
              movies={upcoming.results}
              title="Coming Soon"
            />
          </section>
        </div>
      </div>
    )
  } catch {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400">Unable to load movies. Please try again later.</p>
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
          <div className="h-10 w-48 bg-gray-800 rounded animate-pulse" />
          <div className="h-6 w-96 bg-gray-800 rounded animate-pulse mt-2" />
        </div>

        {[1, 2, 3, 4].map((section) => (
          <div key={section} className="space-y-6">
            <div className="h-8 w-64 bg-gray-800 rounded animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-gray-800 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MoviesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Suspense fallback={<LoadingSkeleton />}>
        <MoviesContent />
      </Suspense>
    </div>
  )
}