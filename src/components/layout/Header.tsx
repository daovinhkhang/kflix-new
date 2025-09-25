'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60 pt-[env(safe-area-inset-top)]">
      <div className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3">
        {/* Mobile layout */}
        <div className="flex w-full items-center justify-between lg:hidden">
          {/* Hamburger menu placeholder */}
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-gray-400 hover:text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search bar - mobile */}
          <div className="mx-3 flex-1">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search movies, shows, people..."
                className={cn(
                  'block w-full rounded-lg border-0 bg-gray-800 py-2 pl-9 pr-3 text-sm text-white placeholder:text-gray-400 focus:bg-gray-700 focus:ring-2 focus:ring-primary-500',
                  isSearchFocused && 'ring-2 ring-primary-500'
                )}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
                  }
                }}
              />
            </div>
          </div>

          {/* Logo on mobile */}
          <Link href="/" className="shrink-0 text-lg font-bold text-white">
            K<span className="text-primary-500">FLIX</span>
          </Link>
        </div>

        {/* Desktop layout */}
        <div className="hidden w-full items-center justify-between lg:flex">
          <Link href="/" className="text-2xl font-bold text-white">
            K<span className="text-primary-500">FLIX</span>
          </Link>
          
          <div className="flex flex-1 justify-center px-8">
            <div className="w-full max-w-lg">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search movies, shows, people..."
                  className={cn(
                    'block w-full rounded-lg border-0 bg-gray-800 py-2 pl-10 pr-3 text-white placeholder:text-gray-400 focus:bg-gray-700 focus:ring-2 focus:ring-primary-500 sm:text-sm',
                    isSearchFocused && 'ring-2 ring-primary-500'
                  )}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-20"></div>
        </div>
      </div>
    </header>
  )
}