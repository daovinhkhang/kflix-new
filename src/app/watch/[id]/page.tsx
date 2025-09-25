import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Play, Star, Calendar, Clock } from 'lucide-react'
import { movieApi, tvApi } from '@/services/tmdb'
import { generateMovieMetadata, generateTvMetadata } from '@/lib/seo'
import { tmdbUtils } from '@/services/tmdb'
import { getMovieStreamingSources, getTvStreamingSources } from '@/lib/constants'
import VideoPlayer from '@/components/VideoPlayer'

interface WatchPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: WatchPageProps) {
  try {
    const { id } = await params
    const contentId = parseInt(id)

    if (isNaN(contentId)) return { title: 'Content Not Found' }

    // Try to fetch as movie first
    try {
      const movie = await movieApi.getDetails(contentId)
      return generateMovieMetadata(movie)
    } catch {
      // If movie fetch fails, try as TV show
      try {
        const tvShow = await tvApi.getDetails(contentId)
        return generateTvMetadata(tvShow)
      } catch {
        return { title: 'Content Not Found' }
      }
    }
  } catch {
    return { title: 'Content Not Found' }
  }
}

async function WatchContent({ id }: { id: number }) {
  try {
    // Try to fetch as movie first
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
    } catch {
      // If movie fetch fails, try as TV show
      const tvShow = await tvApi.getDetails(id)
      const firstSeason = tvShow.seasons?.find(season => season.season_number === 1)

      if (!firstSeason) {
        notFound()
      }

      // Get the first episode of the first season
      const seasonData = await tvApi.getSeason(id, 1)
      const firstEpisode = seasonData.episodes?.[0]

      if (!firstEpisode) {
        notFound()
      }

      const streamingSources = getTvStreamingSources(id, 1, 1)

      return (
        <div className="min-h-screen bg-gray-950">
          {/* Header with back button */}
          <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between p-4 lg:px-8">
              <Link
                href={`/tv/${id}`}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Details</span>
              </Link>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <h1 className="text-lg font-semibold text-white">{tvShow.name}</h1>
                  <p className="text-sm text-gray-400">Season 1, Episode 1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Main Video Player */}
            <div className="flex-1">
              <VideoPlayer streamingSources={streamingSources} movieTitle={`${tvShow.name} - S1E1`} />
            </div>

            {/* Sidebar with TV Show Info */}
            <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-800">
              <div className="p-6 space-y-6">
                {/* TV Show Poster */}
                <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
                  <Image
                    src={tmdbUtils.getImageUrl(tvShow.poster_path, 'w500')}
                    alt={tvShow.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Episode Details */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white">{tvShow.name}</h2>
                    <h3 className="text-lg text-primary-400 mt-1">{firstEpisode.name}</h3>
                    <p className="text-sm text-gray-400">Season 1, Episode 1</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    {firstEpisode.vote_average > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{firstEpisode.vote_average.toFixed(1)}</span>
                      </div>
                    )}

                    {firstEpisode.air_date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{tmdbUtils.formatDate(firstEpisode.air_date)}</span>
                      </div>
                    )}

                    {firstEpisode.runtime && (
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{firstEpisode.runtime}m</span>
                      </div>
                    )}
                  </div>

                  {firstEpisode.overview && (
                    <div>
                      <h3 className="font-semibold text-white mb-2">Episode Overview</h3>
                      <p className="text-sm text-gray-300 leading-relaxed">{firstEpisode.overview}</p>
                    </div>
                  )}

                  {tvShow.genres && tvShow.genres.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-white mb-2">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {tvShow.genres.map((genre) => (
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

                  {/* Season/Episode Selector */}
                  <div>
                    <h3 className="font-semibold text-white mb-2">Select Episode</h3>
                    <div className="space-y-2">
                      <select className="w-full bg-gray-800 text-white rounded px-3 py-2 text-sm">
                        <option value="1">Season 1</option>
                        {tvShow.seasons?.filter(s => s.season_number > 1).map(season => (
                          <option key={season.season_number} value={season.season_number}>
                            Season {season.season_number}
                          </option>
                        ))}
                      </select>
                      <select className="w-full bg-gray-800 text-white rounded px-3 py-2 text-sm">
                        <option value="1">Episode 1: {firstEpisode.name}</option>
                        {seasonData.episodes?.slice(1, 10).map(episode => (
                          <option key={episode.episode_number} value={episode.episode_number}>
                            Episode {episode.episode_number}: {episode.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  } catch (error) {
    console.error('Error loading content:', error)
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