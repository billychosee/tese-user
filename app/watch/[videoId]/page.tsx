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
            <div className="overflow-hidden bg-gray-800 rounded-lg shadow-2xl">
              {/* Video Player Hero */}
              <div className="relative bg-black">
                <div
                  className="w-full bg-center bg-cover h-72 sm:h-96"
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
                  <div className="absolute px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded top-4 left-4">Locked</div>
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h1 className="mb-2 text-2xl font-bold text-white">{video.title}</h1>
                <div className="flex items-center gap-4 mb-4 text-sm text-white">
                  <span>{video.channelId}</span>
                  <span>•</span>
                  <span>{video.views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded bg-gray-700 text-white`}>{video.category}</span>
                  <span className="text-sm text-white">
                    {Math.floor(parseInt(video.duration) / 60)}:{(parseInt(video.duration) % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                <p className="leading-relaxed text-white">{video.description}</p>
              </div>
            </div>

            {/* Playlist and Comments Section */}
            <div className="mt-8">
              {/* View Playlist Button */}
              <div className="mb-6">
                <button
                  onClick={() => router.push('/playlist/sample-playlist')}
                  className="px-6 py-3 font-bold text-white transition-all bg-red-600 rounded-xl hover:scale-105"
                >
                  View Full Playlist
                </button>
              </div>

              <h3 className="mb-4 text-xl font-bold text-white">Comments</h3>
              <div className="space-y-4">
                {/* Comment Form */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <textarea
                    placeholder="Add a comment..."
                    className="w-full p-3 text-white bg-gray-700 border border-gray-600 rounded-lg resize-none focus:outline-none focus:border-red-600"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700">
                      Post Comment
                    </button>
                  </div>
                </div>

                {/* Sample Comments */}
                <div className="space-y-3">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-red-600 rounded-full">U</div>
                      <div>
                        <span className="font-semibold text-white">User123</span>
                        <span className="ml-2 text-sm text-gray-400">2 hours ago</span>
                      </div>
                    </div>
                    <p className="text-gray-300">Great video! Really enjoyed the content and the editing was top-notch.</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-400">
                      <button className="hover:text-white">Like</button>
                      <button className="hover:text-white">Reply</button>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-600 rounded-full">A</div>
                      <div>
                        <span className="font-semibold text-white">Alex Johnson</span>
                        <span className="ml-2 text-sm text-gray-400">1 day ago</span>
                      </div>
                    </div>
                    <p className="text-gray-300">This is exactly what I was looking for. Can't wait for the next episode!</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-400">
                      <button className="hover:text-white">Like</button>
                      <button className="hover:text-white">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Related Videos with Downloads UI Style */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Related Videos</h2>
              
              {/* Related Videos using Downloads UI Style */}
              <div className="grid gap-4">
                {relatedVideos.map((relatedVideo) => (
                  <div key={relatedVideo.id} className="cursor-pointer group">
                    <div className="relative mb-3 overflow-hidden transition-all duration-500 border border-gray-700 shadow-xl aspect-video rounded-2xl">
                      <img
                        src={relatedVideo.thumbnail}
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-black/40">
                        <div className="flex items-center justify-center w-12 h-12 text-white border rounded-full shadow-2xl bg-red-600/80 backdrop-blur-xl border-white/40">
                          <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded-lg text-[10px] font-bold text-white">
                        {Math.floor(parseInt(relatedVideo.duration) / 60)}:{(parseInt(relatedVideo.duration) % 60).toString().padStart(2, '0')}
                      </div>
                      {!relatedVideo.isFree && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg">
                          {relatedVideo.accessType === "subscriber-only"
                            ? "SUBSCRIBER"
                            : "PREMIUM"}
                        </div>
                      )}
                      {relatedVideo.isFree && (
                        <div className="absolute top-2 left-2 bg-green-600 text-white text-[9px] font-black px-2 py-1 rounded-md shadow-lg">
                          FREE
                        </div>
                      )}
                    </div>
                    <h4 className="mb-1 text-sm font-bold text-white truncate">
                      {relatedVideo.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] opacity-60 font-medium text-gray-400">
                        {relatedVideo.views.toLocaleString()} views
                      </p>
                      <p className="text-[10px] font-bold text-yellow-500">
                        ★ {relatedVideo.rating}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => router.push(`/watch/${relatedVideo.id}`)}
                        className="flex-1 px-3 py-2 text-sm font-bold text-white transition-all bg-red-600 rounded-lg hover:scale-105"
                      >
                        Watch Now
                      </button>
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