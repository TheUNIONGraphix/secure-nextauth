'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

const SessionContext = react.createContext(undefined);
const useSession = () => {
    const context = react.useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionContextProvider');
    }
    return context;
};

function SessionContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = react.useState(false);
    const [isLoading, setIsLoading] = react.useState(true);
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
                window.location.href = '/';
            }
        }
        catch (error) {
            console.error('Logout failed:', error);
        }
    };
    react.useEffect(() => {
        checkAuthStatus();
    }, []);
    const value = {
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
    return (jsxRuntime.jsx(SessionContext.Provider, { value: value, children: children }));
}

exports.SessionContextProvider = SessionContextProvider;
exports.useSession = useSession;
//# sourceMappingURL=index.js.map
