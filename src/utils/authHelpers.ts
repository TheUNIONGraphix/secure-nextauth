import { getServerSession } from 'next-auth';
import { NextAuthOptions } from 'next-auth';

/**
 * Server-side helper to get authentication status
 * This should be used in your API route or server components
 */
export async function getAuthStatus(options: NextAuthOptions): Promise<boolean> {
  try {
    const session = await getServerSession(options);
    return !!session?.user;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
}

/**
 * Helper to create a standardized auth status API response
 */
export function createAuthStatusResponse(isAuthenticated: boolean) {
  return {
    isAuthenticated,
  };
}

/**
 * Middleware helper to check if user is authenticated
 */
export function requireAuth(isAuthenticated: boolean, redirectUrl?: string) {
  if (!isAuthenticated) {
    if (redirectUrl) {
      return {
        redirect: {
          destination: redirectUrl,
          permanent: false,
        },
      };
    }
    throw new Error('Authentication required');
  }
  return null;
}
