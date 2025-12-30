export interface Video {
  rating: string;
  img: string;
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
  category: VideoCategory;
  channelId: string;
  accessType: VideoAccessType;
  price?: number;
  isFree: boolean;
  playlist?: string;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  avatar: string;
  banner: string;
  subscriberCount: number;
  isSubscribed: boolean;
  subscriptionPrice: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscriptions: string[];
  purchasedVideos: string[];
}

export type VideoCategory =
  | "sports"
  | "church"
  | "football"
  | "entertainment"
  | "education"
  | "news"
  | "music"
  | "gaming"
  | "lifestyle"
  | "technology";

export type VideoAccessType = "free" | "pay-per-view" | "subscriber-only";

export interface Category {
  id: string;
  name: string;
  slug: string;
}
