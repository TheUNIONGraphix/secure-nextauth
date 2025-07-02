"use client";
import React from "react";
import { SecureSessionContext } from '../context/SecureSessionContext';

interface SecureSessionProviderProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

export function SecureSessionProvider({ children, isAuthenticated }: SecureSessionProviderProps) {
  return (
    <SecureSessionContext.Provider value={{ isAuthenticated }}>
      {children}
    </SecureSessionContext.Provider>
  );
}
