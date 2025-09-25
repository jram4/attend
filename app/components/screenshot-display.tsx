'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ScreenshotDisplayProps {
  src: string
  alt: string
  fallbackIcon: string
  fallbackText: string
  fallbackSubtext: string
}

export function ScreenshotDisplay({
  src,
  alt,
  fallbackIcon,
  fallbackText,
  fallbackSubtext
}: ScreenshotDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(true)

  return (
    <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
      {imageLoaded ? (
        <Image
          src={src}
          alt={alt}
          width={400}
          height={300}
          className="rounded object-cover"
          onError={() => setImageLoaded(false)}
        />
      ) : (
        <div className="text-gray-400 text-center">
          <div className="text-4xl mb-2">{fallbackIcon}</div>
          <p className="text-sm">{fallbackText}</p>
          <p className="text-xs">{fallbackSubtext}</p>
        </div>
      )}
    </div>
  )
}

