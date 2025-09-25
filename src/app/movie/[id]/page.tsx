import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { 
  Star, 
  Calendar, 
  Clock, 
  Play, 
  User
} from 'lucide-react'
import { movieApi } from '@/services/tmdb'
import { generateMovieMetadata, generateMovieJsonLd } from '@/lib/seo'
import { tmdbUtils } from '@/services/tmdb'
import { MovieGrid } from '@/components/ui/MovieCard'
import { WatchlistButton, ShareButton, ToastContainer } from '@/components/ui/WatchlistShare'

interface MoviePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: MoviePageProps) {
  const { id } = await params
  try {
    const movie = await movieApi.getDetails(parseInt(id))
    return generateMovieMetadata(movie)
  } catch {
    return {
      title: 'Movie Not Found - KFLIX',
      description: 'The requested movie could not be found.'
    }
  }
}

async function MovieContent({ id }: { id: number }) {
  try {
    const [movie, credits, videos, similar] = await Promise.all([
      movieApi.getDetails(id),
      movieApi.getCredits(id),
      movieApi.getVideos(id),
      movieApi.getSimilar(id, 1)
    ])

    const director = tmdbUtils.getDirector(credits.crew)

    const jsonLd = generateMovieJsonLd(movie)

    return (
      <>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="min-h-screen bg-gray-950">
          {/* Hero Section with Backdrop */}
          <div className="relative">
            {movie.backdrop_path && (
              <div className="absolute inset-0">
                <Image
                  src={tmdbUtils.getImageUrl(movie.backdrop_path, 'original')}
                  alt={movie.title}
                  fill
                  className="object-cover opacity-20"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
              </div>
            )}

            <div className="relative px-6 py-12 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {/* Poster */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="w-full max-w-sm">
                      <Image
                        src={tmdbUtils.getImageUrl(movie.poster_path, 'w500')}
                        alt={movie.title}
                        width={400}
                        height={600}
                        className="rounded-lg shadow-2xl"
                        priority
                      />
                    </div>
                  </div>

                  {/* Movie Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h1 className="text-4xl font-bold text-white sm:text-5xl">
                        {movie.title}
                      </h1>
                      {movie.release_date && (
                        <p className="text-xl text-gray-400 mt-2">
                          ({new Date(movie.release_date).getFullYear()})
                        </p>
                      )}
                    </div>

                    {/* Rating & Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{movie.vote_average.toFixed(1)}/10</span>
                        <span className="text-gray-400">({movie.vote_count.toLocaleString()} votes)</span>
                      </div>
                      
                      {movie.release_date && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5" />
                          <span>{tmdbUtils.formatDate(movie.release_date)}</span>
                        </div>
                      )}
                      
                      {movie.runtime && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5" />
                          <span>{tmdbUtils.formatRuntime(movie.runtime)}</span>
                        </div>
                      )}
                    </div>

                    {/* Genres */}
                    {movie.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {movie.genres.map((genre) => (
                          <span
                            key={genre.id}
                            className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Overview */}
                    {movie.overview && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                        <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                      </div>
                    )}

                    {/* Director */}
                    <div>
                      <span className="text-gray-400">Directed by:</span>
                      <span className="ml-2 text-white font-medium">{director}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/watch/${id}`}
                        className="flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 transition-colors"
                      >
                        <Play className="h-5 w-5" />
                        <span>Watch Now</span>
                      </Link>
                      
                      <WatchlistButton
                        item={{
                          id: movie.id,
                          type: 'movie',
                          title: movie.title,
                          poster_path: movie.poster_path,
                          backdrop_path: movie.backdrop_path,
                          vote_average: movie.vote_average,
                          release_date: movie.release_date,
                          genres: movie.genres,
                          overview: movie.overview
                        }}
                        size="md"
                      />
                      
                      <ShareButton
                        item={{
                          id: movie.id,
                          type: 'movie',
                          title: movie.title,
                          overview: movie.overview,
                          poster_path: movie.poster_path,
                          backdrop_path: movie.backdrop_path
                        }}
                        size="md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Watch Now Section */}
          <section className="px-6 py-12 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="text-center">
                <Link
                  href={`/watch/${id}`}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Watch Now
                </Link>
                <p className="mt-4 text-sm text-gray-400">
                  Stream {movie.title} with multiple sources available
                </p>
              </div>
            </div>
          </section>

          {/* Cast */}
          {credits.cast.length > 0 && (
            <section className="px-6 py-12 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <h2 className="text-2xl font-bold text-white mb-6">Cast</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {credits.cast.slice(0, 12).map((actor) => (
                    <Link
                      key={actor.id}
                      href={`/person/${actor.id}`}
                      className="group block space-y-2"
                    >
                      <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gray-800">
                        {actor.profile_path ? (
                          <Image
                            src={tmdbUtils.getImageUrl(actor.profile_path, 'w300')}
                            alt={actor.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <User className="h-12 w-12 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors">
                          {actor.name}
                        </h3>
                        <p className="text-xs text-gray-400">{actor.character}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Similar Movies */}
          {similar.results.length > 0 && (
            <section className="px-6 py-12 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <MovieGrid
                  movies={similar.results.slice(0, 12)}
                  title="More Like This"
                />
              </div>
            </section>
          )}
        </div>
      </>
    )
  } catch (error) {
    console.error('Error fetching movie:', error)
    notFound()
  }
}

function MoviePageWrapper({ id }: { id: number }) {
  return (
    <>
      <MovieContent id={id} />
      <ToastContainer />
    </>
  )
}

function MovieSkeleton() {
  return (
    <div className="min-h-screen bg-gray-950 animate-pulse">
      <div className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="w-full max-w-sm mx-auto">
              <div className="aspect-[2/3] bg-gray-800 rounded-lg" />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="h-12 bg-gray-800 rounded w-3/4" />
              <div className="h-6 bg-gray-800 rounded w-1/4" />
              <div className="flex gap-4">
                <div className="h-4 bg-gray-800 rounded w-20" />
                <div className="h-4 bg-gray-800 rounded w-24" />
                <div className="h-4 bg-gray-800 rounded w-16" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded" />
                <div className="h-4 bg-gray-800 rounded" />
                <div className="h-4 bg-gray-800 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params
  const movieId = parseInt(id)

  if (isNaN(movieId)) {
    notFound()
  }

  return (
    <Suspense fallback={<MovieSkeleton />}>
      <MoviePageWrapper id={movieId} />
    </Suspense>
  )
}