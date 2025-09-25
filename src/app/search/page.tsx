'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Star, User, Film, Tv } from 'lucide-react'
import { searchApi } from '@/services/tmdb'
import { tmdbUtils } from '@/services/tmdb'

interface SearchResult {
  id: number
  media_type: 'movie' | 'tv' | 'person'
  title?: string
  name?: string
  release_date?: string
  first_air_date?: string
  poster_path?: string | null
  profile_path?: string | null
  vote_average?: number
  overview?: string
  known_for_department?: string
}

interface SearchResultsProps {
  results: SearchResult[]
  loading: boolean
}

function SearchResultCard({ result }: { result: SearchResult }) {
  const isTv = result.media_type === 'tv'
  const isPerson = result.media_type === 'person'

  const title = result.title || result.name || ''
  const date = result.release_date || result.first_air_date || ''
  const image = result.poster_path || result.profile_path || null

  const href = isPerson 
    ? `/person/${result.id}`
    : isTv 
    ? `/tv/${result.id}`
    : `/movie/${result.id}`

  return (
    <Link href={href} className="group block">
      <div className="flex space-x-4 rounded-lg bg-gray-800 p-4 hover:bg-gray-700 transition-colors">
        {/* Image */}
        <div className="w-16 h-24 flex-shrink-0">
          <div className="relative w-full h-full overflow-hidden rounded bg-gray-700">
            {image ? (
              <Image
                src={tmdbUtils.getImageUrl(image, 'w300')}
                alt={title}
                fill
                className="object-cover"
                sizes="64px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                {isPerson ? (
                  <User className="h-6 w-6 text-gray-500" />
                ) : isTv ? (
                  <Tv className="h-6 w-6 text-gray-500" />
                ) : (
                  <Film className="h-6 w-6 text-gray-500" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white group-hover:text-gray-300 truncate">
            {title}
          </h3>
          
          <div className="flex items-center space-x-2 mt-1 text-sm text-gray-400">
            <span className="capitalize">{result.media_type}</span>
            {date && (
              <>
                <span>•</span>
                <span>{new Date(date).getFullYear()}</span>
              </>
            )}
            {result.vote_average && result.vote_average > 0 && (
              <>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{result.vote_average.toFixed(1)}</span>
                </div>
              </>
            )}
          </div>
          
          {result.overview && (
            <p className="text-sm text-gray-300 mt-2 line-clamp-2">
              {result.overview}
            </p>
          )}
          
          {isPerson && result.known_for_department && (
            <p className="text-sm text-gray-400 mt-1">
              Known for: {result.known_for_department}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

function SearchResults({ results, loading }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex space-x-4 rounded-lg bg-gray-800 p-4 animate-pulse">
            <div className="w-16 h-24 bg-gray-700 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="mx-auto h-12 w-12 text-gray-600" />
        <h3 className="mt-4 text-lg font-medium text-white">No results found</h3>
        <p className="mt-2 text-gray-400">Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <SearchResultCard key={`${result.media_type}-${result.id}`} result={result} />
      ))}
    </div>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)

  // Search function với useCallback để tránh re-render
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const data = await searchApi.multi(searchQuery)
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Effect chỉ chạy khi initialQuery thay đổi
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery, performSearch])

  // Effect chỉ chạy khi query thay đổi và cập nhật URL
  useEffect(() => {
    if (query !== initialQuery) {
      const params = new URLSearchParams(searchParams)
      if (query) {
        params.set('q', query)
      } else {
        params.delete('q')
      }
      
      // Chỉ update URL nếu thực sự khác
      const newUrl = `/search?${params.toString()}`
      if (window.location.pathname + window.location.search !== newUrl) {
        router.replace(newUrl, { scroll: false })
      }
    }
  }, [query, initialQuery, router, searchParams])

  // Debounce search when typing
  useEffect(() => {
    if (query && query !== initialQuery) {
      const timeoutId = setTimeout(() => {
        performSearch(query)
      }, 300)

      return () => clearTimeout(timeoutId)
    }
  }, [query, initialQuery, performSearch])

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl mb-4">Search</h1>
            
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Search for movies, TV shows, or people..."
                autoFocus
              />
            </div>
          </div>

          {/* Search Results */}
          <SearchResults results={results} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}