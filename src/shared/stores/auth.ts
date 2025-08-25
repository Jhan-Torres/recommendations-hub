import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile } from "@/features/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserProfile | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!token.value && !!user.value);

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    try {
      // This will be replaced with actual API calls
      // For now, simulate login using the provided credentials
      console.log("Simulating login with:", { email, password });
      token.value = "mock-token";
      user.value = {
        id: "1",
        email,
        name: "User Name",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("auth_token", token.value);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("auth_token");
  };

  const initializeAuth = () => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      token.value = savedToken;
      // In real implementation, validate token with backend
    }
  };

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    initializeAuth,
  };
});
