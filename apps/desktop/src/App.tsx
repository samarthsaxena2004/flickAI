import { useState, useEffect, useRef } from 'react';
import { useAI, useVoiceInput } from './hooks';
import SettingsModal from './components/SettingsModal';

type View = 'compact' | 'expanded';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function App() {
    const [view, setView] = useState<View>('compact');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [screenshotEnabled, setScreenshotEnabled] = useState(false);
    const [fileEnabled, setFileEnabled] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [streamingContent, setStreamingContent] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { chat, isLoading } = useAI();
    const { isRecording, transcript, toggleRecording } = useVoiceInput({
        onTranscript: (text, isFinal) => {
            if (isFinal) {
                setInput((prev) => prev + text + ' ');
            }
        },
    });

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, streamingContent]);

    useEffect(() => {
        // Focus input when window is shown
        window.electronAPI?.onWindowShown(() => {
            inputRef.current?.focus();
            setView('compact');
            setMessages([]);
            setInput('');
            setScreenshot(null);
        });

        return () => {
            window.electronAPI?.removeAllListeners('window-shown');
        };
    }, []);

    // Update input with transcript
    useEffect(() => {
        if (transcript && !isRecording) {
            setInput((prev) => prev + transcript);
        }
    }, [transcript, isRecording]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+, or Cmd+, to open settings
            if ((e.ctrlKey || e.metaKey) && e.key === ',') {
                e.preventDefault();
                console.log('Settings shortcut pressed!');
                setIsSettingsOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSubmit = async () => {
        if (!input.trim() && !screenshot) return;

        const userContent = screenshot
            ? `[Screenshot attached]\n\n${input || 'What do you see in this screenshot?'}`
            : input;

        const userMessage: Message = { role: 'user', content: userContent };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setScreenshot(null);
        setView('expanded');
        setStreamingContent('');

        // Expand window
        window.electronAPI?.expandWindow();

        try {
            const allMessages = [...messages, userMessage].map((m) => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
            }));

            const response = await chat(allMessages, (chunk) => {
                setStreamingContent((prev) => prev + chunk);
            });

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: response },
            ]);
            setStreamingContent('');
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: '❌ Sorry, I encountered an error. Please try again.',
                },
            ]);
            setStreamingContent('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
        if (e.key === 'Escape') {
            window.electronAPI?.hideWindow();
        }
    };

    const captureScreenshot = async () => {
        // Hide window briefly to capture without it
        const dataUrl = await window.electronAPI?.captureScreenshot();
        if (dataUrl) {
            setScreenshot(dataUrl);
        }
    };

    const toggleScreenshot = () => {
        setScreenshotEnabled(!screenshotEnabled);
        if (!screenshotEnabled) {
            captureScreenshot();
        } else {
            setScreenshot(null);
        }
    };

    const clearChat = () => {
        setMessages([]);
        setView('compact');
        setInput('');
        setScreenshot(null);
    };

    return (
        <div className="h-full w-full flex flex-col animate-fade-in">
            <div className="glass rounded-2xl h-full flex flex-col overflow-hidden shadow-2xl gradient-border">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <div className={`${!isSettingsOpen ? 'drag-region' : ''} flex items-center gap-2 flex-1`}>
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 animate-pulse" />
                        <span className="text-white/90 font-semibold text-sm">FlickAI</span>
                        {messages.length > 0 && (
                            <button
                                onClick={clearChat}
                                className="no-drag ml-2 text-white/40 hover:text-white/70 text-xs transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2 no-drag">
                        {/* Settings button is now absolutely positioned outside this header */}
                        <button
                            onClick={() => window.electronAPI?.hideWindow()}
                            className="force-clickable text-white/50 hover:text-white/80 transition-colors text-xs px-2 py-1 rounded hover:bg-white/10"
                        >
                            ESC
                        </button>
                    </div>
                </div>

                {/* Messages (only shown in expanded view) */}
                {view === 'expanded' && messages.length > 0 && (
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-xl px-4 py-3 ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                                            : 'bg-white/10 text-white/90'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                </div>
                            </div>
                        ))}

                        {/* Streaming response */}
                        {isLoading && streamingContent && (
                            <div className="flex justify-start animate-slide-up">
                                <div className="max-w-[85%] bg-white/10 rounded-xl px-4 py-3">
                                    <p className="text-sm whitespace-pre-wrap text-white/90 leading-relaxed">
                                        {streamingContent}
                                        <span className="inline-block w-2 h-4 bg-violet-500 ml-1 animate-pulse" />
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Loading indicator */}
                        {isLoading && !streamingContent && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 rounded-xl px-4 py-3">
                                    <div className="flex gap-1.5">
                                        <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* Toggle Options */}
                <div className="px-4 py-2 flex gap-2 flex-wrap">
                    <button
                        onClick={toggleScreenshot}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${screenshotEnabled
                                ? 'bg-violet-600 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Turn on screenshot
                    </button>
                    <button
                        onClick={() => setFileEnabled(!fileEnabled)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${fileEnabled
                                ? 'bg-violet-600 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        Turn on file sharing
                    </button>
                    <button
                        onClick={toggleRecording}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isRecording
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        {isRecording ? 'Recording...' : 'Voice input'}
                    </button>
                </div>

                {/* Screenshot Preview */}
                {screenshot && (
                    <div className="px-4 py-2">
                        <div className="relative inline-block">
                            <img
                                src={screenshot}
                                alt="Screenshot"
                                className="h-24 rounded-lg border border-white/20 shadow-lg"
                            />
                            <button
                                onClick={() => {
                                    setScreenshot(null);
                                    setScreenshotEnabled(false);
                                }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 mt-auto">
                    <div className="flex items-end gap-2">
                        <div className="flex-1 relative">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={isRecording ? 'Listening...' : 'Ask FlickAI anything...'}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 resize-none text-sm"
                                rows={1}
                                disabled={isLoading}
                                style={{ minHeight: '44px', maxHeight: '120px' }}
                            />
                            {isRecording && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </span>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={(!input.trim() && !screenshot) || isLoading}
                            className="px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all shadow-lg shadow-violet-500/25"
                        >
                            {isLoading ? (
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <p className="text-white/30 text-xs mt-2 text-center">
                        Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Enter</kbd> to send · <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Esc</kbd> to hide · <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Alt+Space</kbd> to toggle
                    </p>
                </div>
            </div>

            {/* Settings Modal */}
            <SettingsModal 
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />

            {/* Absolute positioned settings button (always clickable) */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    console.log('Absolute settings button clicked!');
                    setIsSettingsOpen(true);
                }}
                className="absolute top-3 right-16 text-white/40 hover:text-white/90 transition-all p-1.5 rounded hover:bg-white/10 z-50"
                title="Settings (Ctrl+,)"
                style={{ 
                    WebkitAppRegion: 'no-drag',
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                } as any}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ pointerEvents: 'none' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
    );
}
