import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Play, Star, Calendar, Tv } from 'lucide-react'
import { tvApi } from '@/services/tmdb'
import { generateTvMetadata } from '@/lib/seo'
import { tmdbUtils } from '@/services/tmdb'
import { getTvStreamingSources } from '@/lib/constants'
import VideoPlayer from '@/components/VideoPlayer'

interface TvWatchPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ season?: string; episode?: string }>
}

export async function generateMetadata({ params }: TvWatchPageProps) {
  try {
    const { id } = await params
    const tvId = parseInt(id)
    
    if (isNaN(tvId)) return { title: 'TV Show Not Found' }
    
    const tvShow = await tvApi.getDetails(tvId)
    return generateTvMetadata(tvShow)
  } catch {
    return { title: 'TV Show Not Found' }
  }
}

async function TvWatchContent({ 
  id, 
  season, 
  episode 
}: { 
  id: number
  season: number
  episode: number 
}) {
  try {
    const [tvShow, seasonData, credits] = await Promise.all([
      tvApi.getDetails(id),
      tvApi.getSeason(id, season),
      tvApi.getCredits(id)
    ])

    if (!seasonData.episodes) {
      notFound()
    }

    const currentEpisode = seasonData.episodes.find(ep => ep.episode_number === episode)
    if (!currentEpisode) {
      notFound()
    }

    const director = tmdbUtils.getDirector(credits.crew)
    const streamingSources = getTvStreamingSources(id, season, episode)

    return (
      <div className="min-h-screen bg-gray-950">
        {/* Header with back button */}
        <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between p-4 lg:px-8">
            <Link
              href={`/tv/${id}/season/${season}`}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Season</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <h1 className="text-lg font-semibold text-white">
                  {tvShow.name} - S{season}E{episode}
                </h1>
                <p className="text-sm text-gray-400">{currentEpisode.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main Video Player */}
          <div className="flex-1">
            <VideoPlayer 
              streamingSources={streamingSources} 
              movieTitle={`${tvShow.name} - S${season}E${episode}`} 
            />

            {/* Episode Navigation */}
            <div className="p-6 border-t border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Episodes</h3>
                <div className="text-sm text-gray-400">
                  Season {season} • Episode {episode} of {seasonData.episode_count}
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {seasonData.episodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/tv/${id}/watch?season=${season}&episode=${ep.episode_number}`}
                    className={`block p-3 rounded-lg transition-colors ${
                      ep.episode_number === episode 
                        ? 'bg-primary-600 text-white' 
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium">E{ep.episode_number}</div>
                      <div className="text-xs mt-1 truncate" title={ep.name}>
                        {ep.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Next/Previous Episode */}
              <div className="flex justify-between mt-6">
                {episode > 1 && (
                  <Link
                    href={`/tv/${id}/watch?season=${season}&episode=${episode - 1}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-white"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Episode</span>
                  </Link>
                )}
                
                {episode < seasonData.episode_count && (
                  <Link
                    href={`/tv/${id}/watch?season=${season}&episode=${episode + 1}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors text-white ml-auto"
                  >
                    <span>Next Episode</span>
                    <Play className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar with Episode/Show Info */}
          <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-800">
            <div className="p-6 space-y-6">
              {/* Episode Still */}
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800">
                {currentEpisode.still_path ? (
                  <Image
                    src={tmdbUtils.getImageUrl(currentEpisode.still_path, 'w500')}
                    alt={currentEpisode.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Tv className="w-12 h-12 text-gray-600" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="rounded bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
                    S{season}E{episode}
                  </span>
                </div>
              </div>

              {/* Episode Details */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{currentEpisode.name}</h2>
                  <p className="text-sm text-gray-400 mt-1">{tvShow.name}</p>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  {currentEpisode.vote_average > 0 && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{currentEpisode.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                  
                  {currentEpisode.air_date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(currentEpisode.air_date).getFullYear()}</span>
                    </div>
                  )}
                  
                  {currentEpisode.runtime && (
                    <span>{currentEpisode.runtime}m</span>
                  )}
                </div>

                {currentEpisode.overview && (
                  <div>
                    <h3 className="font-semibold text-white mb-2">Overview</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{currentEpisode.overview}</p>
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

                {director && (
                  <div>
                    <h3 className="font-semibold text-white mb-2">Created by</h3>
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
    console.error('Error loading TV episode:', error)
    notFound()
  }
}

export default async function TvWatchPage({ params, searchParams }: TvWatchPageProps) {
  const { id } = await params
  const { season: seasonParam, episode: episodeParam } = await searchParams
  
  const tvId = parseInt(id)
  const season = parseInt(seasonParam || '1')
  const episode = parseInt(episodeParam || '1')
  
  if (isNaN(tvId) || isNaN(season) || isNaN(episode)) {
    notFound()
  }

  return <TvWatchContent id={tvId} season={season} episode={episode} />
}