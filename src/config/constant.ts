declare global {
    interface Window {
        ENV: {
            API_URL: string,
            API_VERSION: string,
        };
    }
}

export const API_URL = window?.ENV?.API_URL || '';
export const API_VERSION = window?.ENV?.API_VERSION || "v1";
