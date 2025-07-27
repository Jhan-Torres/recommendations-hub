import { ref, watch } from "vue";
import type { Recommendation } from "./model";

const STORAGE_KEY = "recommendations";

export function useRecommendations() {
  const recommendations = ref<Recommendation[]>([]);

  // Load from localStorage
  const loadRecommendations = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        recommendations.value = parsed.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
      }
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    }
  };

  // Save to localStorage
  const saveRecommendations = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recommendations.value));
    } catch (error) {
      console.error("Failed to save recommendations:", error);
    }
  };

  // Add recommendation
  const addRecommendation = (
    recommendation: Omit<Recommendation, "id" | "createdAt">
  ) => {
    const newRecommendation: Recommendation = {
      ...recommendation,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    recommendations.value.unshift(newRecommendation);
  };

  // Delete recommendation
  const deleteRecommendation = (id: string) => {
    const index = recommendations.value.findIndex((r) => r.id === id);
    if (index > -1) {
      recommendations.value.splice(index, 1);
    }
  };

  // Watch for changes and save
  watch(recommendations, saveRecommendations, { deep: true });

  // Load on initialization
  loadRecommendations();

  return {
    recommendations,
    addRecommendation,
    deleteRecommendation,
  };
}
