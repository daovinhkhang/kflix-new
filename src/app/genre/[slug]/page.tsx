import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { movieApi } from '@/services/tmdb'
import { MovieGrid } from '@/components/ui/MovieCard'
import { generateBaseMetadata } from '@/lib/seo'

// Genre mapping for metadata
const genreNames: Record<string, string> = {
  '28': 'Action',
  '12': 'Adventure',
  '16': 'Animation',
  '35': 'Comedy',
  '80': 'Crime',
  '99': 'Documentary',
  '18': 'Drama',
  '10751': 'Family',
  '14': 'Fantasy',
  '36': 'History',
  '27': 'Horror',
  '10402': 'Music',
  '9648': 'Mystery',
  '10749': 'Romance',
  '878': 'Science Fiction',
  '10770': 'TV Movie',
  '53': 'Thriller',
  '10752': 'War',
  '37': 'Western'
}

interface GenrePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: GenrePageProps) {
  const { slug } = await params
  const genreName = genreNames[slug] || 'Unknown Genre'

  return generateBaseMetadata(
    `${genreName} Movies - KFLIX`,
    `Discover the best ${genreName.toLowerCase()} movies. Browse popular and trending films in the ${genreName.toLowerCase()} genre on KFLIX.`
  )
}

async function GenreMoviesContent({ genreId, genreName }: { genreId: number; genreName: string }) {
  try {
    // Fetch 2 pages to get 40 movies instead of 20
    const [page1, page2] = await Promise.all([
      movieApi.getByGenre(genreId, 1),
      movieApi.getByGenre(genreId, 2)
    ])

    // Combine results from both pages
    const allMovies = [...page1.results, ...page2.results]

    return (
      <div className="space-y-12 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{genreName} Movies</h1>
            <p className="mt-2 text-gray-400">
              Discover the best {genreName.toLowerCase()} movies from around the world ({allMovies.length} movies)
            </p>
          </div>

          {/* Movies Grid */}
          <section>
            <MovieGrid
              movies={allMovies}
              title={`${genreName} Movies`}
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
          <p className="text-gray-400">Unable to load {genreName.toLowerCase()} movies. Please try again later.</p>
        </div>
      </div>
    )
  }
}

function LoadingSkeleton({ genreName }: { genreName: string }) {
  return (
    <div className="space-y-12 px-6 py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="h-10 w-48 bg-gray-800 rounded animate-pulse" />
          <div className="h-6 w-96 bg-gray-800 rounded animate-pulse mt-2" />
        </div>

        <div className="space-y-6">
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 40 }).map((_, i) => (
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
      </div>
    </div>
  )
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { slug } = await params
  const genreId = parseInt(slug)

  if (isNaN(genreId)) {
    notFound()
  }

  const genreName = genreNames[slug] || 'Unknown Genre'

  return (
    <div className="min-h-screen bg-gray-950">
      <Suspense fallback={<LoadingSkeleton genreName={genreName} />}>
        <GenreMoviesContent genreId={genreId} genreName={genreName} />
      </Suspense>
    </div>
  )
}