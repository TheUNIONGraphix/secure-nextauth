import React from 'react';
interface DynamicSecureSessionProviderProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}
export declare function DynamicSecureSessionProvider({ children, isAuthenticated }: DynamicSecureSessionProviderProps): React.ReactNode;
export {};
