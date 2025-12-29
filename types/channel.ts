import { Video } from './video'

export interface Channel {
  id: string
  name: string
  description: string
  avatar: string
  banner: string
  subscriberCount: number
  isSubscribed: boolean
  subscriptionPrice: number
  videos: Video[]
}

export interface ChannelStats {
  totalVideos: number
  totalSubscribers: number
  totalRevenue: number
  averageViews: number
}

export interface ChannelSubscription {
  channelId: string
  userId: string
  startDate: string
  endDate: string
  isActive: boolean
}