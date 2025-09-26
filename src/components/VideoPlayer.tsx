'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

interface StreamingSource {
  name: string
  description: string
  url: string
}

interface VideoPlayerProps {
  streamingSources: StreamingSource[]
  movieTitle: string
}

export default function VideoPlayer({ streamingSources, movieTitle }: VideoPlayerProps) {
  const [currentSourceUrl, setCurrentSourceUrl] = useState(
    streamingSources.length > 2 ? streamingSources[2].url : streamingSources[0]?.url || ''
  )

  const handleSourceChange = (url: string) => {
    setCurrentSourceUrl(url)
  }

  return (
    <>
      {/* Main Video Player */}
      <div className="aspect-video bg-black relative">
        {currentSourceUrl ? (
          <iframe
            src={currentSourceUrl}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={`Watch ${movieTitle}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Play className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No streaming source available</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Controls and Servers */}
      <div className="p-6 lg:p-8 space-y-6">
        {/* Alternative Servers */}
        {streamingSources.length > 1 && (
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Alternative Servers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[streamingSources[0], ...streamingSources.slice(2)].map((source, index) => (
                <button
                  key={index}
                  onClick={() => handleSourceChange(source.url)}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <div>
                    <p className="font-medium text-white">Server {index === 0 ? 1 : index + 2}</p>
                    <p className="text-sm text-gray-400">{source.description}</p>
                  </div>
                  <Play className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}