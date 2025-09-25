import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Star, Calendar, Clock } from 'lucide-react'
import { movieApi } from '@/services/tmdb'
import { generateMovieMetadata } from '@/lib/seo'
import { tmdbUtils } from '@/services/tmdb'
import { getMovieStreamingSources } from '@/lib/constants'
import VideoPlayer from '@/components/VideoPlayer'

interface WatchPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: WatchPageProps) {
  try {
    const { id } = await params
    const movieId = parseInt(id)
    
    if (isNaN(movieId)) return { title: 'Movie Not Found' }
    
    const movie = await movieApi.getDetails(movieId)
    return generateMovieMetadata(movie)
  } catch {
    return { title: 'Movie Not Found' }
  }
}

async function WatchContent({ id }: { id: number }) {
  try {
    const [movie, credits] = await Promise.all([
      movieApi.getDetails(id),
      movieApi.getCredits(id)
    ])

    const director = tmdbUtils.getDirector(credits.crew)
    const streamingSources = getMovieStreamingSources(id)

    return (
      <div className="min-h-screen bg-gray-950">
        {/* Header with back button */}
        <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 lg:px-8">
            <Link
              href={`/movie/${id}`}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Details</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <h1 className="text-lg font-semibold text-white">{movie.title}</h1>
                {movie.release_date && (
                  <p className="text-sm text-gray-400">{new Date(movie.release_date).getFullYear()}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main Video Player */}
          <div className="flex-1">
            <VideoPlayer streamingSources={streamingSources} movieTitle={movie.title} />
          </div>

          {/* Sidebar with Movie Info */}
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-800">
            <div className="p-6 space-y-6">
              {/* Movie Poster */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                <Image
                  src={tmdbUtils.getImageUrl(movie.poster_path, 'w500')}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Movie Details */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{movie.title}</h2>
                  {movie.tagline && (
                    <p className="text-sm italic text-gray-400 mt-1">{movie.tagline}</p>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  {movie.vote_average > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                  
                  {movie.release_date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  )}
                  
                  {movie.runtime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{tmdbUtils.formatRuntime(movie.runtime)}</span>
                    </div>
                  )}
                </div>

                {movie.overview && (
                  <div>
                    <h3 className="font-semibold text-white mb-2">Overview</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{movie.overview}</p>
                  </div>
                )}

                {movie.genres && movie.genres.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-white mb-2">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-2 py-1 bg-gray-800 text-gray-300 text-sm rounded"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {director && (
                  <div>
                    <h3 className="font-semibold text-white mb-2">Director</h3>
                    <p className="text-sm text-gray-300">{director}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error loading movie:', error)
    notFound()
  }
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { id } = await params
  const movieId = parseInt(id)
  
  if (isNaN(movieId)) {
    notFound()
  }

  return (
    <div>
      <WatchContent id={movieId} />
    </div>
  )
}