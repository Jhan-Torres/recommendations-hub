// Recommendations types and state models

// Backend-ready Recommendation interface
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Legacy Recommendation interface (for backward compatibility)
export interface LegacyRecommendation {
  id: string;
  category: "film" | "series" | "anime";
  name: string;
  genre: string;
  rating: number; // 1-5 stars
  createdAt: Date;
}

export interface RecommendationStats {
  total: number;
  byCategory: {
    [key: string]: number;
  };
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
  byStatus: {
    pending: number;
    "in-progress": number;
    completed: number;
  };
}

export interface RecommendationsState {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    priority: string;
    search: string;
  };
}

// Recommendations API types
export interface CreateRecommendationRequest {
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
  tags: string[];
}

export interface UpdateRecommendationRequest {
  title?: string;
  description?: string;
  category?: string;
  priority?: "low" | "medium" | "high";
  status?: "pending" | "in-progress" | "completed";
  tags?: string[];
}
