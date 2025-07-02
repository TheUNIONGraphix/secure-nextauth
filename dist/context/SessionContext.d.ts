import React from 'react';
import { SessionContextType } from '../types';
declare const SessionContext: React.Context<SessionContextType | undefined>;
export declare const useSession: () => SessionContextType;
export { SessionContext };
