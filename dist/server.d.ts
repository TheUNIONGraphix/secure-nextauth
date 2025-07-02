export { getAuthStatus, createAuthStatusResponse, requireAuth, requireAuthOrRedirect, createAuthMiddleware } from './utils/serverHelpers';
export { autoSetup, generateAuthStatusAPI, generateAuthStatusComponent } from './utils/autoSetup';
export type { AuthStatusResponse, SecureNextAuthConfig, AuthHookResult } from './types';
