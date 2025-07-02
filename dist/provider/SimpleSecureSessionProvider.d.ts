import React from 'react';
interface SimpleSecureSessionProviderProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}
export declare function SimpleSecureSessionProvider({ children, isAuthenticated }: SimpleSecureSessionProviderProps): React.ReactNode;
export {};
