// Product/Recommendation types and state models
export interface Recommendation {
  id: string;
  category: "film" | "series" | "anime";
  name: string;
  genre: string;
  rating: number; // 1-5 stars
  createdAt: Date;
}

export interface WatchListItem {
  id: string;
  category: "film" | "series" | "anime";
  name: string;
  genre: string;
  priority: "high" | "medium" | "low";
  notes: string;
  createdAt: Date;
}

export interface CommunityPost {
  id: string;
  title: string;
  description: string;
  name: string;
  category: "film" | "series" | "anime";
  genre: string;
  rating: number;
  author: string;
  likes: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: Date;
}

export interface RecommendationsState {
  recommendations: Recommendation[];
  watchList: WatchListItem[];
  communityPosts: CommunityPost[];
  loading: boolean;
}
