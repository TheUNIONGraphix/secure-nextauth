'use strict';

var nextAuth = require('next-auth');
var navigation = require('next/navigation');
var server = require('next/server');
var fs = require('fs');
var path = require('path');

/**
 * Server-side helper to get authentication status
 * This should be used in your API route or server components
 */
async function getAuthStatus(options) {
    try {
        const session = await nextAuth.getServerSession(options);
        return !!(session === null || session === void 0 ? void 0 : session.user);
    }
    catch (error) {
        console.error('Error checking auth status:', error);
        return false;
    }
}
/**
 * Helper to create a standardized auth status API response
 */
function createAuthStatusResponse(isAuthenticated) {
    return {
        isAuthenticated,
    };
}
/**
 * Middleware helper to check if user is authenticated
 */
function requireAuth(isAuthenticated, redirectUrl) {
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
async function requireAuthOrRedirect(options, redirectTo = '/signin') {
    const isAuthenticated = await getAuthStatus(options);
    if (!isAuthenticated) {
        navigation.redirect(redirectTo);
    }
}
/**
 * Creates a middleware function for protecting routes
 */
function createAuthMiddleware(protectedPaths, loginPath = '/signin') {
    return async function middleware(request) {
        const { pathname } = request.nextUrl;
        // Check if the current path should be protected
        const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path) || pathname === path);
        if (!isProtectedPath) {
            return server.NextResponse.next();
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
            }
            catch (jsonError) {
                throw new Error('Invalid JSON response from auth API');
            }
            const { isAuthenticated } = authData;
            if (!isAuthenticated) {
                const loginUrl = new URL(loginPath, request.url);
                loginUrl.searchParams.set('callbackUrl', pathname);
                return server.NextResponse.redirect(loginUrl);
            }
        }
        catch (error) {
            console.error('Auth middleware error:', error);
            // If we can't check auth status, redirect to login for security
            const loginUrl = new URL(loginPath, request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return server.NextResponse.redirect(loginUrl);
        }
        return server.NextResponse.next();
    };
}

function generateAuthStatusAPI(options = {}) {
    const { projectRoot = process.cwd(), apiRoute = '/api/auth/status', authOptionsPath = '@/lib/auth' } = options;
    const apiContent = `import { getAuthStatus, createAuthStatusResponse } from 'nextauth-secure';
import { authOptions } from '${authOptionsPath}';

export async function GET() {
  try {
    const isAuthenticated = await getAuthStatus(authOptions);
    const response = createAuthStatusResponse(isAuthenticated);
    
    return Response.json(response);
  } catch (error) {
    console.error('Auth status API error:', error);
    return Response.json({ isAuthenticated: false }, { status: 500 });
  }
}
`;
    const apiPath = path.join(projectRoot, 'app', apiRoute.replace('/api/', ''), 'route.ts');
    const apiDir = path.dirname(apiPath);
    // 디렉토리 생성
    if (!fs.existsSync(apiDir)) {
        fs.mkdirSync(apiDir, { recursive: true });
    }
    // API 파일 생성
    fs.writeFileSync(apiPath, apiContent);
    return apiPath;
}
function generateAuthStatusComponent(options = {}) {
    const { projectRoot = process.cwd(), componentName = 'AuthStatus' } = options;
    const componentContent = `"use client";
import { useAuthStatus } from 'nextauth-secure';

export function ${componentName}() {
  const { isAuthenticated, isLoading, error } = useAuthStatus();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {isAuthenticated ? 'Authenticated' : 'Not authenticated'}
    </div>
  );
}
`;
    const componentPath = path.join(projectRoot, 'app', 'components', `${componentName}.tsx`);
    const componentDir = path.dirname(componentPath);
    // 디렉토리 생성
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
    }
    // 컴포넌트 파일 생성
    fs.writeFileSync(componentPath, componentContent);
    return componentPath;
}
function autoSetup(options = {}) {
    const apiPath = generateAuthStatusAPI(options);
    const componentPath = generateAuthStatusComponent(options);
    console.log('✅ Auto setup completed!');
    console.log(`📁 API route created: ${apiPath}`);
    console.log(`📁 Component created: ${componentPath}`);
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Import and use the component in your layout or pages');
    console.log('2. Make sure your authOptions are properly configured');
    console.log('3. The API route will be available at /api/auth/status');
    return { apiPath, componentPath };
}

exports.autoSetup = autoSetup;
exports.createAuthMiddleware = createAuthMiddleware;
exports.createAuthStatusResponse = createAuthStatusResponse;
exports.generateAuthStatusAPI = generateAuthStatusAPI;
exports.generateAuthStatusComponent = generateAuthStatusComponent;
exports.getAuthStatus = getAuthStatus;
exports.requireAuth = requireAuth;
exports.requireAuthOrRedirect = requireAuthOrRedirect;
//# sourceMappingURL=server.js.map
