import React from "react";
import { SecureSessionContextType } from '../types';
declare const SecureSessionContext: React.Context<SecureSessionContextType>;
export { SecureSessionContext };
export declare const useSecureSession: () => SecureSessionContextType;
