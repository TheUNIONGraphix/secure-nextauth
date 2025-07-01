'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var nextAuth = require('next-auth');

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
            const data = await response.json();
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

exports.SecureSessionContext = SecureSessionContext;
exports.SecureSessionProvider = SecureSessionProvider;
exports.createAuthStatusResponse = createAuthStatusResponse;
exports.getAuthStatus = getAuthStatus;
exports.requireAuth = requireAuth;
exports.useAuthStatus = useAuthStatus;
exports.useSecureSession = useSecureSession;
//# sourceMappingURL=index.js.map
