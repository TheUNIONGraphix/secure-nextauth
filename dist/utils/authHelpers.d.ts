import { NextAuthOptions } from 'next-auth';
/**
 * Server-side helper to get authentication status
 * This should be used in your API route or server components
 */
export declare function getAuthStatus(options: NextAuthOptions): Promise<boolean>;
/**
 * Helper to create a standardized auth status API response
 */
export declare function createAuthStatusResponse(isAuthenticated: boolean): {
    isAuthenticated: boolean;
};
/**
 * Middleware helper to check if user is authenticated
 */
export declare function requireAuth(isAuthenticated: boolean, redirectUrl?: string): {
    redirect: {
        destination: string;
        permanent: boolean;
    };
} | null;
