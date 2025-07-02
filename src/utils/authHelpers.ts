import { getServerSession } from 'next-auth';
import { NextAuthOptions } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

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

/**
 * Server component helper that automatically redirects if not authenticated
 */
export async function requireAuthOrRedirect(
  options: NextAuthOptions,
  redirectTo: string = '/signin'
): Promise<void> {
  const isAuthenticated = await getAuthStatus(options);
  if (!isAuthenticated) {
    redirect(redirectTo);
  }
}

/**
 * Creates a middleware function for protecting routes
 */
export function createAuthMiddleware(
  protectedPaths: string[],
  loginPath: string = '/signin'
) {
  return async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Check if the current path should be protected
    const isProtectedPath = protectedPaths.some(path => 
      pathname.startsWith(path) || pathname === path
    );
    
    if (!isProtectedPath) {
      return NextResponse.next();
    }

    // Check authentication status by calling the auth status API
    try {
      const authResponse = await fetch(new URL('/api/auth/status', request.url));
      
      if (!authResponse.ok) {
        throw new Error(`Auth API error: ${authResponse.status}`);
      }
      
      // Check if response is JSON
      const contentType = authResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Auth API response is not JSON');
      }
      
      let authData;
      try {
        authData = await authResponse.json();
      } catch (jsonError) {
        throw new Error('Invalid JSON response from auth API');
      }
      
      const { isAuthenticated } = authData;

      if (!isAuthenticated) {
        const loginUrl = new URL(loginPath, request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error('Auth middleware error:', error);
      // If we can't check auth status, redirect to login for security
      const loginUrl = new URL(loginPath, request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  };
}
