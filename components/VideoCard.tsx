'use client'

import { Video, VideoAccessType } from '@/types/video'
import { formatDuration, formatViews, getCategoryColor } from '@/lib/utils'

interface VideoCardProps {
  video: Video
  onClick?: (video: Video) => void
  showChannel?: boolean
  showActions?: boolean
}

export default function VideoCard({ 
  video, 
  onClick, 
  showChannel = true,
  showActions = false 
}: VideoCardProps) {
  const handleCardClick = () => {
    if (onClick) {
      onClick(video)
    }
  }

  const getAccessTypeBadge = (accessType: VideoAccessType, price?: number) => {
    switch (accessType) {
      case 'free':
        return (
          <span className="category-badge bg-green-600 text-white">
            Free
          </span>
        )
      case 'pay-per-view':
        return (
          <span className="price-badge">
            R{price || 0}
          </span>
        )
      case 'subscriber-only':
        return (
          <span className="subscription-badge">
            Subscribers Only
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div 
      className="video-card bg-gray-800 hover:bg-gray-700 transition-all duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Video Thumbnail */}
      <div className="video-thumbnail relative group">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.currentTarget.src = '/api/placeholder/280/160'
          }}
        />
        <div className="video-duration">
          {formatDuration(video.duration)}
        </div>
        
        {/* Access Type Overlay */}
        <div className="absolute top-2 left-2">
          {getAccessTypeBadge(video.accessType, video.price)}
        </div>
      </div>

      {/* Video Info */}
      <div className="video-info">
        <h3 className="video-title line-clamp-2">
          {video.title}
        </h3>
        
        {showChannel && (
          <div className="video-meta">
            <span className="video-channel text-gray-400">
              {video.channelId}
            </span>
            <span className="text-gray-500">
              {formatViews(video.views)}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <span className={`category-badge ${getCategoryColor(video.category)}`}>
            {video.category}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(video.uploadDate).toLocaleDateString()}
          </span>
        </div>

        {showActions && (
          <div className="video-actions mt-3">
            <button className="action-button primary">
              Watch Now
            </button>
            <button className="action-button">
              Add to Queue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}