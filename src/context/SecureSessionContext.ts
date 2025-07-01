'use client';

import { createContext, useContext } from 'react';
import { SecureSessionContextType } from '../types';

export const SecureSessionContext = createContext<SecureSessionContextType>({
  isAuthenticated: false,
});

export const useSecureSession = () => {
  const context = useContext(SecureSessionContext);
  if (context === undefined) {
    throw new Error('useSecureSession must be used within a SecureSessionProvider');
  }
  return context;
};
