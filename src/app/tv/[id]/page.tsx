import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { 
  Star, 
  Calendar, 
  Play, 
  Heart, 
  Share,
  User,
  Tv,
  ChevronRight,
  Clock
} from 'lucide-react'
import { tvApi } from '@/services/tmdb'
import { generateTvMetadata, generateTvShowJsonLd } from '@/lib/seo'
import { tmdbUtils } from '@/services/tmdb'
import { TvGrid } from '@/components/ui/TvCard'
import { WatchlistButton, ShareButton, ToastContainer } from '@/components/ui/WatchlistShare'

interface TvPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: TvPageProps) {
  const { id } = await params
  try {
    const tvShow = await tvApi.getDetails(parseInt(id))
    return generateTvMetadata(tvShow)
  } catch {
    return {
      title: 'TV Show Not Found - KFLIX',
      description: 'The requested TV show could not be found.'
    }
  }
}

async function TvContent({ id }: { id: number }) {
  try {
    const [tvShow, credits, videos, similar] = await Promise.all([
      tvApi.getDetails(id),
      tvApi.getCredits(id),
      tvApi.getVideos(id),
      tvApi.getSimilar(id, 1)
    ])

    const director = tmdbUtils.getDirector(credits.crew)
    const mainTrailer = tmdbUtils.getMainTrailer(videos.results)

    const jsonLd = generateTvShowJsonLd(tvShow)

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
            {tvShow.backdrop_path && (
              <div className="absolute inset-0">
                <Image
                  src={tmdbUtils.getImageUrl(tvShow.backdrop_path, 'original')}
                  alt={tvShow.name}
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
                        src={tmdbUtils.getImageUrl(tvShow.poster_path, 'w500')}
                        alt={tvShow.name}
                        width={400}
                        height={600}
                        className="rounded-lg shadow-2xl"
                        priority
                      />
                    </div>
                  </div>

                  {/* TV Show Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h1 className="text-4xl font-bold text-white sm:text-5xl">
                        {tvShow.name}
                      </h1>
                      {tvShow.first_air_date && (
                        <p className="text-xl text-gray-400 mt-2">
                          ({new Date(tvShow.first_air_date).getFullYear()})
                        </p>
                      )}
                    </div>

                    {/* Rating & Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{tvShow.vote_average.toFixed(1)}/10</span>
                        <span className="text-gray-400">({tvShow.vote_count.toLocaleString()} votes)</span>
                      </div>
                      
                      {tvShow.first_air_date && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5" />
                          <span>{tmdbUtils.formatDate(tvShow.first_air_date)}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <Tv className="h-5 w-5" />
                        <span>{tvShow.number_of_seasons} Season{tvShow.number_of_seasons !== 1 ? 's' : ''}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Play className="h-5 w-5" />
                        <span>{tvShow.number_of_episodes} Episode{tvShow.number_of_episodes !== 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {/* Genres */}
                    {tvShow.genres.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tvShow.genres.map((genre) => (
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
                    {tvShow.overview && (
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Overview</h3>
                        <p className="text-gray-300 leading-relaxed">{tvShow.overview}</p>
                      </div>
                    )}

                    {/* Creator/Director */}
                    <div>
                      <span className="text-gray-400">Created by:</span>
                      <span className="ml-2 text-white font-medium">{director}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/tv/${id}/season/1`}
                        className="flex items-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 transition-colors"
                      >
                        <Play className="h-5 w-5" />
                        <span>Start Watching</span>
                      </Link>
                      
                      <WatchlistButton
                        item={{
                          id: tvShow.id,
                          type: 'tv',
                          title: tvShow.name,
                          poster_path: tvShow.poster_path,
                          backdrop_path: tvShow.backdrop_path,
                          vote_average: tvShow.vote_average,
                          first_air_date: tvShow.first_air_date,
                          genres: tvShow.genres,
                          overview: tvShow.overview
                        }}
                        size="md"
                      />
                      
                      <ShareButton
                        item={{
                          id: tvShow.id,
                          type: 'tv',
                          title: tvShow.name,
                          overview: tvShow.overview,
                          poster_path: tvShow.poster_path,
                          backdrop_path: tvShow.backdrop_path
                        }}
                        size="md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seasons - Plex Style */}
          {tvShow.seasons && tvShow.seasons.length > 0 && (
            <section className="px-6 py-12 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <h2 className="text-2xl font-bold text-white mb-6">Seasons & Episodes</h2>
                <div className="space-y-6">
                  {tvShow.seasons
                    .filter(season => season.season_number > 0)
                    .map((season) => (
                      <div key={season.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        {/* Season Header */}
                        <div className="p-6 border-b border-gray-700">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {season.poster_path ? (
                                <Image
                                  src={tmdbUtils.getImageUrl(season.poster_path, 'w300')}
                                  alt={season.name}
                                  width={80}
                                  height={120}
                                  className="rounded-lg object-cover"
                                />
                              ) : (
                                <div className="w-20 h-[120px] bg-gray-700 rounded-lg flex items-center justify-center">
                                  <Tv className="h-8 w-8 text-gray-500" />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white">{season.name}</h3>
                                <p className="text-gray-400 mt-1">
                                  {season.episode_count} episode{season.episode_count !== 1 ? 's' : ''}
                                </p>
                                {season.air_date && (
                                  <p className="text-sm text-gray-500 mt-1">
                                    First aired: {tmdbUtils.formatDate(season.air_date)}
                                  </p>
                                )}
                                {season.overview && (
                                  <p className="text-sm text-gray-300 mt-2 line-clamp-2 max-w-2xl">
                                    {season.overview}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Link
                              href={`/tv/${id}/season/${season.season_number}`}
                              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-white transition-colors"
                            >
                              <Play className="h-4 w-4" />
                              <span>Watch Season</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>

                        {/* Episode Preview */}
                        <div className="p-6">
                          <div className="text-sm text-gray-400 mb-3">Episodes will be available when you enter the season</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3].map((episodeNum) => (
                              <div key={episodeNum} className="bg-gray-700 rounded-lg p-4 opacity-50">
                                <div className="flex items-center space-x-3">
                                  <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center">
                                    <span className="text-xs text-gray-400">{episodeNum}</span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="h-3 bg-gray-600 rounded mb-2"></div>
                                    <div className="h-2 bg-gray-600 rounded w-2/3"></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          )}

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

          {/* Similar TV Shows */}
          {similar.results.length > 0 && (
            <section className="px-6 py-12 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <TvGrid
                  shows={similar.results.slice(0, 12)}
                />
              </div>
            </section>
          )}
        </div>
      </>
    )
  } catch (error) {
    console.error('Error fetching TV show:', error)
    notFound()
  }
}

function TvPageWrapper({ id }: { id: number }) {
  return (
    <>
      <TvContent id={id} />
      <ToastContainer />
    </>
  )
}

function TvSkeleton() {
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

export default async function TvPage({ params }: TvPageProps) {
  const { id } = await params
  const tvId = parseInt(id)

  if (isNaN(tvId)) {
    notFound()
  }

  return (
    <Suspense fallback={<TvSkeleton />}>
      <TvPageWrapper id={tvId} />
    </Suspense>
  )
}