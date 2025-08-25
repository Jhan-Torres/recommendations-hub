// Shared/Global types used across features
export interface BaseEntity {
  id: string;
  createdAt: Date;
}

// Global UI types
export type Category = "film" | "series" | "anime";
export type Priority = "high" | "medium" | "low";
export type Theme = "light" | "dark";
export type Language = "en" | "es" | "fr" | "de" | "pt";

// Legacy User interface for UI components
export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

// Shared API response structure (legacy for backward compatibility)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

// Export all API types (shared base types)
export * from "./api";
