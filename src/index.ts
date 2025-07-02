// Client-side exports
export { useAuthStatus } from './hooks/useAuthStatus';
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
  AuthStatusResponse, 
  SecureNextAuthConfig,
  AuthHookResult
} from './types';
