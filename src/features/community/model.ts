// Community types and state models

// Backend-ready Community Post interface
export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
}

// Backend-ready Comment interface
export interface CommunityComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  postId: string;
  createdAt: string;
}

// Legacy Community Post interface (for backward compatibility)
export interface LegacyCommunityPost {
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

// Legacy Comment interface (for backward compatibility)
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
  totalComments: number;
  recentPosts: number;
}

export interface CommunityState {
  posts: CommunityPost[];
  comments: CommunityComment[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    tag: string;
    author: string;
  };
}

// Community API types
export interface CreatePostRequest {
  title: string;
  content: string;
  tags: string[];
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
  tags?: string[];
}

export interface CreateCommentRequest {
  content: string;
  postId: string;
}
