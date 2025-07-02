import React from 'react';
interface SessionContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}
declare const SessionContext: React.Context<SessionContextType | undefined>;
export declare const useSession: () => SessionContextType;
export { SessionContext };
