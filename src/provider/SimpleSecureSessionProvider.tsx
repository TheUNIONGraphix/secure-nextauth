import React from 'react';

interface SimpleSecureSessionProviderProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

// Context 없이 작동하는 간단한 Provider
export function SimpleSecureSessionProvider({ 
  children, 
  isAuthenticated 
}: SimpleSecureSessionProviderProps): React.ReactNode {
  // 서버 사이드에서는 children만 반환
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }

  // 클라이언트에서만 인증 상태를 전역 변수로 설정
  if (typeof window !== 'undefined') {
    (window as any).__NEXTAUTH_SECURE_AUTH_STATUS__ = isAuthenticated;
  }

  return <>{children}</>;
} 