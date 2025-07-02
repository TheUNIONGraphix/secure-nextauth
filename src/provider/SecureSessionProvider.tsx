"use client";
import React from "react";

interface SecureSessionProviderProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

// Context 없이 전역 변수만 사용하는 Provider
export function SecureSessionProvider({ children, isAuthenticated }: SecureSessionProviderProps): React.ReactNode {
  // 서버 사이드에서는 children만 반환
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  // 클라이언트에서만 전역 변수 설정
  if (typeof window !== 'undefined') {
    (window as any).__NEXTAUTH_SECURE_AUTH_STATUS__ = isAuthenticated;
  }

  return <>{children}</>;
}

// 동적 import를 위한 별도 export
export default SecureSessionProvider;
