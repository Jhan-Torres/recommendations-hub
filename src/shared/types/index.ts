// Shared/Global types used across features
export interface BaseEntity {
  id: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export type Category = "film" | "series" | "anime";
export type Priority = "high" | "medium" | "low";
export type Theme = "light" | "dark";
export type Language = "en" | "es" | "fr" | "de" | "pt";

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
