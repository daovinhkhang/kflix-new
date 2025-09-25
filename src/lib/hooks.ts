'use client'

import { useState, useEffect, useCallback } from 'react'
import { WatchlistItem, ShareOptions, SharePlatform } from '@/types'

// Watchlist Hook
export function useWatchlist() {
  const [items, setItems] = useState<WatchlistItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load watchlist from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kflix_watchlist')
      if (stored) {
        const parsedItems = JSON.parse(stored)
        setItems(parsedItems)
      }
    } catch (err) {
      console.error('Error loading watchlist:', err)
      setError('Failed to load watchlist')
    }
  }, [])

  // Save to localStorage
  const saveToStorage = useCallback((newItems: WatchlistItem[]) => {
    try {
      localStorage.setItem('kflix_watchlist', JSON.stringify(newItems))
    } catch (err) {
      console.error('Error saving watchlist:', err)
      setError('Failed to save watchlist')
    }
  }, [])

  // Add item to watchlist
  const addToWatchlist = useCallback((item: Omit<WatchlistItem, 'added_at'>) => {
    setIsLoading(true)
    setError(null)

    try {
      const newItem: WatchlistItem = {
        ...item,
        added_at: new Date().toISOString()
      }

      setItems(prev => {
        // Check if item already exists
        const exists = prev.some(existing =>
          existing.id === item.id && existing.type === item.type
        )

        if (exists) {
          return prev
        }

        const updated = [newItem, ...prev]
        saveToStorage(updated)
        return updated
      })
    } catch (err) {
      setError('Failed to add item to watchlist')
    } finally {
      setIsLoading(false)
    }
  }, [saveToStorage])

  // Remove item from watchlist
  const removeFromWatchlist = useCallback((id: number, type: 'movie' | 'tv') => {
    setIsLoading(true)
    setError(null)

    try {
      setItems(prev => {
        const updated = prev.filter(item => !(item.id === id && item.type === type))
        saveToStorage(updated)
        return updated
      })
    } catch (err) {
      setError('Failed to remove item from watchlist')
    } finally {
      setIsLoading(false)
    }
  }, [saveToStorage])

  // Check if item is in watchlist
  const isInWatchlist = useCallback((id: number, type: 'movie' | 'tv') => {
    return items.some(item => item.id === id && item.type === type)
  }, [items])

  // Clear all items
  const clearWatchlist = useCallback(() => {
    setIsLoading(true)
    setError(null)

    try {
      setItems([])
      localStorage.removeItem('kflix_watchlist')
    } catch (err) {
      setError('Failed to clear watchlist')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    items,
    isLoading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    clearWatchlist
  }
}

// Share Hook
export function useShare() {
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported(typeof navigator !== 'undefined' && 'share' in navigator)
  }, [])

  // Native Web Share API
  const shareNative = useCallback(async (options: ShareOptions) => {
    if (!isSupported) return false

    try {
      await navigator.share({
        title: options.title,
        text: options.description,
        url: options.url
      })
      return true
    } catch (err) {
      console.error('Error sharing:', err)
      return false
    }
  }, [isSupported])

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        return true
      } catch (fallbackErr) {
        console.error('Error copying to clipboard:', fallbackErr)
        return false
      }
    }
  }, [])

  // Share to social platforms
  const shareToPlatform = useCallback((platform: string, options: ShareOptions) => {
    const encodedUrl = encodeURIComponent(options.url)
    const encodedTitle = encodeURIComponent(options.title)
    const encodedDescription = encodeURIComponent(options.description)
    const hashtags = options.hashtags ? `&hashtags=${options.hashtags.join(',')}` : ''

    let shareUrl = ''

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}${hashtags}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
        break
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
        break
      case 'reddit':
        shareUrl = `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}${options.image ? `&media=${encodeURIComponent(options.image)}` : ''}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`
        break
      default:
        return false
    }

    window.open(shareUrl, '_blank', 'width=600,height=400')
    return true
  }, [])

  // Get share platforms
  const getSharePlatforms = useCallback((): SharePlatform[] => {
    return [
      {
        name: 'Twitter',
        icon: 'twitter',
        color: '#1DA1F2',
        action: (options) => shareToPlatform('twitter', options)
      },
      {
        name: 'Facebook',
        icon: 'facebook',
        color: '#1877F2',
        action: (options) => shareToPlatform('facebook', options)
      },
      {
        name: 'WhatsApp',
        icon: 'whatsapp',
        color: '#25D366',
        action: (options) => shareToPlatform('whatsapp', options)
      },
      {
        name: 'Telegram',
        icon: 'telegram',
        color: '#0088CC',
        action: (options) => shareToPlatform('telegram', options)
      },
      {
        name: 'Reddit',
        icon: 'reddit',
        color: '#FF4500',
        action: (options) => shareToPlatform('reddit', options)
      },
      {
        name: 'LinkedIn',
        icon: 'linkedin',
        color: '#0077B5',
        action: (options) => shareToPlatform('linkedin', options)
      },
      {
        name: 'Pinterest',
        icon: 'pinterest',
        color: '#E60023',
        action: (options) => shareToPlatform('pinterest', options)
      },
      {
        name: 'Email',
        icon: 'email',
        color: '#EA4335',
        action: (options) => shareToPlatform('email', options)
      }
    ]
  }, [shareToPlatform])

  return {
    isSupported,
    shareNative,
    copyToClipboard,
    shareToPlatform,
    getSharePlatforms
  }
}

// Toast notifications hook
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info'
  }>>([])

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, message, type }])

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return {
    toasts,
    addToast,
    removeToast
  }
}