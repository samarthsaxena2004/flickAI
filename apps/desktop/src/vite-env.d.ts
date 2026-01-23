/// <reference types="vite/client" />

interface Window {
    electronAPI: {
        hideWindow: () => Promise<void>;
        expandWindow: () => Promise<void>;
        captureScreenshot: () => Promise<string | null>;
        getAuthToken: () => Promise<string | null>;
        setAuthToken: (token: string) => Promise<boolean>;
        onWindowShown: (callback: () => void) => void;
        onAuthTokenReceived: (callback: (token: string) => void) => void;
        removeAllListeners: (channel: string) => void;
    };
}
