// WatchList business logic and composables
import { ref, computed } from "vue";
import type { WatchListItem } from "./model";

export const useWatchList = () => {
  const watchList = ref<WatchListItem[]>([]);
  const loading = ref(false);

  const addToWatchList = (item: Omit<WatchListItem, "id" | "createdAt">) => {
    // Logic will be implemented here
  };

  const deleteWatchListItem = (id: string) => {
    // Logic will be implemented here
  };

  const markAsWatched = (id: string) => {
    // Logic will be implemented here
  };

  const getWatchListStats = computed(() => {
    // Calculate stats logic will be implemented here
    return {
      total: watchList.value.length,
      pending: 0,
      completed: 0,
      byPriority: {
        high: 0,
        medium: 0,
        low: 0,
      },
    };
  });

  return {
    watchList,
    loading,
    addToWatchList,
    deleteWatchListItem,
    markAsWatched,
    getWatchListStats,
  };
};
