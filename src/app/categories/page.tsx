import { generateBaseMetadata } from '@/lib/seo'
import { Film, Tv, TrendingUp, Star, Play, Calendar, Sword, Heart, Laugh, Shield, Eye, Music, Search, Zap, Crown, Ghost, Palette, Users, Sparkles, Target } from 'lucide-react'
import Link from 'next/link'

export const metadata = generateBaseMetadata(
  'Categories - KFLIX',
  'Browse all content categories. Explore movies and TV shows by genre, rating, and popularity on KFLIX.'
)

const categories = [
  {
    name: 'Movies',
    href: '/movies',
    icon: Film,
    description: 'Browse all movies'
  },
  {
    name: 'TV Shows',
    href: '/tv',
    icon: Tv,
    description: 'Browse all TV shows'
  },
  {
    name: 'Trending',
    href: '/trending',
    icon: TrendingUp,
    description: "What's trending now"
  },
  {
    name: 'Popular',
    href: '/popular',
    icon: Star,
    description: 'Most popular content'
  },
  {
    name: 'Top Rated',
    href: '/top-rated',
    icon: Crown,
    description: 'Highest rated content'
  },
  {
    name: 'Now Playing',
    href: '/now-playing',
    icon: Play,
    description: 'Currently in theaters'
  },
  {
    name: 'Upcoming',
    href: '/upcoming',
    icon: Calendar,
    description: 'Coming soon'
  }
]

const movieGenres = [
  {
    name: 'Action',
    href: '/genre/28',
    icon: Sword,
    description: 'High-octane action movies',
    color: 'from-red-600/20 to-red-800/20',
    iconColor: 'text-red-400'
  },
  {
    name: 'Adventure',
    href: '/genre/12',
    icon: Target,
    description: 'Epic adventure stories',
    color: 'from-orange-600/20 to-orange-800/20',
    iconColor: 'text-orange-400'
  },
  {
    name: 'Animation',
    href: '/genre/16',
    icon: Palette,
    description: 'Animated films for all ages',
    color: 'from-pink-600/20 to-pink-800/20',
    iconColor: 'text-pink-400'
  },
  {
    name: 'Comedy',
    href: '/genre/35',
    icon: Laugh,
    description: 'Funny movies to make you laugh',
    color: 'from-yellow-600/20 to-yellow-800/20',
    iconColor: 'text-yellow-400'
  },
  {
    name: 'Crime',
    href: '/genre/80',
    icon: Shield,
    description: 'Crime thrillers and mysteries',
    color: 'from-gray-600/20 to-gray-800/20',
    iconColor: 'text-gray-400'
  },
  {
    name: 'Documentary',
    href: '/genre/99',
    icon: Eye,
    description: 'Real stories and documentaries',
    color: 'from-blue-600/20 to-blue-800/20',
    iconColor: 'text-blue-400'
  },
  {
    name: 'Drama',
    href: '/genre/18',
    icon: Users,
    description: 'Emotional and dramatic stories',
    color: 'from-purple-600/20 to-purple-800/20',
    iconColor: 'text-purple-400'
  },
  {
    name: 'Family',
    href: '/genre/10751',
    icon: Heart,
    description: 'Family-friendly entertainment',
    color: 'from-green-600/20 to-green-800/20',
    iconColor: 'text-green-400'
  },
  {
    name: 'Fantasy',
    href: '/genre/14',
    icon: Sparkles,
    description: 'Magical worlds and fantasy',
    color: 'from-indigo-600/20 to-indigo-800/20',
    iconColor: 'text-indigo-400'
  },
  {
    name: 'Horror',
    href: '/genre/27',
    icon: Ghost,
    description: 'Scary movies and thrillers',
    color: 'from-black/40 to-gray-800/40',
    iconColor: 'text-red-300'
  },
  {
    name: 'Romance',
    href: '/genre/10749',
    icon: Heart,
    description: 'Love stories and romance',
    color: 'from-rose-600/20 to-rose-800/20',
    iconColor: 'text-rose-400'
  },
  {
    name: 'Sci-Fi',
    href: '/genre/878',
    icon: Zap,
    description: 'Science fiction adventures',
    color: 'from-cyan-600/20 to-cyan-800/20',
    iconColor: 'text-cyan-400'
  }
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">All Categories</h1>
            <p className="mt-2 text-gray-400">
              Browse content by category and discover your next favorite movie or show
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative rounded-lg bg-gray-800 p-6 hover:bg-gray-700 transition-colors"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-gray-700 group-hover:bg-gray-600 transition-colors">
                      <IconComponent className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-white">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">
                      {category.description}
                    </p>
                  </div>
                  <span
                    className="pointer-events-none absolute top-6 right-6 text-gray-500 group-hover:text-gray-400 transition-colors"
                    aria-hidden="true"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Movie Genres Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Movie Genres</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {movieGenres.map((genre) => {
                const IconComponent = genre.icon
                return (
                  <Link
                    key={genre.name}
                    href={genre.href}
                    className={`group relative rounded-lg bg-gradient-to-r ${genre.color} border border-gray-700 p-6 hover:border-gray-600 transition-all duration-300 hover:scale-105`}
                  >
                    <div>
                      <span className={`rounded-lg inline-flex p-3 bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors backdrop-blur-sm`}>
                        <IconComponent className={`h-6 w-6 ${genre.iconColor}`} />
                      </span>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium text-white">
                        {genre.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-400">
                        {genre.description}
                      </p>
                    </div>
                    <span
                      className="pointer-events-none absolute top-6 right-6 text-gray-500 group-hover:text-gray-400 transition-colors"
                      aria-hidden="true"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Featured Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Movies */}
              <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-lg p-8">
                <Film className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Movies</h3>
                <p className="text-gray-300 mb-4">
                  Discover thousands of movies from classics to the latest blockbusters
                </p>
                <Link
                  href="/movies"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Browse Movies
                </Link>
              </div>

              {/* TV Shows */}
              <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg p-8">
                <Tv className="h-12 w-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">TV Shows</h3>
                <p className="text-gray-300 mb-4">
                  Binge-watch your favorite series and discover new shows to love
                </p>
                <Link
                  href="/tv"
                  className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Browse TV Shows
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}