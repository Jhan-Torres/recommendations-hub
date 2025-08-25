// Auth types and state models

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User Profile interface (backend-ready)
export interface UserProfile extends BaseEntity {
  email: string;
  name: string;
  avatar?: string;
}

// Legacy User interface (for backward compatibility)
export interface User {
  id: string;
  email: string;
  name: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: string;
  theme: "light" | "dark";
  notifications: boolean;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Auth-specific API types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
}
