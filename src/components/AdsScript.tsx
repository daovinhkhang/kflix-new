'use client'

import { useEffect } from 'react'

export default function AdsScript() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement('script')
      script.src = 'https://fpyf8.com/88/tag.min.js'
      script.setAttribute('data-zone', '173742')
      script.async = true
      script.setAttribute('data-cfasync', 'false')
      document.head.appendChild(script)
    }, 20000) // 20 seconds

    return () => clearTimeout(timer)
  }, [])

  return null
}