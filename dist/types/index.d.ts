import { ReactNode } from 'react';
export interface SecureSessionContextType {
    isAuthenticated: boolean;
}
export interface SecureSessionProviderProps {
    children: ReactNode;
    isAuthenticated: boolean;
}
export interface AuthStatusResponse {
    isAuthenticated: boolean;
}
export interface SecureNextAuthConfig {
    authStatusEndpoint?: string;
    onAuthChange?: (isAuthenticated: boolean) => void;
}
export interface AuthHookResult {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}
