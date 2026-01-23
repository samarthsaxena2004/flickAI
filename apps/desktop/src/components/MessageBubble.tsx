import ReactMarkdown from 'react-markdown';

interface MessageBubbleProps {
    content: string;
    role: 'user' | 'assistant';
    isStreaming?: boolean;
}

export function MessageBubble({ content, role, isStreaming = false }: MessageBubbleProps) {
    const isUser = role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
            <div
                className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                    isUser
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-slate-100 backdrop-blur-sm border border-slate-700/50 shadow-xl'
                }`}
            >
                {isUser ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                ) : (
                    <div className="prose prose-invert prose-sm max-w-none markdown-content">
                        <ReactMarkdown
                            components={{
                                // Paragraphs
                                p: ({ children }) => (
                                    <p className="mb-3 last:mb-0 leading-relaxed text-slate-100">
                                        {children}
                                    </p>
                                ),
                                // Headings
                                h1: ({ children }) => (
                                    <h1 className="text-lg font-bold mb-3 text-cyan-300">{children}</h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-base font-semibold mb-2 text-cyan-300">{children}</h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-sm font-semibold mb-2 text-cyan-400">{children}</h3>
                                ),
                                // Bold
                                strong: ({ children }) => (
                                    <strong className="font-semibold text-cyan-200">{children}</strong>
                                ),
                                // Italic
                                em: ({ children }) => (
                                    <em className="italic text-slate-300">{children}</em>
                                ),
                                // Lists
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside space-y-1.5 mb-3 text-slate-200 pl-2">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside space-y-1.5 mb-3 text-slate-200 pl-2">
                                        {children}
                                    </ol>
                                ),
                                li: ({ children }) => (
                                    <li className="leading-relaxed">{children}</li>
                                ),
                                // Code blocks and inline code
                                code: ({ children, className }) => {
                                    const isBlock = className?.includes('language-');
                                    return isBlock ? (
                                        <pre className="my-3 bg-slate-950/80 rounded-lg p-4 overflow-x-auto border border-slate-700/50">
                                            <code className={`text-xs text-cyan-100 ${className}`}>
                                                {children}
                                            </code>
                                        </pre>
                                    ) : (
                                        <code className="px-1.5 py-0.5 bg-slate-700/50 rounded text-cyan-300 text-xs font-mono">
                                            {children}
                                        </code>
                                    );
                                },
                                // Blockquotes
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-cyan-500 pl-4 py-2 my-3 bg-slate-800/50 rounded-r italic text-slate-300">
                                        {children}
                                    </blockquote>
                                ),
                                // Links
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/50 hover:decoration-cyan-400 transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {children}
                                    </a>
                                ),
                                // Horizontal rule
                                hr: () => <hr className="my-4 border-slate-700" />,
                            }}
                        >
                            {content}
                        </ReactMarkdown>
                        {isStreaming && (
                            <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse rounded-sm" />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
