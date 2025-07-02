"use client";
import { useState, useEffect } from "react";
import { AuthStatusResponse, SecureNextAuthConfig, AuthHookResult } from '../types';

export function useAuthStatus(config?: SecureNextAuthConfig): AuthHookResult {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const endpoint = config?.authStatusEndpoint || '/api/auth/status';

  const checkAuthStatus = async () => {
    // 서버 사이드에서는 실행하지 않음
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      let data: AuthStatusResponse;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid JSON response');
      }
      
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
