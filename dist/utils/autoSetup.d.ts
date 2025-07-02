export interface AutoSetupOptions {
    projectRoot?: string;
    apiRoute?: string;
    componentName?: string;
    authOptionsPath?: string;
}
export declare function generateAuthStatusAPI(options?: AutoSetupOptions): string;
export declare function generateAuthStatusComponent(options?: AutoSetupOptions): string;
export declare function autoSetup(options?: AutoSetupOptions): {
    apiPath: string;
    componentPath: string;
};
