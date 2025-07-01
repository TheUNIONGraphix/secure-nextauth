import { NextAuthOptions } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
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
/**
 * Server component helper that automatically redirects if not authenticated
 */
export declare function requireAuthOrRedirect(options: NextAuthOptions, redirectTo?: string): Promise<void>;
/**
 * Creates a middleware function for protecting routes
 */
export declare function createAuthMiddleware(protectedPaths: string[], loginPath?: string): (request: NextRequest) => Promise<NextResponse<unknown>>;
