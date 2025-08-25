import { useAuthStore } from "@/shared";
import { storeToRefs } from "pinia";

export function useAuth() {
  const store = useAuthStore();
  const { user, token, isLoading, isAuthenticated, error } = storeToRefs(store);

  const {
    login,
    register,
    logout,
    initializeAuth,
    getCurrentUser,
    updateProfile,
    clearError,
    verifyEmail,
    resendVerificationCode,
  } = store;

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
    initializeAuth,
    getCurrentUser,
    updateProfile,
    clearError,
    verifyEmail,
    resendVerificationCode,
  };
}
