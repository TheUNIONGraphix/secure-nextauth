export interface AuthStatusResponse {
  isAuthenticated: boolean;
}

export interface SecureNextAuthConfig {
  authOptionsPath?: string;
  statusEndpoint?: string;
}

export interface AuthHookResult {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface SessionContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
} 