import { jsx, Fragment } from 'react/jsx-runtime';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

// 서버 컴포넌트 호환성을 위한 안전한 Context 생성
const SecureSessionContext = createContext({
    isAuthenticated: false,
});
const useSecureSession = () => {
    // 서버 사이드에서는 기본값 반환
    if (typeof window === 'undefined') {
        return { isAuthenticated: false };
    }
    // 전역 변수에서 먼저 확인
    if (typeof window !== 'undefined' && window.__NEXTAUTH_SECURE_AUTH_STATUS__ !== undefined) {
        return { isAuthenticated: window.__NEXTAUTH_SECURE_AUTH_STATUS__ };
    }
    const context = useContext(SecureSessionContext);
    if (context === undefined) {
        // Context가 없으면 전역 변수에서 확인
        const globalAuthStatus = window.__NEXTAUTH_SECURE_AUTH_STATUS__;
        return { isAuthenticated: globalAuthStatus || false };
    }
    return context;
};

// 서버 컴포넌트 호환성을 위한 동적 import 지원
function SecureSessionProvider({ children, isAuthenticated }) {
    // 클라이언트에서만 Context를 사용하도록 보장
    if (typeof window === 'undefined') {
        // 서버 사이드에서는 children만 반환
        return jsx(Fragment, { children: children });
    }
    return (jsx(SecureSessionContext.Provider, { value: { isAuthenticated }, children: children }));
}

var SecureSessionProvider$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SecureSessionProvider: SecureSessionProvider,
    default: SecureSessionProvider
});

// 서버 컴포넌트에서 안전하게 사용할 수 있는 래퍼
function DynamicSecureSessionProvider({ children, isAuthenticated }) {
    // 서버 사이드에서는 children만 반환
    if (typeof window === 'undefined') {
        return jsx(Fragment, { children: children });
    }
    // 클라이언트에서만 동적 import
    const [Provider, setProvider] = React.useState(null);
    React.useEffect(() => {
        Promise.resolve().then(function () { return SecureSessionProvider$1; }).then((module) => {
            setProvider(() => module.default || module.SecureSessionProvider);
        }).catch((error) => {
            console.error('Failed to load SecureSessionProvider:', error);
        });
    }, []);
    if (!Provider) {
        // Provider가 로드되지 않았으면 children만 반환
        return jsx(Fragment, { children: children });
    }
    return jsx(Provider, { isAuthenticated: isAuthenticated, children: children });
}

// Context 없이 작동하는 간단한 Provider
function SimpleSecureSessionProvider({ children, isAuthenticated }) {
    // 서버 사이드에서는 children만 반환
    if (typeof window === 'undefined') {
        return jsx(Fragment, { children: children });
    }
    // 클라이언트에서만 인증 상태를 전역 변수로 설정
    if (typeof window !== 'undefined') {
        window.__NEXTAUTH_SECURE_AUTH_STATUS__ = isAuthenticated;
    }
    return jsx(Fragment, { children: children });
}

function useAuthStatus(config) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const endpoint = (config === null || config === void 0 ? void 0 : config.authStatusEndpoint) || '/api/auth/status';
    const checkAuthStatus = async () => {
        // 서버 사이드에서는 실행하지 않음
        if (typeof window === 'undefined') {
            setIsLoading(false);
            return;
        }
        try {
            setIsLoading(true);
            setError(null);
            // 먼저 전역 변수에서 확인
            if (typeof window !== 'undefined' && window.__NEXTAUTH_SECURE_AUTH_STATUS__ !== undefined) {
                const globalAuthStatus = window.__NEXTAUTH_SECURE_AUTH_STATUS__;
                setIsAuthenticated(globalAuthStatus);
                if (config === null || config === void 0 ? void 0 : config.onAuthChange) {
                    config.onAuthChange(globalAuthStatus);
                }
                setIsLoading(false);
                return;
            }
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
            // 전역 변수에도 저장
            if (typeof window !== 'undefined') {
                window.__NEXTAUTH_SECURE_AUTH_STATUS__ = newAuthStatus;
            }
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
        // 클라이언트에서만 실행
        if (typeof window !== 'undefined') {
            checkAuthStatus();
        }
    }, [endpoint]);
    return {
        isAuthenticated,
        isLoading,
        error,
        refetch: checkAuthStatus,
    };
}

async function checkAuthStatus(config) {
    // 서버 사이드에서는 기본값 반환
    if (typeof window === 'undefined') {
        return { isAuthenticated: false };
    }
    const endpoint = (config === null || config === void 0 ? void 0 : config.authStatusEndpoint) || '/api/auth/status';
    try {
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
        return data;
    }
    catch (error) {
        console.error('Auth status check failed:', error);
        return { isAuthenticated: false };
    }
}
function createAuthStatusEndpoint(handler) {
    return async function authStatusHandler() {
        try {
            const result = await handler();
            return new Response(JSON.stringify(result), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        catch (error) {
            console.error('Auth status endpoint error:', error);
            return new Response(JSON.stringify({ isAuthenticated: false }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    };
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
/**
 * Server component helper that automatically redirects if not authenticated
 */
async function requireAuthOrRedirect(options, redirectTo = '/signin') {
    const isAuthenticated = await getAuthStatus(options);
    if (!isAuthenticated) {
        redirect(redirectTo);
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
            }
            catch (jsonError) {
                throw new Error('Invalid JSON response from auth API');
            }
            const { isAuthenticated } = authData;
            if (!isAuthenticated) {
                const loginUrl = new URL(loginPath, request.url);
                loginUrl.searchParams.set('callbackUrl', pathname);
                return NextResponse.redirect(loginUrl);
            }
        }
        catch (error) {
            console.error('Auth middleware error:', error);
            // If we can't check auth status, redirect to login for security
            const loginUrl = new URL(loginPath, request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    };
}

export { DynamicSecureSessionProvider, SecureSessionProvider, SimpleSecureSessionProvider, checkAuthStatus, createAuthMiddleware, createAuthStatusEndpoint, createAuthStatusResponse, getAuthStatus, requireAuth, requireAuthOrRedirect, useAuthStatus, useSecureSession };
//# sourceMappingURL=index.esm.js.map
