import { app, BrowserWindow, globalShortcut, ipcMain, Tray, Menu, nativeImage, desktopCapturer, safeStorage } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Settings store with schema
const store = new Store({
    defaults: {
        keybinding: 'Alt+Space'
    }
});

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;
let isVisible = false;

// Double-tap detection
let lastAltPress = 0;
const DOUBLE_TAP_THRESHOLD = 400;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: true,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // Load the app
    if (process.env.NODE_ENV === 'development' || process.env.VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173');
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Hide instead of close
    mainWindow.on('close', (e) => {
        e.preventDefault();
        hideWindow();
    });

    mainWindow.on('blur', () => {
        // Auto-hide when focus is lost (optional behavior)
        // hideWindow();
    });
}

function showWindow() {
    if (mainWindow) {
        // Center on screen
        const { screen } = require('electron');
        const primaryDisplay = screen.getPrimaryDisplay();
        const { width, height } = primaryDisplay.workAreaSize;

        mainWindow.setSize(600, 400);
        mainWindow.setPosition(
            Math.round((width - 600) / 2),
            Math.round((height - 400) / 3)
        );

        mainWindow.show();
        mainWindow.focus();
        isVisible = true;
        mainWindow.webContents.send('window-shown');
    }
}

function hideWindow() {
    if (mainWindow) {
        mainWindow.hide();
        isVisible = false;
    }
}

function expandWindow() {
    if (mainWindow) {
        const { screen } = require('electron');
        const primaryDisplay = screen.getPrimaryDisplay();
        const { width, height } = primaryDisplay.workAreaSize;

        const newWidth = Math.min(1000, width - 100);
        const newHeight = Math.min(700, height - 100);

        mainWindow.setSize(newWidth, newHeight);
        mainWindow.setPosition(
            Math.round((width - newWidth) / 2),
            Math.round((height - newHeight) / 2)
        );
    }
}

function createTray() {
    // Create a simple tray icon (16x16 purple square)
    const icon = nativeImage.createEmpty();
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show FlickAI', click: showWindow },
        { type: 'separator' },
        {
            label: 'Quit', click: () => {
                mainWindow?.destroy();
                app.quit();
            }
        },
    ]);

    tray.setToolTip('FlickAI - Double-tap Option to activate');
    tray.setContextMenu(contextMenu);

    tray.on('click', showWindow);
}

function registerHotkeys() {
    // Register the custom keybinding from store
    const keybinding = store.get('keybinding', 'Alt+Space') as string;
    
    try {
        const success = globalShortcut.register(keybinding, () => {
            if (isVisible) {
                hideWindow();
            } else {
                showWindow();
            }
        });
        
        if (!success) {
            console.error(`Failed to register global shortcut: ${keybinding}`);
        } else {
            console.log(`Registered global shortcut: ${keybinding}`);
        }
    } catch (error) {
        console.error(`Error registering global shortcut: ${keybinding}`, error);
    }

    // Escape to hide (keep this always registered)
    globalShortcut.register('Escape', () => {
        if (isVisible) {
            hideWindow();
        }
    });
}

function updateKeybinding(newKeybinding: string): boolean {
    // Get the old keybinding
    const oldKeybinding = store.get('keybinding', 'Alt+Space') as string;
    
    // Unregister the old one
    if (oldKeybinding) {
        globalShortcut.unregister(oldKeybinding);
    }
    
    // Register the new one
    try {
        const success = globalShortcut.register(newKeybinding, () => {
            if (isVisible) {
                hideWindow();
            } else {
                showWindow();
            }
        });
        
        if (success) {
            // Save to store only if registration was successful
            store.set('keybinding', newKeybinding);
            console.log(`Updated keybinding to: ${newKeybinding}`);
            return true;
        } else {
            // If registration failed, re-register the old one
            globalShortcut.register(oldKeybinding, () => {
                if (isVisible) {
                    hideWindow();
                } else {
                    showWindow();
                }
            });
            console.error(`Failed to register new keybinding: ${newKeybinding}`);
            return false;
        }
    } catch (error) {
        console.error(`Error updating keybinding: ${newKeybinding}`, error);
        // Re-register the old one
        globalShortcut.register(oldKeybinding, () => {
            if (isVisible) {
                hideWindow();
            } else {
                showWindow();
            }
        });
        return false;
    }
}

// IPC Handlers
function setupIPC() {
    ipcMain.handle('hide-window', () => {
        hideWindow();
    });

    ipcMain.handle('expand-window', () => {
        expandWindow();
    });

    ipcMain.handle('capture-screenshot', async () => {
        try {
            const sources = await desktopCapturer.getSources({
                types: ['screen'],
                thumbnailSize: { width: 1920, height: 1080 },
            });

            if (sources.length > 0) {
                return sources[0].thumbnail.toDataURL();
            }
            return null;
        } catch (error) {
            console.error('Screenshot error:', error);
            return null;
        }
    });

    ipcMain.handle('get-auth-token', () => {
        try {
            const encryptedToken = safeStorage.encryptString('');
            // For now, return empty - will be set by auth flow
            return null;
        } catch {
            return null;
        }
    });

    ipcMain.handle('set-auth-token', (_event, token: string) => {
        try {
            // Store token securely
            // In production, use electron-store with safeStorage
            return true;
        } catch {
            return false;
        }
    });

    // Keybinding management
    ipcMain.handle('get-keybinding', () => {
        return store.get('keybinding', 'Alt+Space');
    });

    ipcMain.handle('set-keybinding', (_event, keybinding: string) => {
        return updateKeybinding(keybinding);
    });

    ipcMain.handle('reset-keybinding', () => {
        const defaultKeybinding = 'Alt+Space';
        const success = updateKeybinding(defaultKeybinding);
        return success ? defaultKeybinding : store.get('keybinding');
    });
}

// Deep link handling
app.setAsDefaultProtocolClient('flick');

app.on('open-url', (_event, url) => {
    // Handle flick://auth?token=xxx
    const urlObj = new URL(url);
    if (urlObj.pathname === '//auth' || urlObj.host === 'auth') {
        const token = urlObj.searchParams.get('token');
        if (token && mainWindow) {
            mainWindow.webContents.send('auth-token-received', token);
        }
    }
});

// App lifecycle
app.whenReady().then(() => {
    createWindow();
    createTray();
    registerHotkeys();
    setupIPC();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        } else {
            showWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        showWindow();
    });
}
