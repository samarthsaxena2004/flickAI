'use client'

import Link from 'next/link'

export default function Hero() {
    return (
        <section className="pt-40 pb-20 px-6 relative overflow-visible">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in relative z-10">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/30 text-sm mb-10 hover:bg-white/5 transition-colors cursor-default">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-violet-200/90 font-medium">FlickAI for Desktop</span>
                    <span className="w-px h-3 bg-white/20 mx-1" />
                    <span className="text-white/60">v1.0 Hackathon Release</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
                    Your AI Assistant, <br />
                    <span className="gradient-text">One Flick Away.</span>
                </h1>

                {/* Subheading */}
                <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl leading-relaxed">
                    Deploy a lightweight, always-available AI that wakes instantly.
                    Double-tap <kbd className="px-2 py-1 bg-white/10 rounded-lg text-base border border-white/10 mx-1 font-mono">Option</kbd> to get help with coding, writing, and troubleshooting.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <Link
                        href="/auth/login"
                        className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-white/90 rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105"
                    >
                        Start for free
                    </Link>
                    <a
                        href="#how-it-works"
                        className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 rounded-2xl font-semibold text-lg transition-all border border-white/20 flex items-center justify-center gap-2 group"
                    >
                        See how it works
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {/* Mock Interface Preview - Floating / Tilted */}
                <div className="mt-24 relative w-full max-w-5xl mx-auto perspective-1000">
                    <div className="relative glass rounded-3xl p-1 gradient-border-animated transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out shadow-2xl shadow-violet-500/20">
                        <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-[16/10] relative">
                            {/* Window Chrome */}
                            <div className="h-10 bg-[#1e1e2e] flex items-center px-4 gap-2 border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                <div className="flex-1 text-center text-xs text-white/30 font-medium">FlickAI — Desktop</div>
                            </div>

                            {/* UI Mockup Content */}
                            <div className="p-8 flex flex-col h-full bg-[#0a0a0f]">
                                {/* Chat Area */}
                                <div className="flex-1 space-y-6">
                                    {/* User Message */}
                                    <div className="flex justify-end">
                                        <div className="bg-violet-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%] shadow-lg">
                                            <p className="font-medium">Can you explain this React useEffect bug?</p>
                                        </div>
                                    </div>

                                    {/* AI Message */}
                                    <div className="flex justify-start items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                            <span className="font-bold text-white text-sm">F</span>
                                        </div>
                                        <div className="space-y-3 max-w-[85%]">
                                            <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl rounded-tl-sm p-5 shadow-lg">
                                                <p className="text-gray-300 leading-relaxed">
                                                    The issue is in the dependency array. You're using <code className="bg-black/30 px-1.5 py-0.5 rounded text-violet-300">fetchData</code> inside the effect, but it's recreated on every render.
                                                </p>
                                            </div>
                                            {/* Code Snippet */}
                                            <div className="bg-[#0f0f13] border border-white/10 rounded-xl p-4 font-mono text-sm overflow-hidden">
                                                <div className="flex gap-4 text-xs text-gray-500 mb-2 border-b border-white/5 pb-2">
                                                    <span>components/UserProfile.tsx</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex gap-4">
                                                        <span className="text-gray-600 select-none">1</span>
                                                        <span className="text-pink-400">const</span> <span className="text-blue-400">fetchData</span> = <span className="text-yellow-300">useCallback</span>(() <span className="text-pink-400">=&gt;</span> {'{'}</div>
                                                    <div className="flex gap-4">
                                                        <span className="text-gray-600 select-none">2</span>
                                                        <span className="text-gray-500 ml-4">// ... logic</span>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <span className="text-gray-600 select-none">3</span>
                                                        {'}'}, []); <span className="text-green-500">// ✅ Fixed: Memoized function</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="mt-8 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent -top-20 h-20 pointer-events-none" />
                                    <div className="bg-[#1e1e2e] border border-white/10 rounded-2xl p-2 flex items-center gap-3 pr-4 shadow-xl">
                                        <div className="p-2 hover:bg-white/5 rounded-xl transition-colors cursor-pointer text-gray-400 hover:text-white">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            disabled
                                            placeholder="Ask anything or paste a screenshot..."
                                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 h-10"
                                        />
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Glow behind the mock */}
                    <div className="absolute -inset-10 bg-violet-600/30 blur-[100px] -z-10 rounded-full opacity-50" />
                </div>
            </div>
        </section>
    )
}
