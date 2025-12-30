"use client";

import { useState, useEffect } from "react";
import { Channel } from "@/types/channel";
import { User } from "@/types/user";

export const useSubscriptions = () => {
  const [user, setUser] = useState<User | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load channels data
    const channelsData = localStorage.getItem("channels");
    if (channelsData) {
      setChannels(JSON.parse(channelsData));
    } else {
      // Initialize with default channels
      const defaultChannels: Channel[] = [
        {
          id: "channel-1",
          name: "Mr Beast",
          description:
            "The most entertaining channel on the internet. Crazy challenges, giveaways, and experiments.",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
          banner:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=300&fit=crop",
          subscriberCount: 250000000,
          isSubscribed: false,
          subscriptionPrice: 9.99,
          videos: [
            {
              id: "mr-beast-1",
              title: "Last To Leave Circle Wins $500,000",
              description:
                "Crazy challenge where the last person to leave the circle wins half a million dollars!",
              thumbnail:
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=280&h=160&fit=crop",
              img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=280&h=160&fit=crop",
              duration: "1800",
              views: 50000000,
              rating: "4.9",
              uploadDate: new Date().toISOString(),
              category: "entertainment",
              channelId: "channel-1",
              accessType: "free",
              price: 0,
              isFree: true,
              playlist: "Challenges",
            },
          ],
        },
        {
          id: "channel-2",
          name: "Tech Reviews",
          description:
            "Latest tech reviews, unboxings, and gadget comparisons.",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          banner:
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=300&fit=crop",
          subscriberCount: 5000000,
          isSubscribed: false,
          subscriptionPrice: 7.99,
          videos: [
            {
              id: "tech-1",
              title: "iPhone 15 Pro Max Review",
              description:
                "Full review of the latest iPhone with all the details you need to know.",
              thumbnail:
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=280&h=160&fit=crop",
              img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=280&h=160&fit=crop",
              duration: "1200",
              views: 2500000,
              rating: "4.7",
              uploadDate: new Date().toISOString(),
              category: "technology",
              channelId: "channel-2",
              accessType: "subscriber-only",
              price: 0,
              isFree: false,
              playlist: "Phone Reviews",
            },
          ],
        },
        {
          id: "channel-3",
          name: "Fitness Pro",
          description:
            "Professional fitness training, workout routines, and nutrition tips.",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          banner:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=300&fit=crop",
          subscriberCount: 3000000,
          isSubscribed: false,
          subscriptionPrice: 12.99,
          videos: [
            {
              id: "fitness-1",
              title: "30 Day Transformation Challenge",
              description:
                "Join our 30-day fitness challenge to transform your body.",
              thumbnail:
                "https://images.unsplash.com/photo-1517836357463-26304c3e950a?w=280&h=160&fit=crop",
              img: "https://images.unsplash.com/photo-1517836357463-26304c3e950a?w=280&h=160&fit=crop",
              duration: "2400",
              views: 1500000,
              rating: "4.8",
              uploadDate: new Date().toISOString(),
              category: "lifestyle",
              channelId: "channel-3",
              accessType: "subscriber-only",
              price: 0,
              isFree: false,
              playlist: "Workout Programs",
            },
          ],
        },
      ];
      setChannels(defaultChannels);
      localStorage.setItem("channels", JSON.stringify(defaultChannels));
    }

    setIsLoading(false);
  }, []);

  const subscribeToChannel = (channelId: string) => {
    setChannels((prev) =>
      prev.map((channel) => {
        if (channel.id === channelId) {
          const updatedChannel = {
            ...channel,
            isSubscribed: true,
            subscriberCount: channel.subscriberCount + 1,
          };

          // Update user subscriptions
          if (user) {
            const updatedUser = {
              ...user,
              subscriptions: [...user.subscriptions, channelId],
            };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }

          return updatedChannel;
        }
        return channel;
      })
    );

    // Save to localStorage
    const updatedChannels = channels.map((channel) =>
      channel.id === channelId
        ? {
            ...channel,
            isSubscribed: true,
            subscriberCount: channel.subscriberCount + 1,
          }
        : channel
    );
    localStorage.setItem("channels", JSON.stringify(updatedChannels));
  };

  const unsubscribeFromChannel = (channelId: string) => {
    setChannels((prev) =>
      prev.map((channel) => {
        if (channel.id === channelId) {
          const updatedChannel = {
            ...channel,
            isSubscribed: false,
            subscriberCount: Math.max(0, channel.subscriberCount - 1),
          };

          // Update user subscriptions
          if (user) {
            const updatedUser = {
              ...user,
              subscriptions: user.subscriptions.filter(
                (id) => id !== channelId
              ),
            };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }

          return updatedChannel;
        }
        return channel;
      })
    );

    // Save to localStorage
    const updatedChannels = channels.map((channel) =>
      channel.id === channelId
        ? {
            ...channel,
            isSubscribed: false,
            subscriberCount: Math.max(0, channel.subscriberCount - 1),
          }
        : channel
    );
    localStorage.setItem("channels", JSON.stringify(updatedChannels));
  };

  const getSubscribedChannels = () => {
    return channels.filter((channel) => channel.isSubscribed);
  };

  const getRecommendedChannels = () => {
    return channels.filter((channel) => !channel.isSubscribed);
  };

  const canAccessVideo = (video: any) => {
    // If video is free, always accessible
    if (video.isFree) return true;

    // If video requires subscription, check if user is subscribed to the channel
    if (video.accessType === "subscriber-only") {
      return user?.subscriptions.includes(video.channelId) || false;
    }

    // For pay-per-view, user can always access (but will be charged)
    return true;
  };

  return {
    user,
    channels,
    isLoading,
    subscribeToChannel,
    unsubscribeFromChannel,
    getSubscribedChannels,
    getRecommendedChannels,
    canAccessVideo,
    setUser,
  };
};
