import { apiClient } from "@/shared";
import type { ApiResponse } from "@/shared";
import type {
  CommunityPost,
  CommunityComment,
  CreatePostRequest,
  UpdatePostRequest,
  CreateCommentRequest,
} from "@/features/community";

export class CommunityService {
  async getPosts(): Promise<CommunityPost[]> {
    const response = await apiClient.get<ApiResponse<CommunityPost[]>>(
      "/community/posts"
    );
    return response.data.data;
  }

  async getPost(id: string): Promise<CommunityPost> {
    const response = await apiClient.get<ApiResponse<CommunityPost>>(
      `/community/posts/${id}`
    );
    return response.data.data;
  }

  async createPost(
    data: Omit<
      CommunityPost,
      "id" | "author" | "likes" | "comments" | "createdAt" | "updatedAt"
    >
  ): Promise<CommunityPost> {
    const response = await apiClient.post<ApiResponse<CommunityPost>>(
      "/community/posts",
      data
    );
    return response.data.data;
  }

  async updatePost(
    id: string,
    data: Partial<CommunityPost>
  ): Promise<CommunityPost> {
    const response = await apiClient.put<ApiResponse<CommunityPost>>(
      `/community/posts/${id}`,
      data
    );
    return response.data.data;
  }

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/community/posts/${id}`);
  }

  async likePost(id: string): Promise<void> {
    await apiClient.post(`/community/posts/${id}/like`);
  }

  async unlikePost(id: string): Promise<void> {
    await apiClient.delete(`/community/posts/${id}/like`);
  }

  async getComments(postId: string): Promise<CommunityComment[]> {
    const response = await apiClient.get<ApiResponse<CommunityComment[]>>(
      `/community/posts/${postId}/comments`
    );
    return response.data.data;
  }

  async createComment(
    postId: string,
    content: string
  ): Promise<CommunityComment> {
    const response = await apiClient.post<ApiResponse<CommunityComment>>(
      `/community/posts/${postId}/comments`,
      {
        content,
      }
    );
    return response.data.data;
  }

  async deleteComment(postId: string, commentId: string): Promise<void> {
    await apiClient.delete(`/community/posts/${postId}/comments/${commentId}`);
  }
}

export const communityService = new CommunityService();
