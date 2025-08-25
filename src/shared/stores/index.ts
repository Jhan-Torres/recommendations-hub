import { createPinia } from "pinia";

export const pinia = createPinia();

// Export individual stores
export { useAuthStore } from "./auth";
export { useRecommendationsStore } from "./recommendations";
export { useWatchlistStore } from "./watchlist";
