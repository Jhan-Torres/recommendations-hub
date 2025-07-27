// WatchList types and state models
export interface WatchListItem {
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
  pending: number;
  completed: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}

export interface WatchListState {
  items: WatchListItem[];
  loading: boolean;
  selectedPriority: string;
}
