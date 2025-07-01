// Context and Hooks
export { SecureSessionContext, useSecureSession } from './context/SecureSessionContext';
export { useAuthStatus } from './hooks/useAuthStatus';

// Provider
export { SecureSessionProvider } from './provider/SecureSessionProvider';

// Utils
export { getAuthStatus, createAuthStatusResponse, requireAuth, requireAuthOrRedirect, createAuthMiddleware } from './utils/authHelpers';

// Types
export type {
  SecureSessionContextType,
  SecureSessionProviderProps,
  AuthStatusResponse,
  SecureNextAuthConfig,
} from './types';
