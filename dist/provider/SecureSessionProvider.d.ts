import React from "react";
interface SecureSessionProviderProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
}
export declare function SecureSessionProvider({ children, isAuthenticated }: SecureSessionProviderProps): React.ReactNode;
export default SecureSessionProvider;
