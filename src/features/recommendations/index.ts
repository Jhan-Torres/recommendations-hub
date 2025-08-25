// Feature: Recommendations - Barrel exports
export * from "./model";
export * from "./logic";

// Export new composables
export { useRecommendations } from "./composables/useRecommendations";
export { useSearch } from "./composables/useSearch";

// Export services
export { recommendationsService } from "./services/recommendations.service";

// Legacy exports (for backward compatibility during migration)
export { useRecommendations as useRecommendationsLegacy } from "./useRecommendations";
export { useSearch as useSearchLegacy } from "./useSearch";
