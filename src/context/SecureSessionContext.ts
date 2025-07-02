"use client";
import React from "react";
import { SecureSessionContextType } from '../types';

// 더미 Context (호환성을 위해 유지하되 사용하지 않음)
const SecureSessionContext = React.createContext<SecureSessionContextType>({
  isAuthenticated: false,
});

export { SecureSessionContext };

export const useSecureSession = (): SecureSessionContextType => {
  // 서버 사이드에서는 기본값 반환
  if (typeof window === 'undefined') {
    return { isAuthenticated: false };
  }

  // 전역 변수에서 인증 상태 확인
  const globalAuthStatus = (window as any).__NEXTAUTH_SECURE_AUTH_STATUS__;
  return { isAuthenticated: globalAuthStatus || false };
};
