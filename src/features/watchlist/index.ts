// Feature: WatchList - Barrel exports
export * from "./model";
export * from "./logic";

// Export new composables
export { useWatchlist } from "./composables/useWatchlist";

// Export services
export { watchlistService } from "./services/watchlist.service";

// Legacy exports (for backward compatibility during migration)
export { useWatchList } from "./useWatchList";
