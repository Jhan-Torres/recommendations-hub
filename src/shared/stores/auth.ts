import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  UserProfile,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  RegisterResponse,
  VerifyEmailResponse,
  ResendCodeResponse,
} from "@/features/auth";
import { AuthService } from "@/features/auth/services/auth.service";

const authService = new AuthService();

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserProfile | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const credentials: LoginCredentials = { email, password };
      const response: AuthResponse = await authService.login(credentials);

      token.value = response.token;
      user.value = response.user;

      // Store token in localStorage for persistence
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));

      return response;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Login failed";
      throw new Error(error.value || "Login failed");
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const registerData: RegisterData = { name, email, password };
      const response: RegisterResponse = await authService.register(
        registerData
      );

      // If email verification is required, don't set token yet
      if (response.emailVerificationRequired) {
        return {
          success: true,
          emailVerificationRequired: true,
          user: response.user,
          message: response.message,
        };
      }

      // If no verification required, proceed as normal
      if (response.token) {
        token.value = response.token;
        user.value = response.user;

        // Store token in localStorage for persistence
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("auth_user", JSON.stringify(response.user));
      }

      return response;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Registration failed";
      throw new Error(error.value || "Registration failed");
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      if (token.value) {
        await authService.logout();
      }
    } catch (err: any) {
      console.error("Logout error:", err);
      // Don't throw error for logout - we want to clear local state anyway
    } finally {
      // Clear local state regardless of API call success
      user.value = null;
      token.value = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      isLoading.value = false;
    }
  };

  const getCurrentUser = async () => {
    if (!token.value) return null;

    isLoading.value = true;
    error.value = null;

    try {
      const userProfile = await authService.getCurrentUser();
      user.value = userProfile;
      localStorage.setItem("auth_user", JSON.stringify(userProfile));
      return userProfile;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Failed to get user info";
      // If token is invalid, clear auth state
      if (err.response?.status === 401) {
        await logout();
      }
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const initializeAuth = async () => {
    // Temporary: Simulate being logged in for testing
    const mockUser = {
      id: "test-user-123",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const mockToken = "mock-jwt-token-123";

    // Set mock data
    token.value = mockToken;
    user.value = mockUser;
    localStorage.setItem("auth_token", mockToken);
    localStorage.setItem("auth_user", JSON.stringify(mockUser));

    // Original code (commented out for testing):
    // const savedToken = localStorage.getItem("auth_token");
    // const savedUser = localStorage.getItem("auth_user");

    // if (savedToken && savedUser) {
    //   try {
    //     token.value = savedToken;
    //     user.value = JSON.parse(savedUser);

    //     // Verify token is still valid by fetching current user
    //     await getCurrentUser();
    //   } catch (error) {
    //     console.error("Failed to initialize auth:", error);
    //     // Clear invalid auth data
    //     localStorage.removeItem("auth_token");
    //     localStorage.removeItem("auth_user");
    //     token.value = null;
    //     user.value = null;
    //   }
    // }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!token.value) throw new Error("Not authenticated");

    isLoading.value = true;
    error.value = null;

    try {
      const updatedUser = await authService.updateProfile(data);
      user.value = updatedUser;
      localStorage.setItem("auth_user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err: any) {
      error.value = err.response?.data?.message || "Profile update failed";
      throw new Error(error.value || "Profile update failed");
    } finally {
      isLoading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const verifyEmail = async (email: string, code: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response: VerifyEmailResponse = await authService.verifyEmail(
        email,
        code
      );

      if (response.success) {
        // After successful verification, we should get the user profile and token
        // For now, we'll just return success - the backend should handle the token generation
        return response;
      } else {
        throw new Error(response.message || "Email verification failed");
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || "Email verification failed";
      throw new Error(error.value || "Email verification failed");
    } finally {
      isLoading.value = false;
    }
  };

  const resendVerificationCode = async (email: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response: ResendCodeResponse =
        await authService.resendVerificationCode(email);
      return response;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to resend verification code";
      throw new Error(error.value || "Failed to resend verification code");
    } finally {
      isLoading.value = false;
    }
  };

  return {
    // State
    user,
    token,
    isLoading,
    isAuthenticated,
    error,

    // Actions
    login,
    register,
    logout,
    getCurrentUser,
    initializeAuth,
    updateProfile,
    clearError,
    verifyEmail,
    resendVerificationCode,
  };
});
