export interface Recommendation {
  id: string
  category: 'film' | 'series' | 'anime'
  name: string
  genre: string
  rating: number // 1-5 stars
  createdAt: Date
}

export interface WatchListItem {
  id: string
  category: 'film' | 'series' | 'anime'
  name: string
  genre: string
  priority: 'high' | 'medium' | 'low'
  notes: string
  createdAt: Date
}

export interface CommunityPost {
  id: string
  title: string
  category: 'film' | 'series' | 'anime'
  name: string
  genre: string
  rating: number // 1-5 stars
  author: string
  description: string
  likes: number
  comments: number
  createdAt: Date
  isLiked: boolean
  isSaved: boolean
}