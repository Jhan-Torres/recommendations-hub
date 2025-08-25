import { apiClient } from "@/shared";
import type { ApiResponse } from "@/shared";
import type {
  UserProfile,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "@/features/auth";

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      credentials
    );
    return response.data.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      data
    );
    return response.data.data;
  }

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  }

  async getCurrentUser(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>("/auth/me");
    return response.data.data;
  }

  async refreshToken(): Promise<{ token: string }> {
    const response = await apiClient.post<ApiResponse<{ token: string }>>(
      "/auth/refresh"
    );
    return response.data.data;
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await apiClient.put<ApiResponse<UserProfile>>(
      "/auth/profile",
      data
    );
    return response.data.data;
  }
}

export const authService = new AuthService();
