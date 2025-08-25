import { apiClient } from "@/shared";
import type { ApiResponse } from "@/shared";
import type { Recommendation } from "@/features/recommendations";

export class RecommendationsService {
  async getRecommendations(): Promise<Recommendation[]> {
    const response = await apiClient.get<ApiResponse<Recommendation[]>>(
      "/recommendations"
    );
    return response.data.data;
  }

  async getRecommendation(id: string): Promise<Recommendation> {
    const response = await apiClient.get<ApiResponse<Recommendation>>(
      `/recommendations/${id}`
    );
    return response.data.data;
  }

  async createRecommendation(
    data: Omit<Recommendation, "id" | "createdAt" | "updatedAt">
  ): Promise<Recommendation> {
    const response = await apiClient.post<ApiResponse<Recommendation>>(
      "/recommendations",
      data
    );
    return response.data.data;
  }

  async updateRecommendation(
    id: string,
    data: Partial<Recommendation>
  ): Promise<Recommendation> {
    const response = await apiClient.put<ApiResponse<Recommendation>>(
      `/recommendations/${id}`,
      data
    );
    return response.data.data;
  }

  async deleteRecommendation(id: string): Promise<void> {
    await apiClient.delete(`/recommendations/${id}`);
  }

  async searchRecommendations(query: string): Promise<Recommendation[]> {
    const response = await apiClient.get<ApiResponse<Recommendation[]>>(
      "/recommendations/search",
      {
        params: { q: query },
      }
    );
    return response.data.data;
  }
}

export const recommendationsService = new RecommendationsService();
