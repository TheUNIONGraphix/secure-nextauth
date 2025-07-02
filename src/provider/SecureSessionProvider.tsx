"use client";
import React from "react";
import { SecureSessionContext } from '../context/SecureSessionContext';

interface SecureSessionProviderProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

// 서버 컴포넌트 호환성을 위한 동적 import 지원
export function SecureSessionProvider({ children, isAuthenticated }: SecureSessionProviderProps) {
  // 클라이언트에서만 Context를 사용하도록 보장
  if (typeof window === 'undefined') {
    // 서버 사이드에서는 children만 반환
    return <>{children}</>;
  }

  return (
    <SecureSessionContext.Provider value={{ isAuthenticated }}>
      {children}
    </SecureSessionContext.Provider>
  );
}

// 동적 import를 위한 별도 export
export default SecureSessionProvider;
