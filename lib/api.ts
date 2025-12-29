// API Service Layer for TESE Video Streaming Platform
// This layer abstracts all API calls and can be easily replaced with real endpoints

import {
  Video,
  Channel,
  User,
  VideoCategory,
  VideoAccessType,
} from "@/types/video";
import { Channel as ChannelType } from "@/types/channel";
import { User as UserType } from "@/types/user";

// Re-export for convenience
export type {
  Video,
  ChannelType as Channel,
  UserType as User,
  VideoCategory,
  VideoAccessType,
};

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    subscriptions: string[];
    purchasedVideos: string[];
  };
  token: string;
}

export interface VideoListResponse {
  videos: Video[];
  total: number;
  page: number;
  limit: number;
}

export interface ChannelResponse {
  channel: Channel;
}

// Base API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const API_CONFIG = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token");
  return {
    ...API_CONFIG.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Mock delay for API calls
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Authentication API
export const authApi = {
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> {
    try {
      await delay(1000); // Simulate network delay

      // Mock validation
      if (email === "demo@example.com" && password === "demo123") {
        const mockUser = {
          id: "user-1",
          email,
          name: "Demo User",
          subscriptions: [],
          purchasedVideos: [],
        };

        const response: LoginResponse = {
          user: mockUser,
          token: "mock-jwt-token",
        };

        return {
          success: true,
          data: response,
        };
      } else {
        return {
          success: false,
          error: "Invalid email or password",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  },

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<ApiResponse<LoginResponse>> {
    try {
      await delay(1000); // Simulate network delay

      // Mock registration
      const mockUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        subscriptions: [],
        purchasedVideos: [],
      };

      const response: LoginResponse = {
        user: mockUser,
        token: "mock-jwt-token",
      };

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: "Registration failed. Please try again.",
      };
    }
  },

  async logout(): Promise<ApiResponse<void>> {
    try {
      await delay(500);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: "Logout failed",
      };
    }
  },
};

// Video API
export const videoApi = {
  async getTrending(
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<VideoListResponse>> {
    try {
      await delay(800);

      // Mock trending videos
      const videos = Array.from({ length: 15 }, (_, i) => ({
        rating: (Math.random() * 5).toFixed(1),
        img: `https://placehold.co/280x160/667eea/white?text=Trending+${
          i + 1
        }`,
        id: `trending-${i + 1}`,
        title: `Trending Video ${i + 1}`,
        description: `This is trending video ${i + 1} description.`,
        thumbnail: `https://placehold.co/280x160/667eea/white?text=Trending+${
          i + 1
        }`,
        duration: Math.floor(Math.random() * 300 + 60).toString(),
        views: Math.floor(Math.random() * 1000000),
        uploadDate: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        category: ["sports", "church", "football", "entertainment"][
          Math.floor(Math.random() * 4)
        ] as VideoCategory,
        channelId: `channel-${Math.floor(Math.random() * 5) + 1}`,
        accessType:
          Math.random() > 0.5
            ? "free"
            : Math.random() > 0.5
            ? "pay-per-view"
            : ("subscriber-only" as VideoAccessType),
        price: Math.floor(Math.random() * 50) + 10,
        isFree: Math.random() > 0.5,
      }));

      return {
        success: true,
        data: {
          videos,
          total: 150,
          page,
          limit,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch trending videos",
      };
    }
  },

  async getByCategory(
    category: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<VideoListResponse>> {
    try {
      await delay(600);

      // Mock category videos
      const videos = Array.from({ length: 12 }, (_, i) => ({
        rating: (Math.random() * 5).toFixed(1),
        img: `https://placehold.co/280x160/764ba2/white?text=${category.toUpperCase()}+${
          i + 1
        }`,
        id: `${category}-${i + 1}`,
        title: `${category.toUpperCase()} Video ${i + 1}`,
        description: `This is a ${category} video description.`,
        thumbnail: `https://placehold.co/280x160/764ba2/white?text=${category.toUpperCase()}+${
          i + 1
        }`,
        duration: Math.floor(Math.random() * 300 + 60).toString(),
        views: Math.floor(Math.random() * 500000),
        uploadDate: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
        category: category as VideoCategory,
        channelId: `channel-${Math.floor(Math.random() * 5) + 1}`,
        accessType:
          Math.random() > 0.5
            ? "free"
            : Math.random() > 0.5
            ? "pay-per-view"
            : ("subscriber-only" as VideoAccessType),
        price: Math.floor(Math.random() * 50) + 10,
        isFree: Math.random() > 0.5,
      }));

      return {
        success: true,
        data: {
          videos,
          total: 100,
          page,
          limit,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch category videos",
      };
    }
  },

  async getById(videoId: string): Promise<ApiResponse<Video>> {
    try {
      await delay(500);

      // Mock video details
      const video = {
        rating: "4.5",
        img: "https://placehold.co/280x160/667eea/white?text=Sample+Video",
        id: videoId,
        title: "Sample Video Title",
        description:
          "This is a sample video description with detailed information about the content.",
        thumbnail:
          "https://placehold.co/280x160/667eea/white?text=Sample+Video",
        duration: "180",
        views: 125000,
        uploadDate: new Date().toISOString(),
        category: "sports" as VideoCategory,
        channelId: "channel-1",
        accessType: "pay-per-view" as VideoAccessType,
        price: 25,
        isFree: false,
      };

      return {
        success: true,
        data: video,
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch video details",
      };
    }
  },

  async search(
    query: string,
    page: number = 1,
    limit: number = 20
  ): Promise<ApiResponse<VideoListResponse>> {
    try {
      await delay(700);

      // Mock search results
      const videos = Array.from({ length: 8 }, (_, i) => ({
        rating: (Math.random() * 5).toFixed(1),
        img: `https://placehold.co/280x160/f093fb/white?text=Search+${
          i + 1
        }`,
        id: `search-${i + 1}`,
        title: `Search Result ${i + 1} for "${query}"`,
        description: `This is search result ${i + 1} description.`,
        thumbnail: `https://placehold.co/280x160/f093fb/white?text=Search+${
          i + 1
        }`,
        duration: Math.floor(Math.random() * 300 + 60).toString(),
        views: Math.floor(Math.random() * 200000),
        uploadDate: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        category: ["sports", "church", "football", "entertainment"][
          Math.floor(Math.random() * 4)
        ] as VideoCategory,
        channelId: `channel-${Math.floor(Math.random() * 5) + 1}`,
        accessType:
          Math.random() > 0.5
            ? "free"
            : Math.random() > 0.5
            ? "pay-per-view"
            : "subscriber-only" as VideoAccessType,
        price: Math.floor(Math.random() * 50) + 10,
        isFree: Math.random() > 0.5,
      }));

      return {
        success: true,
        data: {
          videos,
          total: 50,
          page,
          limit,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to search videos",
      };
    }
  },
};

// Channel API
export const channelApi = {
  async getById(channelId: string): Promise<ApiResponse<ChannelResponse>> {
    try {
      await delay(600);

      // Mock channel details
      const channel = {
        id: channelId,
        name: "TESE Sports Channel",
        description: "Your premier destination for sports content.",
        avatar: "https://placehold.co/120x120/667eea/white?text=Channel",
        banner:
          "https://placehold.co/1200x300/764ba2/white?text=Channel+Banner",
        subscriberCount: 150000,
        isSubscribed: false,
        subscriptionPrice: 49,
        videos: Array.from({ length: 8 }, (_, i) => ({
          id: `channel-${channelId}-${i + 1}`,
          title: `Channel Video ${i + 1}`,
          description: `This is channel video ${i + 1} description.`,
          thumbnail: `https://placehold.co/280x160/f093fb/white?text=Channel+${
            i + 1
          }`,
          duration: Math.floor(Math.random() * 300 + 60).toString(),
          views: Math.floor(Math.random() * 100000),
          uploadDate: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
          category: "sports" as any,
          channelId: channelId,
          accessType:
            Math.random() > 0.5
              ? "free"
              : Math.random() > 0.5
              ? "pay-per-view"
              : "subscriber-only",
          price: Math.floor(Math.random() * 50) + 10,
          isFree: Math.random() > 0.5,
        })),
      };

      return {
        success: true,
        data: { channel },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch channel details",
      };
    }
  },

  async subscribe(channelId: string): Promise<ApiResponse<void>> {
    try {
      await delay(1000);

      // Mock subscription
      return {
        success: true,
        message: "Successfully subscribed to channel",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to subscribe to channel",
      };
    }
  },

  async unsubscribe(channelId: string): Promise<ApiResponse<void>> {
    try {
      await delay(800);

      // Mock unsubscription
      return {
        success: true,
        message: "Successfully unsubscribed from channel",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to unsubscribe from channel",
      };
    }
  },
};

// User API
export const userApi = {
  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    try {
      await delay(500);

      // Mock user profile
      const user = {
        id: "user-1",
        email: "demo@example.com",
        name: "Demo User",
        subscriptions: [],
        purchasedVideos: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      return {
        success: true,
        data: { user },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch user profile",
      };
    }
  },

  async purchaseVideo(videoId: string): Promise<ApiResponse<void>> {
    try {
      await delay(1500);

      // Mock video purchase
      return {
        success: true,
        message: "Video purchased successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to purchase video",
      };
    }
  },
};

// Categories API
export const categoryApi = {
  async getAll(): Promise<
    ApiResponse<{ categories: { id: string; name: string; slug: string }[] }>
  > {
    try {
      await delay(400);

      const categories = [
        { id: "sports", name: "Sports", slug: "sports" },
        { id: "church", name: "Church/Gospel", slug: "church" },
        { id: "football", name: "Football", slug: "football" },
        { id: "entertainment", name: "Entertainment", slug: "entertainment" },
        { id: "education", name: "Education", slug: "education" },
        { id: "news", name: "News", slug: "news" },
        { id: "music", name: "Music", slug: "music" },
        { id: "gaming", name: "Gaming", slug: "gaming" },
        { id: "lifestyle", name: "Lifestyle", slug: "lifestyle" },
      ];

      return {
        success: true,
        data: { categories },
      };
    } catch (error) {
      return {
        success: false,
        error: "Failed to fetch categories",
      };
    }
  },
};

// Error handling wrapper
export const handleApiError = (error: any): string => {
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return "An unexpected error occurred";
};
