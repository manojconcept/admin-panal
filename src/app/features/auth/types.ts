export interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }