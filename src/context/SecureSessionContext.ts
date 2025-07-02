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

  const context = useContext(SecureSessionContext);
  if (context === undefined) {
    throw new Error('useSecureSession must be used within a SecureSessionProvider');
  }
  return context;
};
