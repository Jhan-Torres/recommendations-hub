// Common API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
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

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

// Base entity types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Query interfaces
export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface SearchQuery {
  search?: string;
}

export interface FilterQuery {
  filter?: string;
  category?: string;
  genre?: string;
}

export type BaseQuery = PaginationQuery & SearchQuery & FilterQuery;
