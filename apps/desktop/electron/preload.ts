import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    // Window controls
    hideWindow: () => ipcRenderer.invoke('hide-window'),
    expandWindow: () => ipcRenderer.invoke('expand-window'),

    // Screenshot
    captureScreenshot: () => ipcRenderer.invoke('capture-screenshot'),

    // Auth
    getAuthToken: () => ipcRenderer.invoke('get-auth-token'),
    setAuthToken: (token: string) => ipcRenderer.invoke('set-auth-token', token),

    // Event listeners
    onWindowShown: (callback: () => void) => {
        ipcRenderer.on('window-shown', callback);
    },
    onAuthTokenReceived: (callback: (token: string) => void) => {
        ipcRenderer.on('auth-token-received', (_event, token) => callback(token));
    },

    // Cleanup
    removeAllListeners: (channel: string) => {
        ipcRenderer.removeAllListeners(channel);
    },
});

// Type definitions for renderer
declare global {
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
}
