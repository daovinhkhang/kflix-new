import { generateBaseMetadata } from '@/lib/seo'
import { Clock } from 'lucide-react'
import Link from 'next/link'

export const metadata = generateBaseMetadata(
  'Recently Watched - KFLIX',
  'View your recently watched movies and TV shows. Continue watching where you left off on KFLIX.'
)

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Recently Watched</h1>
            <p className="mt-2 text-gray-400">
              Continue watching where you left off
            </p>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <Clock className="mx-auto h-24 w-24 text-gray-600 mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">No viewing history yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Your recently watched movies and TV shows will appear here. Start watching something to build your history.
            </p>
            <div className="space-y-4">
              <Link
                href="/trending"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mr-4"
              >
                Browse Trending
              </Link>
              <Link
                href="/popular"
                className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Browse Popular
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}