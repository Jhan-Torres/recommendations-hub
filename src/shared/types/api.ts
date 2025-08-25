// Base API response structure - shared across all features
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Base entity interface - shared pattern for all entities
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// API Error interface - shared error structure
export interface ApiError {
  message: string;
  code: string;
  details?: any;
}

// Pagination interfaces - shared across features
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
