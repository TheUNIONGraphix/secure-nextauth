"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SessionContextType } from '../types';

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};

export { SessionContext }; 