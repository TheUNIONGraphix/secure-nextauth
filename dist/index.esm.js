import { createContext, useContext, useState, useEffect } from 'react';
import { jsx } from 'react/jsx-runtime';
import { getServerSession } from 'next-auth';

const SecureSessionContext = createContext({
    isAuthenticated: false,
});
const useSecureSession = () => {
    const context = useContext(SecureSessionContext);
    if (context === undefined) {
        throw new Error('useSecureSession must be used within a SecureSessionProvider');
    }
    return context;
};

function useAuthStatus(config) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
    useEffect(() => {
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
    return (jsx(SecureSessionContext.Provider, { value: { isAuthenticated }, children: children }));
}

/**
 * Server-side helper to get authentication status
 * This should be used in your API route or server components
 */
async function getAuthStatus(options) {
    try {
        const session = await getServerSession(options);
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

export { SecureSessionContext, SecureSessionProvider, createAuthStatusResponse, getAuthStatus, requireAuth, useAuthStatus, useSecureSession };
//# sourceMappingURL=index.esm.js.map
