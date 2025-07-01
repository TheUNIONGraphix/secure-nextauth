'use client';

import { useState, useEffect } from 'react';
import { AuthStatusResponse, SecureNextAuthConfig } from '../types';

export function useAuthStatus(config?: SecureNextAuthConfig) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const endpoint = config?.authStatusEndpoint || '/api/auth/status';

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: AuthStatusResponse = await response.json();
      const newAuthStatus = data.isAuthenticated;
      
      setIsAuthenticated(newAuthStatus);
      
      // Call the optional callback
      if (config?.onAuthChange) {
        config.onAuthChange(newAuthStatus);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check auth status';
      setError(errorMessage);
      setIsAuthenticated(false);
    } finally {
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
