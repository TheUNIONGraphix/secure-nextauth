import { AuthStatusResponse, SecureNextAuthConfig } from '../types';
export declare function checkAuthStatus(config?: SecureNextAuthConfig): Promise<AuthStatusResponse>;
export declare function createAuthStatusEndpoint(handler: () => Promise<AuthStatusResponse>): () => Promise<Response>;
