import { Suspense } from 'react'
import { tvApi } from '@/services/tmdb'
import { TvGrid } from '@/components/ui/TvCard'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata = generateBaseMetadata(
  'TV Shows - KFLIX',
  'Discover and stream the latest TV shows and series. Browse popular, trending, top-rated shows on KFLIX.'
)

async function TvContent() {
  try {
    // Fetch 2 pages for each category to get 40 shows instead of 20
    const [
      [popularP1, popularP2],
      [topRatedP1, topRatedP2],
      [airingTodayP1, airingTodayP2],
      [onTheAirP1, onTheAirP2]
    ] = await Promise.all([
      Promise.all([tvApi.getByCategory('popular', 1), tvApi.getByCategory('popular', 2)]),
      Promise.all([tvApi.getByCategory('top_rated', 1), tvApi.getByCategory('top_rated', 2)]),
      Promise.all([tvApi.getByCategory('airing_today', 1), tvApi.getByCategory('airing_today', 2)]),
      Promise.all([tvApi.getByCategory('on_the_air', 1), tvApi.getByCategory('on_the_air', 2)])
    ])

    // Combine results from both pages for each category
    const popular = { results: [...popularP1.results, ...popularP2.results] }
    const topRated = { results: [...topRatedP1.results, ...topRatedP2.results] }
    const airingToday = { results: [...airingTodayP1.results, ...airingTodayP2.results] }
    const onTheAir = { results: [...onTheAirP1.results, ...onTheAirP2.results] }

    return (
      <div className="space-y-12 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">TV Shows</h1>
            <p className="mt-2 text-gray-400">
              Discover the latest and greatest TV shows and series from around the world
            </p>
          </div>

          {/* Popular TV Shows */}
          <section>
            <TvGrid
              shows={popular.results}
            />
          </section>

          {/* Top Rated TV Shows */}
          <section>
            <TvGrid
              shows={topRated.results}
            />
          </section>

          {/* Airing Today */}
          <section>
            <TvGrid
              shows={airingToday.results}
            />
          </section>

          {/* On The Air */}
          <section>
            <TvGrid
              shows={onTheAir.results}
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
          <p className="text-gray-400">Unable to load TV shows. Please try again later.</p>
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

export default function TvPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Suspense fallback={<LoadingSkeleton />}>
        <TvContent />
      </Suspense>
    </div>
  )
}