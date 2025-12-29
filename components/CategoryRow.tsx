'use client'

import { Video } from '@/types/video'
import VideoCard from './VideoCard'
import Carousel from './Carousel'

interface CategoryRowProps {
  title: string
  videos: Video[]
  onVideoClick?: (video: Video) => void
}

export default function CategoryRow({ title, videos, onVideoClick }: CategoryRowProps) {
  if (videos.length === 0) {
    return null
  }

  return (
    <Carousel title={title} showArrows={true}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={onVideoClick}
          showChannel={true}
        />
      ))}
    </Carousel>
  )
}