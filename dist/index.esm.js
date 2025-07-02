import { jsx } from 'react/jsx-runtime';
import { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext(undefined);
const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionContextProvider');
    }
    return context;
};

function SessionContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // 인증 상태 확인
    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/auth/status');
            if (response.ok) {
                const data = await response.json();
                setIsAuthenticated(data.isAuthenticated);
            }
        }
        catch (error) {
            console.error('Auth status check failed:', error);
            setIsAuthenticated(false);
        }
        finally {
            setIsLoading(false);
        }
    };
    // 로그인 함수
    const login = async () => {
        try {
            // NextAuth 로그인 페이지로 리다이렉트
            window.location.href = '/api/auth/signin';
        }
        catch (error) {
            console.error('Login failed:', error);
        }
    };
    // 로그아웃 함수
    const logout = async () => {
        try {
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
            });
            if (response.ok) {
                setIsAuthenticated(false);
                // 로그아웃 후 홈페이지로 리다이렉트
                window.location.href = '/';
            }
        }
        catch (error) {
            console.error('Logout failed:', error);
        }
    };
    useEffect(() => {
        checkAuthStatus();
    }, []);
    const value = {
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
    return (jsx(SessionContext.Provider, { value: value, children: children }));
}

export { SessionContextProvider, useSession };
//# sourceMappingURL=index.esm.js.map
