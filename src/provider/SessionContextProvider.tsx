"use client";
import React, { useState, useEffect } from 'react';
import { SessionContext } from '../context/SessionContext';

interface SessionContextProviderProps {
  children: React.ReactNode;
}

export function SessionContextProvider({ children }: SessionContextProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 인증 상태 확인
  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status');
      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인 함수
  const login = async () => {
    try {
      window.location.href = '/api/auth/signin';
    } catch (error) {
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
    } catch (error) {
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

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}
