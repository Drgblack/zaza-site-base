'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageCarouselProps {
  images: Array<{
    src: string
    alt: string
    title?: string
  }>
  autoPlay?: boolean
  interval?: number
  className?: string
}

export default function ImageCarousel({ 
  images, 
  autoPlay = true, 
  interval = 5000, 
  className 
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, images.length])

  if (!images.length) return null

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="relative w-full aspect-[4/3]">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-500',
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentIndex 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
            onClick={() => 
              setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300"
            onClick={() => 
              setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}