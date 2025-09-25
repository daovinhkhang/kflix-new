import { Suspense } from 'react'
import { movieApi } from '@/services/tmdb'
import { MovieGrid } from '@/components/ui/MovieCard'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata = generateBaseMetadata(
  'Upcoming - KFLIX',
  'Preview upcoming movies and TV shows. Get ready for the latest releases coming soon to KFLIX.'
)

async function UpcomingContent() {
  try {
    // Fetch 2 pages to get 40 movies instead of 20
    const [page1, page2] = await Promise.all([
      movieApi.getByCategory('upcoming', 1),
      movieApi.getByCategory('upcoming', 2)
    ])

    // Combine results from both pages
    const upcomingMovies = { results: [...page1.results, ...page2.results] }

    return (
      <div className="space-y-12 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Upcoming</h1>
            <p className="mt-2 text-gray-400">
              Get a preview of upcoming movies and mark your calendar for the latest releases
            </p>
          </div>

          {/* Upcoming Movies */}
          <section>
            <MovieGrid movies={upcomingMovies.results} />
          </section>
        </div>
      </div>
    )
  } catch {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400">Unable to load upcoming movies. Please try again later.</p>
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
          {[...Array(40)].map((_, i) => (
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

export default function UpcomingPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UpcomingContent />
    </Suspense>
  )
}