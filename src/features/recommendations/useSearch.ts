import { ref, computed, type Ref } from "vue";
import type { Recommendation } from "./model";

export function useSearch(recommendations: Ref<Recommendation[]>) {
  const searchQuery = ref("");
  const selectedCategory = ref("all");

  const filteredRecommendations = computed(() => {
    let filtered = recommendations.value;

    // Filter by category
    if (selectedCategory.value !== "all") {
      filtered = filtered.filter((r) => r.category === selectedCategory.value);
    }

    // Filter by search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.genre.toLowerCase().includes(query)
      );
    }

    return filtered;
  });

  return {
    searchQuery,
    selectedCategory,
    filteredRecommendations,
  };
}
