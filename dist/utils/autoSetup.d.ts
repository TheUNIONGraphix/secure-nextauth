export interface AutoSetupOptions {
    projectRoot?: string;
    authOptionsPath?: string;
}
export declare function generateNextAuthAPI(options?: AutoSetupOptions): string;
export declare function generateAuthOptions(options?: AutoSetupOptions): string;
export declare function generateAuthStatusAPI(options?: AutoSetupOptions): string;
export declare function generateSessionContext(options?: AutoSetupOptions): string;
export declare function generateSessionProvider(options?: AutoSetupOptions): string;
export declare function autoSetup(options?: AutoSetupOptions): {
    nextAuthPath: string;
    authOptionsPath: string;
    authStatusPath: string;
    contextPath: string;
    providerPath: string;
};
