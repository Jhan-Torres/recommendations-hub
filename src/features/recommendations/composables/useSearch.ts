import { computed } from "vue";
import { useRecommendationsStore } from "@/shared";

export function useSearch() {
  const store = useRecommendationsStore();

  const setSearchQuery = (query: string) => {
    store.setFilters({ search: query });
  };

  const setCategory = (category: string) => {
    store.setFilters({ category });
  };

  const setPriority = (priority: string) => {
    store.setFilters({ priority });
  };

  const clearFilters = () => {
    store.setFilters({
      search: "",
      category: "all",
      priority: "all",
    });
  };

  return {
    searchQuery: computed(() => store.filters.search),
    selectedCategory: computed(() => store.filters.category),
    selectedPriority: computed(() => store.filters.priority),
    filteredRecommendations: computed(() => store.filteredRecommendations),
    setSearchQuery,
    setCategory,
    setPriority,
    clearFilters,
  };
}
