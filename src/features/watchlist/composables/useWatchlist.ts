import { useWatchlistStore } from "@/shared";
import { storeToRefs } from "pinia";

export function useWatchlist() {
  const store = useWatchlistStore();
  const { watchlist, isLoading, error } = storeToRefs(store);

  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    loadWatchlist,
    saveWatchlist,
  } = store;

  return {
    // State
    watchlist,
    isLoading,
    error,

    // Actions
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    loadWatchlist,
    saveWatchlist,
  };
}
