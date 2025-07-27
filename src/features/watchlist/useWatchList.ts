import { ref, watch } from "vue";
import type { WatchListItem } from "./model";

const STORAGE_KEY = "watchlist";

export function useWatchList() {
  const watchList = ref<WatchListItem[]>([]);

  // Load from localStorage
  const loadWatchList = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        watchList.value = parsed.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
      }
    } catch (error) {
      console.error("Failed to load watch list:", error);
    }
  };

  // Save to localStorage
  const saveWatchList = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchList.value));
    } catch (error) {
      console.error("Failed to save watch list:", error);
    }
  };

  // Add to watch list
  const addToWatchList = (item: Omit<WatchListItem, "id" | "createdAt">) => {
    const newItem: WatchListItem = {
      ...item,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    watchList.value.unshift(newItem);
  };

  // Delete watch list item
  const deleteWatchListItem = (id: string) => {
    const index = watchList.value.findIndex((item) => item.id === id);
    if (index > -1) {
      watchList.value.splice(index, 1);
    }
  };

  // Mark as watched (removes from watch list and optionally adds to recommendations)
  const markAsWatched = (id: string) => {
    const item = watchList.value.find((item) => item.id === id);
    if (item) {
      // Remove from watch list
      deleteWatchListItem(id);

      // You could add logic here to automatically add to recommendations
      // with a default rating or prompt the user to rate it
    }
  };

  // Watch for changes and save
  watch(watchList, saveWatchList, { deep: true });

  // Load on initialization
  loadWatchList();

  return {
    watchList,
    addToWatchList,
    deleteWatchListItem,
    markAsWatched,
  };
}
