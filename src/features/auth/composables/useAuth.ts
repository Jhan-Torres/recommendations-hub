import { useAuthStore } from "@/shared";
import { storeToRefs } from "pinia";

export function useAuth() {
  const store = useAuthStore();
  const { user, token, isLoading, isAuthenticated } = storeToRefs(store);

  const { login, logout, initializeAuth } = store;

  return {
    // State
    user,
    token,
    isLoading,
    isAuthenticated,

    // Actions
    login,
    logout,
    initializeAuth,
  };
}
