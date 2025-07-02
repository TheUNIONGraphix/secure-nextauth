export { SecureSessionProvider } from './provider/SecureSessionProvider';
export { useAuthStatus } from './hooks/useAuthStatus';
export { useSecureSession } from './context/SecureSessionContext';
export { checkAuthStatus, createAuthStatusEndpoint } from './utils/authHelpers';
export { getAuthStatus, createAuthStatusResponse, requireAuth, requireAuthOrRedirect, createAuthMiddleware } from './utils/serverHelpers';
export type { SecureSessionContextType, AuthStatusResponse, SecureNextAuthConfig } from './types';
