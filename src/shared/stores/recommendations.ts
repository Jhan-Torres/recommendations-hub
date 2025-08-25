import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Recommendation } from "@/features/recommendations";

export const useRecommendationsStore = defineStore("recommendations", () => {
  const recommendations = ref<Recommendation[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref({
    category: "all",
    priority: "all",
    search: "",
  });

  const filteredRecommendations = computed(() => {
    let filtered = recommendations.value;

    if (filters.value.category !== "all") {
      filtered = filtered.filter(
        (rec: Recommendation) => rec.category === filters.value.category
      );
    }

    if (filters.value.priority !== "all") {
      filtered = filtered.filter(
        (rec: Recommendation) => rec.priority === filters.value.priority
      );
    }

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase();
      filtered = filtered.filter(
        (rec: Recommendation) =>
          rec.title.toLowerCase().includes(search) ||
          rec.description.toLowerCase().includes(search)
      );
    }

    return filtered;
  });

  const addRecommendation = (
    recommendation: Omit<Recommendation, "id" | "createdAt" | "updatedAt">
  ) => {
    const newRecommendation: Recommendation = {
      ...recommendation,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    recommendations.value.push(newRecommendation);
  };

  const updateRecommendation = (
    id: string,
    updates: Partial<Recommendation>
  ) => {
    const index = recommendations.value.findIndex(
      (rec: Recommendation) => rec.id === id
    );
    if (index !== -1) {
      recommendations.value[index] = {
        ...recommendations.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    }
  };

  const deleteRecommendation = (id: string) => {
    const index = recommendations.value.findIndex(
      (rec: Recommendation) => rec.id === id
    );
    if (index !== -1) {
      recommendations.value.splice(index, 1);
    }
  };

  const loadRecommendations = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      // This will be replaced with actual API calls
      // For now, load from localStorage or use mock data
      const saved = localStorage.getItem("recommendations");
      if (saved) {
        recommendations.value = JSON.parse(saved);
      }
    } catch (err) {
      error.value = "Failed to load recommendations";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const saveRecommendations = () => {
    localStorage.setItem(
      "recommendations",
      JSON.stringify(recommendations.value)
    );
  };

  const setFilters = (newFilters: Partial<typeof filters.value>) => {
    filters.value = { ...filters.value, ...newFilters };
  };

  return {
    recommendations,
    isLoading,
    error,
    filters,
    filteredRecommendations,
    addRecommendation,
    updateRecommendation,
    deleteRecommendation,
    loadRecommendations,
    saveRecommendations,
    setFilters,
  };
});
