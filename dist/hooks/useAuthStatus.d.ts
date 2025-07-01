import { SecureNextAuthConfig } from '../types';
export declare function useAuthStatus(config?: SecureNextAuthConfig): {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};
