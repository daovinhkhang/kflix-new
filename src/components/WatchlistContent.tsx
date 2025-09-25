'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Trash2, Play, Calendar, Star } from 'lucide-react'
import { useWatchlist } from '@/lib/hooks'
import { tmdbUtils } from '@/services/tmdb'

export function WatchlistContent() {
  const { items, removeFromWatchlist, clearWatchlist, isLoading } = useWatchlist()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950">
        <div className="px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white sm:text-4xl">My Watchlist</h1>
              <p className="mt-2 text-gray-400">
                Save movies and TV shows to watch later
              </p>
            </div>

            {/* Empty State */}
            <div className="text-center py-16">
              <Heart className="mx-auto h-24 w-24 text-gray-600 mb-6" />
              <h2 className="text-2xl font-semibold text-white mb-4">Your watchlist is empty</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Start adding movies and TV shows to your watchlist by clicking the heart icon on any content page.
              </p>
              <div className="space-y-4">
                <Link
                  href="/movies"
                  className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mr-4"
                >
                  Browse Movies
                </Link>
                <Link
                  href="/tv"
                  className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Browse TV Shows
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">My Watchlist</h1>
              <p className="mt-2 text-gray-400">
                {items.length} item{items.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            <button
              onClick={clearWatchlist}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Clear All
            </button>
          </div>

          {/* Watchlist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group"
              >
                {/* Poster */}
                <div className="aspect-[2/3] relative bg-gray-700">
                  {item.poster_path ? (
                    <Image
                      src={tmdbUtils.getImageUrl(item.poster_path, 'w500')}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Heart className="w-12 h-12 text-gray-600" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                    <Link
                      href={`/${item.type}/${item.id}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Watch Now</span>
                    </Link>
                  </div>

                  {/* Rating Badge */}
                  {item.vote_average > 0 && (
                    <div className="absolute top-2 right-2">
                      <div className="flex items-center space-x-1 bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{item.vote_average.toFixed(1)}</span>
                      </div>
                    </div>
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
                      {item.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    {(item.release_date || item.first_air_date) && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(item.release_date || item.first_air_date!).getFullYear()}</span>
                      </div>
                    )}
                    <span>{item.genres.slice(0, 2).map(g => g.name).join(', ')}</span>
                  </div>

                  {item.overview && (
                    <p className="text-xs text-gray-500 line-clamp-3 mb-3">
                      {item.overview}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${item.type}/${item.id}`}
                      className="text-primary-400 hover:text-primary-300 text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => removeFromWatchlist(item.id, item.type)}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Watchlist Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">{items.length}</div>
                <div className="text-sm text-gray-400">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {items.filter(item => item.type === 'movie').length}
                </div>
                <div className="text-sm text-gray-400">Movies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {items.filter(item => item.type === 'tv').length}
                </div>
                <div className="text-sm text-gray-400">TV Shows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {items.filter(item => item.vote_average >= 7).length}
                </div>
                <div className="text-sm text-gray-400">Highly Rated</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}