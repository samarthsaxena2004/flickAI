import { useState, useEffect, useRef } from 'react';

type View = 'compact' | 'expanded';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function App() {
    const [view, setView] = useState<View>('compact');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [screenshotEnabled, setScreenshotEnabled] = useState(false);
    const [fileEnabled, setFileEnabled] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Focus input when window is shown
        window.electronAPI?.onWindowShown(() => {
            inputRef.current?.focus();
        });

        return () => {
            window.electronAPI?.removeAllListeners('window-shown');
        };
    }, []);

    const handleSubmit = async () => {
        if (!input.trim() && !screenshot) return;

        const userMessage: Message = {
            role: 'user',
            content: screenshot ? `[Screenshot attached]\n\n${input}` : input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setScreenshot(null);
        setIsLoading(true);
        setView('expanded');

        // Expand window
        window.electronAPI?.expandWindow();

        // Simulate AI response (replace with actual Cerebras API call)
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: `I've received your message: "${userMessage.content}"\n\nThis is a demo response. Connect your Cerebras API key to get real AI responses.`,
                },
            ]);
            setIsLoading(false);
        }, 1000);
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

    return (
        <div className="h-full w-full flex flex-col animate-fade-in">
            <div className="glass rounded-2xl h-full flex flex-col overflow-hidden shadow-2xl gradient-border">
                {/* Header */}
                <div className="drag-region flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                        <span className="text-white/90 font-semibold text-sm">FlickAI</span>
                    </div>
                    <button
                        onClick={() => window.electronAPI?.hideWindow()}
                        className="no-drag text-white/50 hover:text-white/80 transition-colors text-xs px-2 py-1 rounded hover:bg-white/10"
                    >
                        ESC
                    </button>
                </div>

                {/* Messages (only shown in expanded view) */}
                {view === 'expanded' && messages.length > 0 && (
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-xl px-4 py-2 ${msg.role === 'user'
                                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
                                            : 'bg-white/10 text-white/90'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/10 rounded-xl px-4 py-2">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Toggle Options */}
                <div className="px-4 py-2 flex gap-2">
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
                </div>

                {/* Screenshot Preview */}
                {screenshot && (
                    <div className="px-4 py-2">
                        <div className="relative inline-block">
                            <img
                                src={screenshot}
                                alt="Screenshot"
                                className="h-20 rounded-lg border border-white/20"
                            />
                            <button
                                onClick={() => setScreenshot(null)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-end gap-2">
                        <div className="flex-1 relative">
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask FlickAI anything..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 resize-none text-sm"
                                rows={1}
                                style={{ minHeight: '44px', maxHeight: '120px' }}
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={!input.trim() && !screenshot}
                            className="px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-all shadow-lg shadow-violet-500/25"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-white/30 text-xs mt-2 text-center">
                        Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Enter</kbd> to send · <kbd className="px-1.5 py-0.5 bg-white/10 rounded">Esc</kbd> to hide
                    </p>
                </div>
            </div>
        </div>
    );
}
