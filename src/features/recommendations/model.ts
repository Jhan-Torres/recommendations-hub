// Recommendations types and state models
export interface Recommendation {
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
    film: number;
    series: number;
    anime: number;
  };
  averageRating: number;
}

export interface RecommendationsState {
  recommendations: Recommendation[];
  loading: boolean;
  selectedCategory: string;
  searchQuery: string;
}
