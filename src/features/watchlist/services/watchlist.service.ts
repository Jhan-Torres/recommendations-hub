import { apiClient } from "@/shared";
import type { ApiResponse } from "@/shared";
import type { WatchListItem } from "@/features/watchlist";

export class WatchlistService {
  async getWatchlist(): Promise<WatchListItem[]> {
    const response = await apiClient.get<ApiResponse<WatchListItem[]>>(
      "/watchlist"
    );
    return response.data.data;
  }

  async addToWatchlist(
    data: Omit<WatchListItem, "id" | "createdAt">
  ): Promise<WatchListItem> {
    const response = await apiClient.post<ApiResponse<WatchListItem>>(
      "/watchlist",
      data
    );
    return response.data.data;
  }

  async removeFromWatchlist(id: string): Promise<void> {
    await apiClient.delete(`/watchlist/${id}`);
  }

  async isInWatchlist(recommendationId: string): Promise<boolean> {
    const response = await apiClient.get<ApiResponse<{ exists: boolean }>>(
      `/watchlist/check/${recommendationId}`
    );
    return response.data.data.exists;
  }
}

export const watchlistService = new WatchlistService();
