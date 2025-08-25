import { defineStore } from "pinia";
import { ref } from "vue";
import type { WatchListItem } from "@/features/watchlist";

export const useWatchlistStore = defineStore("watchlist", () => {
  const watchlist = ref<WatchListItem[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const addToWatchlist = (item: Omit<WatchListItem, "id" | "createdAt">) => {
    const newItem: WatchListItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    watchlist.value.push(newItem);
    saveWatchlist();
  };

  const removeFromWatchlist = (id: string) => {
    const index = watchlist.value.findIndex(
      (item: WatchListItem) => item.id === id
    );
    if (index !== -1) {
      watchlist.value.splice(index, 1);
      saveWatchlist();
    }
  };

  const isInWatchlist = (recommendationId: string) => {
    return watchlist.value.some(
      (item: WatchListItem) => item.recommendationId === recommendationId
    );
  };

  const loadWatchlist = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const saved = localStorage.getItem("watchlist");
      if (saved) {
        watchlist.value = JSON.parse(saved);
      }
    } catch (err) {
      error.value = "Failed to load watchlist";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const saveWatchlist = () => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist.value));
  };

  return {
    watchlist,
    isLoading,
    error,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    loadWatchlist,
    saveWatchlist,
  };
});
