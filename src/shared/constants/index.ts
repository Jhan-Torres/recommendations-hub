// Application constants
export const CATEGORIES = ["film", "series", "anime"] as const;
export const PRIORITIES = ["high", "medium", "low"] as const;
export const THEMES = ["light", "dark"] as const;
export const LANGUAGES = ["en", "es", "fr", "de", "pt"] as const;

export const STORAGE_KEYS = {
  RECOMMENDATIONS: "recommendations",
  WATCHLIST: "watchlist",
  THEME: "theme",
  LANGUAGE: "language",
  USER_PREFERENCES: "userPreferences",
} as const;

export const API_ENDPOINTS = {
  RECOMMENDATIONS: "/api/recommendations",
  WATCHLIST: "/api/watchlist",
  COMMUNITY: "/api/community",
  USERS: "/api/users",
} as const;

export const GENRE_OPTIONS = [
  "action",
  "adventure",
  "comedy",
  "drama",
  "fantasy",
  "horror",
  "mystery",
  "romance",
  "sci-fi",
  "thriller",
  "documentary",
  "animation",
] as const;
