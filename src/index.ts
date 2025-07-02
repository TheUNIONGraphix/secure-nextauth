// Client-side exports
export { SecureSessionProvider } from './provider/SecureSessionProvider';
export { DynamicSecureSessionProvider } from './provider/DynamicSecureSessionProvider';
export { SimpleSecureSessionProvider } from './provider/SimpleSecureSessionProvider';
export { useAuthStatus } from './hooks/useAuthStatus';
export { useSecureSession } from './context/SecureSessionContext';
export { checkAuthStatus, createAuthStatusEndpoint } from './utils/authHelpers';

// Server-side exports
export { 
  getAuthStatus, 
  createAuthStatusResponse, 
  requireAuth, 
  requireAuthOrRedirect, 
  createAuthMiddleware 
} from './utils/serverHelpers';

// Types
export type { 
  SecureSessionContextType, 
  AuthStatusResponse, 
  SecureNextAuthConfig 
} from './types';
