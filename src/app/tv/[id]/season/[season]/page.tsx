import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { 
  Star, 
  Calendar, 
  Clock, 
  Play, 
  ArrowLeft,
  Tv
} from 'lucide-react'
import { tvApi } from '@/services/tmdb'
import { tmdbUtils } from '@/services/tmdb'
import { getTvStreamingSources } from '@/lib/constants'

interface SeasonPageProps {
  params: Promise<{
    id: string
    season: string
  }>
}

export async function generateMetadata({ params }: SeasonPageProps) {
  const { id, season } = await params
  try {
    const [tvShow, seasonData] = await Promise.all([
      tvApi.getDetails(parseInt(id)),
      tvApi.getSeason(parseInt(id), parseInt(season))
    ])

    return {
      title: `${tvShow.name} - ${seasonData.name} - KFLIX`,
      description: seasonData.overview || `Watch ${seasonData.name} of ${tvShow.name} online. Episodes, cast, and streaming information.`
    }
  } catch {
    return {
      title: 'Season Not Found - KFLIX',
      description: 'The requested season could not be found.'
    }
  }
}

async function SeasonContent({ tvId, seasonNumber }: { tvId: number, seasonNumber: number }) {
  try {
    const [tvShow, season] = await Promise.all([
      tvApi.getDetails(tvId),
      tvApi.getSeason(tvId, seasonNumber)
    ])

    return (
      <div className="min-h-screen bg-gray-950">
        {/* Header */}
        <div className="px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center space-x-4 mb-8">
              <Link
                href={`/tv/${tvId}`}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to {tvShow.name}</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Season Poster */}
              <div className="flex justify-center lg:justify-start">
                <div className="w-full max-w-xs">
                  {season.poster_path ? (
                    <Image
                      src={tmdbUtils.getImageUrl(season.poster_path, 'w500')}
                      alt={season.name}
                      width={300}
                      height={450}
                      className="rounded-lg shadow-xl"
                    />
                  ) : (
                    <div className="aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
                      <Tv className="h-16 w-16 text-gray-600" />
                    </div>
                  )}
                </div>
              </div>

              {/* Season Info */}
              <div className="lg:col-span-3 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-white sm:text-4xl">
                    {tvShow.name}
                  </h1>
                  <h2 className="text-xl text-primary-400 mt-2">{season.name}</h2>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                  {season.air_date && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>{new Date(season.air_date).getFullYear()}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5" />
                    <span>{season.episode_count} episode{season.episode_count !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                {season.overview && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                    <p className="text-gray-300 leading-relaxed">{season.overview}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Episodes Grid - Plex Style */}
        {season.episodes && season.episodes.length > 0 && (
          <section className="px-6 py-8 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Episodes</h2>
                <div className="text-sm text-gray-400">
                  {season.episodes.length} episode{season.episodes.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              {/* Episode Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {season.episodes.map((episode) => (
                  <Link
                    key={episode.id}
                    href={`/tv/${tvId}/watch?season=${seasonNumber}&episode=${episode.episode_number}`}
                    className="group block bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 hover:scale-105"
                  >
                    {/* Episode Thumbnail */}
                    <div className="aspect-video relative bg-gray-700">
                      {episode.still_path ? (
                        <Image
                          src={tmdbUtils.getImageUrl(episode.still_path, 'w300')}
                          alt={episode.name}
                          fill
                          className="object-cover group-hover:opacity-80 transition-opacity"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Play className="h-8 w-8 text-gray-600" />
                        </div>
                      )}
                      
                      {/* Episode Number Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                          Episode {episode.episode_number}
                        </span>
                      </div>
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        <div className="bg-primary-600 rounded-full p-3">
                          <Play className="h-6 w-6 text-white fill-current" />
                        </div>
                      </div>

                      {/* Rating Badge */}
                      {episode.vote_average > 0 && (
                        <div className="absolute top-2 right-2">
                          <div className="flex items-center space-x-1 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{episode.vote_average.toFixed(1)}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Episode Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-white text-sm mb-1 line-clamp-2 group-hover:text-primary-400 transition-colors">
                        {episode.name}
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        {episode.air_date && (
                          <span>{new Date(episode.air_date).toLocaleDateString()}</span>
                        )}
                        {episode.runtime && (
                          <span>{episode.runtime}m</span>
                        )}
                      </div>

                      {episode.overview && (
                        <p className="text-xs text-gray-500 line-clamp-3">
                          {episode.overview}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Watch All Season Button */}
              <div className="mt-8 text-center">
                <Link
                  href={`/tv/${tvId}/watch?season=${seasonNumber}&episode=1`}
                  className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 px-8 py-3 rounded-lg text-white font-medium transition-colors"
                >
                  <Play className="h-5 w-5" />
                  <span>Start Season {seasonNumber}</span>
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error fetching season:', error)
    notFound()
  }
}

function SeasonSkeleton() {
  return (
    <div className="min-h-screen bg-gray-950 animate-pulse">
      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-6 w-48 bg-gray-800 rounded mb-8" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            <div className="w-full max-w-xs mx-auto">
              <div className="aspect-[2/3] bg-gray-800 rounded-lg" />
            </div>
            <div className="lg:col-span-3 space-y-6">
              <div className="h-10 bg-gray-800 rounded w-3/4" />
              <div className="h-6 bg-gray-800 rounded w-1/2" />
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

export default async function SeasonPage({ params }: SeasonPageProps) {
  const { id, season } = await params
  const tvId = parseInt(id)
  const seasonNumber = parseInt(season)

  if (isNaN(tvId) || isNaN(seasonNumber)) {
    notFound()
  }

  return (
    <Suspense fallback={<SeasonSkeleton />}>
      <SeasonContent tvId={tvId} seasonNumber={seasonNumber} />
    </Suspense>
  )
}