'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex h-16 items-center justify-between px-4 py-2 sm:px-6 sm:py-3">
        {/* Left side - Search */}
        <div className="flex flex-1 items-center space-x-4 lg:space-x-6">
          <div className="w-full max-w-lg lg:max-w-xs xl:max-w-lg">
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

        {/* Logo on mobile */}
        <div className="flex items-center lg:hidden">
          <Link href="/" className="text-xl font-bold text-white">
            K<span className="text-primary-500">FLIX</span>
          </Link>
        </div>
      </div>
    </header>
  )
}