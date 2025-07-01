'use client';

import React from 'react';
import { SecureSessionContext } from '../context/SecureSessionContext';
import { SecureSessionProviderProps } from '../types';

export function SecureSessionProvider({ 
  children, 
  isAuthenticated 
}: SecureSessionProviderProps) {
  return (
    <SecureSessionContext.Provider value={{ isAuthenticated }}>
      {children}
    </SecureSessionContext.Provider>
  );
}
