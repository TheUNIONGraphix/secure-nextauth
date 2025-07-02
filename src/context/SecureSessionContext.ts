"use client";
import React, { createContext, useContext } from "react";
import { SecureSessionContextType } from '../types';

// 서버 컴포넌트 호환성을 위한 안전한 Context 생성
const SecureSessionContext = createContext<SecureSessionContextType>({
  isAuthenticated: false,
});

export { SecureSessionContext };

export const useSecureSession = (): SecureSessionContextType => {
  // 서버 사이드에서는 기본값 반환
  if (typeof window === 'undefined') {
    return { isAuthenticated: false };
  }

  // 전역 변수에서 먼저 확인
  if (typeof window !== 'undefined' && (window as any).__NEXTAUTH_SECURE_AUTH_STATUS__ !== undefined) {
    return { isAuthenticated: (window as any).__NEXTAUTH_SECURE_AUTH_STATUS__ };
  }

  const context = useContext(SecureSessionContext);
  if (context === undefined) {
    // Context가 없으면 전역 변수에서 확인
    const globalAuthStatus = (window as any).__NEXTAUTH_SECURE_AUTH_STATUS__;
    return { isAuthenticated: globalAuthStatus || false };
  }
  return context;
};
