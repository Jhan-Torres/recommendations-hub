// Community types and state models
export interface CommunityPost {
  id: string;
  title: string;
  category: "film" | "series" | "anime";
  name: string;
  genre: string;
  rating: number; // 1-5 stars
  author: string;
  description: string;
  likes: number;
  comments: number;
  createdAt: Date;
  isLiked: boolean;
  isSaved: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  likes: number;
  isLiked: boolean;
  createdAt: Date;
}

export interface CommunityStats {
  totalPosts: number;
  totalLikes: number;
  savedPosts: number;
  myPosts: number;
}

export interface CommunityState {
  posts: CommunityPost[];
  comments: Comment[];
  loading: boolean;
  selectedFilter: string;
  searchQuery: string;
}
