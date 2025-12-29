'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Video } from '@/types/video'
import { User } from '@/types/user'
import Navbar from '@/components/Navbar'
import VideoCard from '@/components/VideoCard'
import PaywallModal from '@/components/PaywallModal'
import { generateVideoThumbnail } from '@/lib/utils'

export default function WatchPage() {
  const router = useRouter()
  const params = useParams()
  const videoId = params.videoId as string
  
  const [user, setUser] = useState<User | null>(null)
  const [video, setVideo] = useState<Video | null>(null)
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([])
  const [showPaywall, setShowPaywall] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/')
      return
    }
    
    setUser(JSON.parse(userData))
    
    // Mock video data
    setTimeout(() => {
      const mockVideo: Video = {
        id: videoId,
        title: 'Sample Video Title',
        description: 'This is a sample video description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        thumbnail: generateVideoThumbnail('Sample Video Title'),
        img: generateVideoThumbnail('Sample Video Title'),
        duration: '180',
        views: 125000,
        uploadDate: new Date().toISOString(),
        category: 'sports',
        channelId: 'channel-1',
        accessType: 'pay-per-view',
        price: 25,
        isFree: false,
        rating: '4.5'
      }
      
      setVideo(mockVideo)
      
      // Generate related videos
      const related = Array.from({ length: 6 }, (_, i) => ({
        id: `related-${i + 1}`,
        title: `Related Video ${i + 1}`,
        description: `Related video description ${i + 1}`,
        thumbnail: generateVideoThumbnail(`Related Video ${i + 1}`),
        img: generateVideoThumbnail(`Related Video ${i + 1}`),
        duration: Math.floor(Math.random() * 300 + 60).toString(),
        views: Math.floor(Math.random() * 100000),
        uploadDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        category: mockVideo.category,
        channelId: 'channel-1',
        accessType: Math.random() > 0.5 ? 'free' : 'pay-per-view',
        price: Math.floor(Math.random() * 50) + 10,
        isFree: Math.random() > 0.5,
        rating: (Math.random() * 5).toFixed(1)
      }))
      
      setRelatedVideos(related as Video[])
      setIsLoading(false)
    }, 1000)
  }, [videoId, router])

  const handleAccessVideo = () => {
    if (video?.accessType === 'free') {
      setIsPlaying(true)
    } else {
      setShowPaywall(true)
    }
  }

  const handlePurchase = async () => {
    console.log('Purchasing video:', video?.title)
    setShowPaywall(false)
    // Simulate successful purchase
    setVideo(prev => prev ? { ...prev, accessType: 'free' } : null)
  }

  const handleSubscribe = async () => {
    console.log('Subscribing to channel')
    setShowPaywall(false)
    // Simulate successful subscription
    setVideo(prev => prev ? { ...prev, accessType: 'free' } : null)
  }

  const handleLogout = () => {
    setUser(null)
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-400">Loading video...</p>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Video Not Found</h2>
          <p className="mb-8 text-gray-400">The video you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar user={user ? { name: user.name, email: user.email } : undefined} onLogout={handleLogout} />
      
      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg shadow-2xl bg-gray-800">
              {/* Video Player Hero */}
              <div className="relative bg-black">
                <div
                  className="w-full h-72 bg-center bg-cover sm:h-96"
                  style={{ backgroundImage: `url('${video.img || video.thumbnail}')` }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  {!isPlaying ? (
                    <button
                      onClick={handleAccessVideo}
                      className="flex items-center justify-center w-20 h-20 text-white bg-blue-600 rounded-full shadow-lg hover:scale-105"
                    >
                      <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  ) : (
                    <div className="w-full text-center text-white">Playing video (demo)</div>
                  )}
                </div>

                {/* Locked badge */}
                {video.accessType !== 'free' && (
                  <div className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded">Locked</div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h1 className="mb-2 text-2xl font-bold text-white">{video.title}</h1>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <span>{video.channelId}</span>
                  <span>•</span>
                  <span>{video.views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded bg-gray-700 text-gray-200`}>{video.category}</span>
                  <span className="text-sm text-gray-400">
                    {Math.floor(parseInt(video.duration) / 60)}:{(parseInt(video.duration) % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                <p className="leading-relaxed text-gray-300">{video.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Related Videos</h2>
              <div className="grid gap-4">
                {relatedVideos.map((relatedVideo) => (
                  <div key={relatedVideo.id} className="flex items-start gap-3">
                    <img src={relatedVideo.thumbnail} alt={relatedVideo.title} className="w-24 h-14 rounded object-cover" />
                    <div>
                      <button onClick={() => router.push(`/watch/${relatedVideo.id}`)} className="text-sm font-medium text-gray-100 hover:underline">
                        {relatedVideo.title}
                      </button>
                      <div className="text-xs text-gray-400">{relatedVideo.views.toLocaleString()} views</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        videoTitle={video.title}
        price={video.price || 25}
        onPurchase={handlePurchase}
        onSubscribe={handleSubscribe}
        channelName="TESE Channel"
        subscriptionPrice={49}
      />
    </div>
  )
}