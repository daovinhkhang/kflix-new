import { generateBaseMetadata } from '@/lib/seo'
import { movieApi, tvApi } from '@/services/tmdb'
import { MovieGrid } from '@/components/ui/MovieCard'
import { TvGrid } from '@/components/ui/TvCard'
import { Suspense } from 'react'

export const metadata = generateBaseMetadata(
  "Free Movies Online - Watch HD Movies & TV Shows",
  "Stream thousands of FREE movies and TV shows online in HD quality. No registration required. Watch latest Hollywood blockbusters, international cinema, popular TV series in multiple languages: English, Français, Español, Deutsch, Русский, 中文, 日本語, 한국어, Português, Italiano. Your ultimate free streaming destination."
)

async function FreeMoviesContent() {
  try {
    const [popularMovies, topRatedMovies, nowPlayingMovies, popularTvShows] = await Promise.all([
      movieApi.getByCategory('popular', 1),
      movieApi.getByCategory('top_rated', 1),
      movieApi.getByCategory('now_playing', 1),
      tvApi.getByCategory('popular', 1)
    ])

    return (
      <div className="min-h-screen bg-gray-950 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* SEO Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Free Movies & TV Shows Online
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-6">
              Watch thousands of movies and TV series for free in HD quality. Stream the latest Hollywood releases, 
              classic films, international cinema, and popular TV shows without registration.
            </p>
            
            {/* Multi-language keywords for SEO */}
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {[
                'Free Movies', 'Films Gratuits', 'Películas Gratis', 'Kostenlose Filme',
                'Бесплатные Фильмы', '免费电影', '無料映画', '무료 영화', 'Filmes Grátis', 'Film Gratuiti'
              ].map((keyword, index) => (
                <span key={index} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Popular Free Movies */}
          <section className="mb-12">
            <MovieGrid
              movies={popularMovies.results.slice(0, 18)}
              title="🔥 Popular Free Movies"
            />
          </section>

          {/* Top Rated Free Movies */}
          <section className="mb-12">
            <MovieGrid
              movies={topRatedMovies.results.slice(0, 18)}
              title="⭐ Top Rated Free Movies"
            />
          </section>

          {/* Now Playing Free Movies */}
          <section className="mb-12">
            <MovieGrid
              movies={nowPlayingMovies.results.slice(0, 18)}
              title="🎬 Now Playing - Free Movies"
            />
          </section>

          {/* Popular Free TV Shows */}
          <section className="mb-12">
            <TvGrid
              shows={popularTvShows.results.slice(0, 18)}
            />
          </section>

          {/* SEO Content Section */}
          <div className="bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Why Choose KFLIX for Free Movie Streaming?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🆓 Completely Free</h3>
                <p>No subscription fees, no hidden charges. Watch unlimited movies and TV shows absolutely free.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🎬 HD Quality</h3>
                <p>Stream in high definition up to 4K quality. Crystal clear picture and audio for the best viewing experience.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🌍 Multi-Language</h3>
                <p>Content available in English, Français, Español, Deutsch, Русский, 中文, 日本語, 한국어, and more.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">📱 Any Device</h3>
                <p>Watch on your computer, tablet, smartphone, or smart TV. Compatible with all modern devices.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">🚫 No Registration</h3>
                <p>Start watching immediately. No need to create an account or provide personal information.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">⚡ Fast Streaming</h3>
                <p>High-speed servers ensure smooth playback without buffering or interruptions.</p>
              </div>
            </div>
          </div>

          {/* Additional SEO Content */}
          <div className="text-gray-400 text-sm leading-relaxed">
            <h3 className="text-white text-lg font-semibold mb-4">Popular Categories</h3>
            <p className="mb-4">
              <strong>Free Action Movies:</strong> Watch the latest action-packed blockbusters, superhero films, and adrenaline-pumping adventures.
            </p>
            <p className="mb-4">
              <strong>Free Comedy Movies:</strong> Enjoy hilarious comedies, romantic comedies, and feel-good films that will make you laugh.
            </p>
            <p className="mb-4">
              <strong>Free Drama Series:</strong> Dive into compelling dramas, character-driven stories, and award-winning series.
            </p>
            <p className="mb-4">
              <strong>Free Horror Movies:</strong> Get scared with our collection of horror films, thrillers, and supernatural mysteries.
            </p>
            <p className="mb-4">
              <strong>Free Sci-Fi Movies:</strong> Explore futuristic worlds, space adventures, and mind-bending science fiction.
            </p>
            <p className="mb-4">
              <strong>International Cinema:</strong> Discover films from around the world including Bollywood, Korean cinema, European films, and more.
            </p>
          </div>
        </div>
      </div>
    )
  } catch {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Free Movies Coming Soon</h1>
          <p className="text-gray-400">We&apos;re preparing an amazing collection of free movies for you.</p>
        </div>
      </div>
    )
  }
}

export default function FreeMoviesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 animate-pulse">
        <div className="px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="h-12 bg-gray-800 rounded w-1/2 mx-auto mb-8" />
            <div className="h-6 bg-gray-800 rounded w-3/4 mx-auto mb-12" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <FreeMoviesContent />
    </Suspense>
  )
}