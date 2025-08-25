import { useRecommendationsStore } from "@/shared";
import { storeToRefs } from "pinia";

export function useRecommendations() {
  const store = useRecommendationsStore();
  const {
    recommendations,
    isLoading,
    error,
    filters,
    filteredRecommendations,
  } = storeToRefs(store);

  const {
    addRecommendation,
    updateRecommendation,
    deleteRecommendation,
    loadRecommendations,
    saveRecommendations,
    setFilters,
  } = store;

  return {
    // State
    recommendations,
    isLoading,
    error,
    filters,
    filteredRecommendations,

    // Actions
    addRecommendation,
    updateRecommendation,
    deleteRecommendation,
    loadRecommendations,
    saveRecommendations,
    setFilters,
  };
}
