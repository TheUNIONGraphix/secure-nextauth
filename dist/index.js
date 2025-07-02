'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var nextAuth = require('next-auth');
var navigation = require('next/navigation');
var server = require('next/server');

const SecureSessionContext = react.createContext({
    isAuthenticated: false,
});
const useSecureSession = () => {
    const context = react.useContext(SecureSessionContext);
    if (context === undefined) {
        throw new Error('useSecureSession must be used within a SecureSessionProvider');
    }
    return context;
};

function useAuthStatus(config) {
    const [isAuthenticated, setIsAuthenticated] = react.useState(false);
    const [isLoading, setIsLoading] = react.useState(true);
    const [error, setError] = react.useState(null);
    const endpoint = (config === null || config === void 0 ? void 0 : config.authStatusEndpoint) || '/api/auth/status';
    const checkAuthStatus = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not JSON');
            }
            let data;
            try {
                data = await response.json();
            }
            catch (jsonError) {
                throw new Error('Invalid JSON response');
            }
            const newAuthStatus = data.isAuthenticated;
            setIsAuthenticated(newAuthStatus);
            // Call the optional callback
            if (config === null || config === void 0 ? void 0 : config.onAuthChange) {
                config.onAuthChange(newAuthStatus);
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to check auth status';
            setError(errorMessage);
            setIsAuthenticated(false);
        }
        finally {
            setIsLoading(false);
        }
    };
    react.useEffect(() => {
        checkAuthStatus();
    }, [endpoint]);
    return {
        isAuthenticated,
        isLoading,
        error,
        refetch: checkAuthStatus,
    };
}

function SecureSessionProvider({ children, isAuthenticated }) {
    return (jsxRuntime.jsx(SecureSessionContext.Provider, { value: { isAuthenticated }, children: children }));
}

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

exports.SecureSessionContext = SecureSessionContext;
exports.SecureSessionProvider = SecureSessionProvider;
exports.createAuthMiddleware = createAuthMiddleware;
exports.createAuthStatusResponse = createAuthStatusResponse;
exports.getAuthStatus = getAuthStatus;
exports.requireAuth = requireAuth;
exports.requireAuthOrRedirect = requireAuthOrRedirect;
exports.useAuthStatus = useAuthStatus;
exports.useSecureSession = useSecureSession;
//# sourceMappingURL=index.js.map
