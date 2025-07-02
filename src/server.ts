// Server-side only exports
export { 
  getAuthStatus, 
  createAuthStatusResponse, 
  requireAuth, 
  requireAuthOrRedirect, 
  createAuthMiddleware 
} from './utils/serverHelpers';

// Auto setup utilities (server only)
export { autoSetup, generateAuthStatusAPI, generateAuthStatusComponent } from './utils/autoSetup';

// Types
export type { 
  AuthStatusResponse, 
  SecureNextAuthConfig,
  AuthHookResult
} from './types'; 