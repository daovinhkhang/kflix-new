import Image from 'next/image'
import Link from 'next/link'
import { Star, Calendar, Clock } from 'lucide-react'
import { Movie } from '@/types'
import { tmdbUtils } from '@/services/tmdb'
import { cn } from '@/lib/utils'

interface MovieCardProps {
  movie: Movie
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function MovieCard({ movie, size = 'medium', className }: MovieCardProps) {
  const cardSize = {
    small: 'w-full max-w-[150px]',
    medium: 'w-full max-w-[200px]',
    large: 'w-full max-w-[250px]'
  }[size]

  return (
    <Link href={`/movie/${movie.id}`} className={cn('group block', className)}>
      <div className={cn('space-y-3', cardSize)}>
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-800">
          <Image
            src={tmdbUtils.getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
          />
          
          {/* Rating overlay */}
          <div className="absolute top-2 right-2">
            <div className="flex items-center space-x-1 rounded-full bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">
            {movie.title}
          </h3>
          
          <div className="flex items-center space-x-3 text-xs text-gray-400">
            {movie.release_date && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            )}
            
            {movie.runtime && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{tmdbUtils.formatRuntime(movie.runtime)}</span>
              </div>
            )}
          </div>

          {size !== 'small' && movie.overview && (
            <p className="line-clamp-3 text-xs text-gray-400">
              {movie.overview}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

interface MovieGridProps {
  movies: Movie[]
  title?: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function MovieGrid({ movies, title, size = 'medium', className }: MovieGridProps) {
  const gridCols = {
    small: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8',
    medium: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
    large: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
  }[size]

  return (
    <div className={cn('space-y-6', className)}>
      {title && (
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      )}
      
      <div className={cn('grid gap-3 sm:gap-4 md:gap-6', gridCols)}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            size={size}
          />
        ))}
      </div>
    </div>
  )
}