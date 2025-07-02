export { useAuthStatus } from './hooks/useAuthStatus';
export { checkAuthStatus, createAuthStatusEndpoint } from './utils/authHelpers';
export { getAuthStatus, createAuthStatusResponse, requireAuth, requireAuthOrRedirect, createAuthMiddleware } from './utils/serverHelpers';
export type { AuthStatusResponse, SecureNextAuthConfig, AuthHookResult } from './types';
