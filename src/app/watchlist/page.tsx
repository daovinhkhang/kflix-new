import { Suspense } from 'react'
import { generateBaseMetadata } from '@/lib/seo'
import { WatchlistContent } from '@/components/WatchlistContent'

export const metadata = generateBaseMetadata(
  'My Watchlist - KFLIX',
  'Manage your personal watchlist. Save movies and TV shows to watch later on KFLIX. Free streaming platform with HD quality.'
)

export default function WatchlistPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 animate-pulse">
        <div className="px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="h-12 bg-gray-800 rounded w-1/4 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-lg animate-pulse">
                  <div className="aspect-[2/3] bg-gray-700" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-700 rounded" />
                    <div className="h-3 bg-gray-700 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <WatchlistContent />
    </Suspense>
  )
}