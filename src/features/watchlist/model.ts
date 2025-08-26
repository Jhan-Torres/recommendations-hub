// WatchList types and state models

// Backend-ready WatchList Item interface
export interface WatchListItem {
  id: string;
  recommendationId: string;
  userId: string;
  createdAt: string;
  recommendation?: {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: "low" | "medium" | "high";
    rating?: number | string;
  };
}

// Legacy WatchList Item interface (for backward compatibility)
export interface LegacyWatchListItem {
  id: string;
  category: "film" | "series" | "anime";
  name: string;
  genre: string;
  priority: "high" | "medium" | "low";
  notes: string;
  createdAt: Date;
  completed?: boolean;
}

export interface WatchListStats {
  total: number;
  byRecommendationCategory: {
    [key: string]: number;
  };
  recentlyAdded: number;
}

export interface WatchListState {
  items: WatchListItem[];
  loading: boolean;
  error: string | null;
}

// WatchList API types
export interface AddToWatchListRequest {
  recommendationId: string;
}

export interface WatchListResponse {
  id: string;
  recommendationId: string;
  userId: string;
  createdAt: string;
}
