// Auth types and state models
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
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
