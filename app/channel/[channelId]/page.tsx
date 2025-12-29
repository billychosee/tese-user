"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Channel } from "@/types/channel";
import { Video, VideoCategory } from "@/types/video";
import { User } from "@/types/user";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import SubscriptionButton from "@/components/SubscriptionButton";
import Carousel from "@/components/Carousel";

export default function ChannelPage() {
  const router = useRouter();
  const params = useParams();
  const channelId = params.channelId as string;

  const [user, setUser] = useState<User | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/");
      return;
    }

    setUser(JSON.parse(userData));

    // Mock channel data
    setTimeout(() => {
      const mockChannel: Channel = {
        id: channelId,
        name: "",
        description:
          "Your premier destination for sports content. From football highlights to sports analysis, we bring you the best of the sports world.",
        avatar: "/Tese-Logo.svg",
        banner: "/api/placeholder/1200/300",
        subscriberCount: 150000,
        isSubscribed: false,
        subscriptionPrice: 49,
        videos: [
          {
            id: "sports-1",
            title: "Epic Football Highlights",
            description: "Best football moments from the season",
            thumbnail: "/api/placeholder/280/160",
            img: "/api/placeholder/280/160",
            duration: "120",
            views: 500000,
            rating: "4.8",
            uploadDate: new Date().toISOString(),
            category: "sports",
            channelId: channelId,
            accessType: "subscriber-only",
            price: 0,
            isFree: false,
          },
          {
            id: "sports-2",
            title: "Cricket Match Analysis",
            description: "In-depth analysis of the latest cricket match",
            thumbnail: "/api/placeholder/280/160",
            img: "/api/placeholder/280/160",
            duration: "240",
            views: 150000,
            rating: "4.5",
            uploadDate: new Date(
              Date.now() - 24 * 60 * 60 * 1000
            ).toISOString(),
            category: "sports",
            channelId: channelId,
            accessType: "free",
            price: 0,
            isFree: true,
          },
          {
            id: "sports-3",
            title: "Gym Workout Tips",
            description: "Professional tips for effective workouts",
            thumbnail: "/api/placeholder/280/160",
            img: "/api/placeholder/280/160",
            duration: "180",
            views: 85000,
            rating: "4.2",
            uploadDate: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
            category: "sports",
            channelId: channelId,
            accessType: "pay-per-view",
            price: 15,
            isFree: false,
          },
        ],
      };

      setChannel(mockChannel);
      setIsLoading(false);
    }, 1000);
  }, [channelId, router]);

  const handleSubscribe = async () => {
    if (!channel) return;

    // Mock subscription
    console.log("Subscribing to channel:", channel.name);

    // Update channel state
    setChannel((prev) =>
      prev
        ? {
            ...prev,
            isSubscribed: true,
            subscriberCount: prev.subscriberCount + 1,
          }
        : null
    );
  };

  const handleUnsubscribe = async () => {
    if (!channel) return;

    // Mock unsubscription
    console.log("Unsubscribing from channel:", channel.name);

    // Update channel state
    setChannel((prev) =>
      prev
        ? {
            ...prev,
            isSubscribed: false,
            subscriberCount: prev.subscriberCount - 1,
          }
        : null
    );
  };

  const handleVideoClick = (video: Video) => {
    router.push(`/watch/${video.id}`);
  };

  const handleLogout = () => {
    setUser(null);
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-400">Loading channel...</p>
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Channel Not Found
          </h2>
          <p className="mb-8 text-gray-400">
            The channel you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Group videos by access type
  const freeVideos = channel.videos.filter((v) => v.isFree);
  const subscriberVideos = channel.videos.filter(
    (v) => v.accessType === "subscriber-only"
  );
  const payPerViewVideos = channel.videos.filter(
    (v) => v.accessType === "pay-per-view"
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar
        user={user ? { name: user.name, email: user.email } : undefined}
        onLogout={handleLogout}
      />

      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Channel Header */}
        <div className="relative mb-8 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
          <div className="channel-banner">
            <img
              src={channel.banner}
              alt={`${channel.name} banner`}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
            <div className="flex items-end gap-6">
              <div className="channel-avatar">
                <img
                  src={channel.avatar}
                  alt={`${channel.name} avatar`}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>

              <div className="flex-1">
                <div className="mb-2">
                  <img src="/Tese-Logo.svg" alt="Channel Logo" className="h-12 w-auto" />
                </div>
                <p className="max-w-2xl mb-4 text-gray-200">
                  {channel.description}
                </p>

                <div className="flex items-center gap-6 text-white">
                  <span className="text-sm">
                    {channel.subscriberCount.toLocaleString()} subscribers
                  </span>
                  <span className="text-sm">
                    {channel.videos.length} videos
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <SubscriptionButton
                  isSubscribed={channel.isSubscribed}
                  price={channel.subscriptionPrice}
                  onSubscribe={handleSubscribe}
                  onUnsubscribe={handleUnsubscribe}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Channel Stats */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-4">
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="mb-2 text-sm text-gray-400">Total Videos</h3>
            <p className="text-2xl font-bold text-white">
              {channel.videos.length}
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="mb-2 text-sm text-gray-400">Subscribers</h3>
            <p className="text-2xl font-bold text-white">
              {channel.subscriberCount.toLocaleString()}
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="mb-2 text-sm text-gray-400">Total Views</h3>
            <p className="text-2xl font-bold text-white">
              {channel.videos
                .reduce((acc, video) => acc + video.views, 0)
                .toLocaleString()}
            </p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="mb-2 text-sm text-gray-400">Subscription Price</h3>
            <p className="text-2xl font-bold text-white">
              R{channel.subscriptionPrice}/month
            </p>
          </div>
        </div>

        {/* Video Sections */}
        <div className="space-y-12">
          {/* Free Videos */}
          {freeVideos.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-white">
                Free Videos
              </h2>
              <Carousel showArrows={true}>
                {freeVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={handleVideoClick}
                    showChannel={false}
                  />
                ))}
              </Carousel>
            </section>
          )}

          {/* Subscriber Only Videos */}
          {subscriberVideos.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-white">
                Subscriber Only Videos
                {!channel.isSubscribed && (
                  <span className="ml-4 text-sm text-gray-400">
                    Subscribe to access
                  </span>
                )}
              </h2>
              <Carousel showArrows={true}>
                {subscriberVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={handleVideoClick}
                    showChannel={false}
                  />
                ))}
              </Carousel>
            </section>
          )}

          {/* Pay Per View Videos */}
          {payPerViewVideos.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl font-bold text-white">
                Premium Videos
              </h2>
              <Carousel showArrows={true}>
                {payPerViewVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onClick={handleVideoClick}
                    showChannel={false}
                  />
                ))}
              </Carousel>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
