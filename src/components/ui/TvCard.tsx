import Image from 'next/image'
import Link from 'next/link'
import { Star, Play } from 'lucide-react'
import { TvShow } from '@/types'
import { tmdbUtils } from '@/services/tmdb'
import { cn } from '@/lib/utils'

interface TvCardProps {
  show: TvShow
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function TvCard({ show, size = 'medium', className }: TvCardProps) {
  const cardSize = {
    small: 'w-[150px]',
    medium: 'w-[200px]',
    large: 'w-[250px]'
  }[size]

  return (
    <Link href={`/tv/${show.id}`} className={cn('group block', className)}>
      <div className={cn('space-y-3', cardSize)}>
        {/* Poster */}
        <div className="relative overflow-hidden rounded-lg bg-gray-800 aspect-[2/3]">
          <Image
            src={tmdbUtils.getImageUrl(show.poster_path, 'w500')}
            alt={show.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 left-3 right-3">
              {show.vote_average > 0 && (
                <div className="flex items-center space-x-1 text-yellow-500 mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{show.vote_average.toFixed(1)}</span>
                </div>
              )}
              
              {show.number_of_seasons && (
                <div className="flex items-center space-x-1 text-gray-300 text-sm">
                  <Play className="w-4 h-4" />
                  <span>{show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="font-medium text-white line-clamp-2 group-hover:text-gray-300 transition-colors">
            {show.name}
          </h3>
          
          <div className="flex items-center text-sm text-gray-400 space-x-2">
            {show.first_air_date && (
              <span>{new Date(show.first_air_date).getFullYear()}</span>
            )}
            {show.number_of_episodes && (
              <span>•</span>
            )}
            {show.number_of_episodes && (
              <span>{show.number_of_episodes} Episode{show.number_of_episodes !== 1 ? 's' : ''}</span>
            )}
          </div>
          
          {size !== 'small' && show.overview && (
            <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
              {show.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

interface TvGridProps {
  shows: TvShow[]
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function TvGrid({ shows, size = 'medium', className }: TvGridProps) {
  const gridCols = {
    small: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8',
    medium: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
    large: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
  }[size]

  return (
    <div className={cn('grid gap-4', gridCols, className)}>
      {shows.map((show) => (
        <TvCard
          key={show.id}
          show={show}
          size={size}
        />
      ))}
    </div>
  )
}

// Loading placeholder
export function TvCardSkeleton({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const cardSize = {
    small: 'w-[150px]',
    medium: 'w-[200px]',
    large: 'w-[250px]'
  }[size]

  return (
    <div className={cn('space-y-3 animate-pulse', cardSize)}>
      <div className="bg-gray-700 rounded-lg aspect-[2/3]" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  )
}