'use client'

import { useState } from 'react'
import { Heart, Share2, Copy, Check, X } from 'lucide-react'
import { useWatchlist, useShare, useToast } from '@/lib/hooks'
import { WatchlistItem, ShareOptions } from '@/types'
import { tmdbUtils } from '@/services/tmdb'

interface WatchlistButtonProps {
  item: {
    id: number
    type: 'movie' | 'tv'
    title: string
    name?: string
    poster_path: string | null
    backdrop_path: string | null
    vote_average: number
    release_date?: string
    first_air_date?: string
    genres: Array<{ id: number; name: string }>
    overview: string
  }
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
}

export function WatchlistButton({ item, size = 'md', variant = 'default' }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist, isLoading } = useWatchlist()
  const { addToast } = useToast()

  const title = item.title || item.name || ''
  const releaseDate = item.release_date || item.first_air_date || ''

  const watchlistItem: Omit<WatchlistItem, 'added_at'> = {
    id: item.id,
    type: item.type,
    title,
    poster_path: item.poster_path,
    backdrop_path: item.backdrop_path,
    vote_average: item.vote_average,
    release_date: item.release_date,
    first_air_date: item.first_air_date,
    genres: item.genres,
    overview: item.overview
  }

  const isInList = isInWatchlist(item.id, item.type)

  const handleToggle = () => {
    if (isInList) {
      removeFromWatchlist(item.id, item.type)
      addToast(`Removed "${title}" from watchlist`, 'info')
    } else {
      addToWatchlist(watchlistItem)
      addToast(`Added "${title}" to watchlist`, 'success')
    }
  }

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  }

  const variantClasses = {
    default: isInList
      ? 'bg-red-600 hover:bg-red-700 text-white'
      : 'bg-gray-800 hover:bg-gray-700 text-white',
    outline: isInList
      ? 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white'
      : 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
    ghost: isInList
      ? 'text-red-600 hover:bg-red-600 hover:text-white'
      : 'text-gray-600 hover:bg-gray-600 hover:text-white'
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`
        flex items-center space-x-2 rounded-lg transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
      title={isInList ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <Heart
        className={`${
          size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'
        } ${isInList ? 'fill-current' : ''}`}
      />
      {size !== 'sm' && (
        <span className="font-medium">
          {isInList ? 'In Watchlist' : 'Add to Watchlist'}
        </span>
      )}
    </button>
  )
}

interface ShareButtonProps {
  item: {
    id: number
    type: 'movie' | 'tv'
    title: string
    name?: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
  }
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
}

export function ShareButton({ item, size = 'md', variant = 'default' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { shareNative, copyToClipboard, getSharePlatforms } = useShare()
  const { addToast } = useToast()

  const title = item.title || item.name || ''
  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/${item.type}/${item.id}`
    : `/${item.type}/${item.id}`

  const shareOptions: ShareOptions = {
    url,
    title: `Watch "${title}" on KFLIX`,
    description: item.overview.substring(0, 150) + '...',
    image: item.backdrop_path
      ? tmdbUtils.getImageUrl(item.backdrop_path, 'original')
      : item.poster_path
      ? tmdbUtils.getImageUrl(item.poster_path, 'w500')
      : undefined,
    hashtags: ['KFLIX', 'FreeMovies', 'Streaming']
  }

  const handleNativeShare = async () => {
    const success = await shareNative(shareOptions)
    if (success) {
      addToast('Shared successfully!', 'success')
    } else {
      setIsOpen(true) // Fallback to custom share modal
    }
  }

  const handleCopyLink = async () => {
    const success = await copyToClipboard(url)
    if (success) {
      setCopied(true)
      addToast('Link copied to clipboard!', 'success')
      setTimeout(() => setCopied(false), 2000)
    } else {
      addToast('Failed to copy link', 'error')
    }
  }

  const handlePlatformShare = (platform: any) => {
    platform.action(shareOptions)
    setIsOpen(false)
  }

  const platforms = getSharePlatforms()

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  }

  const variantClasses = {
    default: 'bg-gray-800 hover:bg-gray-700 text-white',
    outline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-600 hover:text-white'
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center space-x-2 rounded-lg transition-all duration-200
          ${sizeClasses[size]}
          ${variantClasses[variant]}
        `}
        title="Share this content"
      >
        <Share2 className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />
        {size !== 'sm' && <span className="font-medium">Share</span>}
      </button>

      {/* Share Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Share "{title}"</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Copy Link */}
              <div className="mb-6">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              {/* Social Platforms */}
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handlePlatformShare(platform)}
                    className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors"
                    style={{ backgroundColor: platform.color + '20', borderColor: platform.color }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: platform.color }}
                    >
                      {platform.name.charAt(0)}
                    </div>
                    <span className="font-medium">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Toast Notifications Component
export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg max-w-sm
            ${toast.type === 'success' ? 'bg-green-600 text-white' :
              toast.type === 'error' ? 'bg-red-600 text-white' :
              'bg-blue-600 text-white'}
          `}
        >
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}