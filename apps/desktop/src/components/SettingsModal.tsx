import { useState, useEffect, useRef } from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const [currentKeybinding, setCurrentKeybinding] = useState('Alt+Space');
    const [newKeybinding, setNewKeybinding] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const recorderRef = useRef<HTMLDivElement>(null);

    // Load current keybinding when modal opens
    useEffect(() => {
        if (isOpen) {
            loadKeybinding();
            setNewKeybinding('');
            setError('');
            setIsRecording(false);
        }
    }, [isOpen]);

    const loadKeybinding = async () => {
        try {
            const keybinding = await window.electronAPI?.getKeybinding();
            if (keybinding) {
                setCurrentKeybinding(keybinding);
            }
        } catch (err) {
            console.error('Failed to load keybinding:', err);
        }
    };

    const formatKeybinding = (e: KeyboardEvent): string => {
        const parts: string[] = [];
        
        if (e.ctrlKey) parts.push('Ctrl');
        if (e.altKey) parts.push('Alt');
        if (e.shiftKey) parts.push('Shift');
        if (e.metaKey) parts.push('Command');

        // Get the actual key
        const key = e.key;
        
        // Ignore if just modifiers
        if (!['Control', 'Alt', 'Shift', 'Meta'].includes(key)) {
            // Format the key name properly
            if (key.length === 1) {
                parts.push(key.toUpperCase());
            } else {
                parts.push(key);
            }
        }

        return parts.join('+');
    };

    const validateKeybinding = (binding: string): boolean => {
        // Must have at least one modifier
        const hasModifier = binding.includes('Ctrl') || 
                           binding.includes('Alt') || 
                           binding.includes('Shift') || 
                           binding.includes('Command');
        
        if (!hasModifier) {
            setError('Keybinding must include at least one modifier key (Ctrl, Alt, Shift, or Command)');
            return false;
        }

        // Must not be just modifiers
        const parts = binding.split('+');
        const lastPart = parts[parts.length - 1];
        if (['Ctrl', 'Alt', 'Shift', 'Command'].includes(lastPart)) {
            setError('Keybinding must include a non-modifier key');
            return false;
        }

        // Check for common system shortcuts to warn user
        const systemShortcuts = [
            'Alt+F4', 'Ctrl+Alt+Delete', 'Command+Q', 'Command+W'
        ];
        if (systemShortcuts.includes(binding)) {
            setError('This is a system shortcut and may not work');
            return false;
        }

        setError('');
        return true;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isRecording) return;
        
        e.preventDefault();
        e.stopPropagation();

        const binding = formatKeybinding(e);
        
        if (binding) {
            setNewKeybinding(binding);
            validateKeybinding(binding);
        }
    };

    const startRecording = () => {
        setIsRecording(true);
        setNewKeybinding('');
        setError('');
        recorderRef.current?.focus();
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const handleSave = async () => {
        if (!newKeybinding) {
            setError('Please record a keybinding first');
            return;
        }

        if (!validateKeybinding(newKeybinding)) {
            return;
        }

        setIsSaving(true);
        try {
            const success = await window.electronAPI?.setKeybinding(newKeybinding);
            if (success) {
                setCurrentKeybinding(newKeybinding);
                setNewKeybinding('');
                setIsRecording(false);
                onClose();
            } else {
                setError('Failed to register keybinding. It may conflict with another application.');
            }
        } catch (err) {
            setError('Failed to save keybinding');
            console.error('Save keybinding error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleReset = async () => {
        setIsSaving(true);
        try {
            const defaultKeybinding = await window.electronAPI?.resetKeybinding();
            if (defaultKeybinding) {
                setCurrentKeybinding(defaultKeybinding);
                setNewKeybinding('');
                setIsRecording(false);
                setError('');
            }
        } catch (err) {
            setError('Failed to reset keybinding');
            console.error('Reset keybinding error:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setNewKeybinding('');
        setIsRecording(false);
        setError('');
        onClose();
    };

    useEffect(() => {
        if (isRecording && recorderRef.current) {
            const handleKeyDownWrapper = (e: Event) => handleKeyDown(e as KeyboardEvent);
            recorderRef.current.addEventListener('keydown', handleKeyDownWrapper);
            return () => {
                recorderRef.current?.removeEventListener('keydown', handleKeyDownWrapper);
            };
        }
    }, [isRecording]);

    // ESC key to close modal
    useEffect(() => {
        if (!isOpen) return;
        
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                console.log('ESC pressed - closing modal');
                handleCancel();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        // Only close if clicking directly on backdrop, not on modal content
        if (e.target === e.currentTarget) {
            console.log('Backdrop direct click - closing');
            handleCancel();
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center" 
            style={{ 
                zIndex: 999999,
                pointerEvents: 'auto',
                WebkitAppRegion: 'no-drag',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)'
            } as any}
            onClick={handleBackdropClick}
            onMouseDown={handleBackdropClick}
        >
            
            {/* Modal */}
            <div 
                style={{ 
                    position: 'relative',
                    background: 'rgba(20, 20, 30, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    width: '480px',
                    maxWidth: '90vw',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    pointerEvents: 'auto',
                    WebkitAppRegion: 'no-drag',
                    zIndex: 1000000
                } as any}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h2 className="text-xl font-semibold text-white">Settings</h2>
                    </div>
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('X button mousedown - closing modal');
                            handleCancel();
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('X button clicked - closing modal');
                            handleCancel();
                        }}
                        className="force-clickable text-white/50 hover:text-white/80 transition-colors"
                        style={{ 
                            pointerEvents: 'auto', 
                            cursor: 'pointer',
                            WebkitAppRegion: 'no-drag',
                            zIndex: 10001
                        } as any}
                        type="button"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Keybinding Section */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                            Global Keybinding
                        </label>
                        <p className="text-xs text-white/50 mb-3">
                            Set a keyboard shortcut to show FlickAI from anywhere
                        </p>
                    </div>

                    {/* Current Keybinding */}
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-sm text-white/60">Current:</span>
                        <kbd className="px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg text-white font-medium text-sm">
                            {currentKeybinding}
                        </kbd>
                    </div>

                    {/* Keybinding Recorder */}
                    {!isRecording && !newKeybinding && (
                        <button
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('Change Keybinding button clicked');
                                startRecording();
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                startRecording();
                            }}
                            className="force-clickable w-full px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all text-sm"
                            style={{ 
                                pointerEvents: 'auto', 
                                cursor: 'pointer',
                                WebkitAppRegion: 'no-drag'
                            } as any}
                            type="button"
                        >
                            Change Keybinding
                        </button>
                    )}

                    {isRecording && (
                        <div
                            ref={recorderRef}
                            tabIndex={0}
                            className="w-full px-4 py-3 bg-violet-600/20 border-2 border-violet-500 rounded-lg text-center animate-pulse"
                        >
                            <p className="text-violet-300 text-sm font-medium">
                                Press your desired key combination...
                            </p>
                        </div>
                    )}

                    {newKeybinding && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-violet-600/10 rounded-lg border border-violet-500/30">
                                <span className="text-sm text-white/60">New:</span>
                                <kbd className="px-3 py-1.5 bg-violet-600 rounded-lg text-white font-medium text-sm">
                                    {newKeybinding}
                                </kbd>
                            </div>
                            {!error && (
                                <button
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log('Record Again button clicked');
                                        stopRecording();
                                    }}
                                    className="force-clickable w-full px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-xs transition-all"
                                    style={{ 
                                        pointerEvents: 'auto', 
                                        cursor: 'pointer',
                                        WebkitAppRegion: 'no-drag'
                                    } as any}
                                    type="button"
                                >
                                    Record Again
                                </button>
                            )}
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <p className="text-red-400 text-xs">{error}</p>
                        </div>
                    )}

                    {/* Reset Button */}
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Reset button clicked');
                            handleReset();
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleReset();
                        }}
                        disabled={isSaving}
                        className="force-clickable w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ 
                            pointerEvents: 'auto', 
                            cursor: isSaving ? 'not-allowed' : 'pointer',
                            WebkitAppRegion: 'no-drag'
                        } as any}
                        type="button"
                    >
                        Reset to Default (Alt+Space)
                    </button>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Cancel button mousedown');
                            handleCancel();
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Cancel button clicked');
                            handleCancel();
                        }}
                        className="force-clickable flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all"
                        style={{ 
                            pointerEvents: 'auto', 
                            cursor: 'pointer',
                            WebkitAppRegion: 'no-drag'
                        } as any}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        onMouseDown={(e) => {
                            if (!newKeybinding || error || isSaving) return;
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Save button mousedown');
                            handleSave();
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Save button clicked');
                            if (!newKeybinding || error || isSaving) return;
                            handleSave();
                        }}
                        disabled={!newKeybinding || !!error || isSaving}
                        className="force-clickable flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all shadow-lg shadow-violet-500/25"
                        style={{ 
                            pointerEvents: 'auto', 
                            cursor: (!newKeybinding || error || isSaving) ? 'not-allowed' : 'pointer',
                            WebkitAppRegion: 'no-drag'
                        } as any}
                        type="button"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}
