'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Film, 
  Tv, 
  Search,
  TrendingUp, 
  Star, 
  Calendar,
  Play,
  Heart,
  Clock,
  Grid3X3,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navigation: NavigationItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Movies', href: '/movies', icon: Film },
  { name: 'TV Shows', href: '/tv', icon: Tv },
  { name: 'Search', href: '/search', icon: Search },
]

const categories: NavigationItem[] = [
  { name: 'Trending', href: '/trending', icon: TrendingUp },
  { name: 'Popular', href: '/popular', icon: Star },
  { name: 'Top Rated', href: '/top-rated', icon: Star },
  { name: 'Now Playing', href: '/now-playing', icon: Play },
  { name: 'Upcoming', href: '/upcoming', icon: Calendar },
]

const collections: NavigationItem[] = [
  { name: 'Watchlist', href: '/watchlist', icon: Heart },
  { name: 'Recently Watched', href: '/history', icon: Clock },
  { name: 'All Categories', href: '/categories', icon: Grid3X3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <Play className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">KFLIX</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8 px-6 py-6">
        {/* Main Navigation */}
        <div>
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Collections */}
        <div>
          <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Collections
          </h3>
          <ul className="space-y-2">
            {collections.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive(item.href)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          type="button"
          className="fixed left-4 top-4 z-50 rounded-md bg-gray-900 p-2.5 text-gray-400 hover:bg-gray-800 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 border-r border-gray-800">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 transform bg-gray-900 transition-transform duration-300 ease-in-out lg:hidden',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-800">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}