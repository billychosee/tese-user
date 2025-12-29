'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  children: React.ReactNode
  title?: string
  showArrows?: boolean
  scrollStep?: number
}

export default function Carousel({ 
  children, 
  title, 
  showArrows = true,
  scrollStep = 300 
}: CarouselProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)

  const checkScrollPosition = () => {
    if (!carouselRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    
    const scrollAmount = direction === 'left' ? -scrollStep : scrollStep
    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    checkScrollPosition()
    const handleResize = () => checkScrollPosition()
    
    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', checkScrollPosition)
      window.addEventListener('resize', handleResize)
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', checkScrollPosition)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="carousel-container mb-8">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          {showArrows && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`carousel-arrow left ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`carousel-arrow right ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      )}
      
      <div 
        ref={carouselRef}
        className="carousel-track"
        style={{ 
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {children}
      </div>
    </div>
  )
}