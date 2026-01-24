'use client'

import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative min-h-[140vh] w-full flex flex-col items-center justify-start pt-32 pb-20 overflow-visible">

            {/* Background - Exact Bujo Style Gradient + Dots */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Main Gradient: Soft Blue from top, fading to Cream/Orange at bottom */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-orange-50/50 opacity-80" />

                {/* Secondary Bottom Gradient for that warm glow */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#FFFBF0] to-transparent" />

                {/* Dot Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                        backgroundSize: '32px 32px'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 px-6">

                {/* Badge - Pill shaped, light glass */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/40 shadow-sm backdrop-blur-sm text-sm mb-10 hover:bg-white/80 transition-all cursor-default text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    FlickAI is now Desktop Native
                </div>

                {/* Main Heading - Dark, Heavy, Clean */}
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight text-slate-900">
                    Your AI Assistant, <br />
                    <span className="text-slate-800">One Flick Away.</span>
                </h1>

                {/* Subheading - Dark Gray, readable */}
                <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl leading-relaxed">
                    Deploy conversational AI that wakes instantly. <br className="hidden md:block" />
                    Reduces context switching and improves flow across apps.
                </p>

                {/* CTAs - Solid Dark Button + Text Link */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-20">
                    <Link
                        href="/auth/login"
                        className="px-8 py-4 bg-[#1e293b] text-white hover:bg-slate-800 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5"
                    >
                        Start for free
                    </Link>
                    <a
                        href="#how-it-works"
                        className="px-8 py-4 text-slate-600 hover:text-slate-900 font-medium text-lg transition-colors flex items-center gap-2 group"
                    >
                        See how it works
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {/* Mock Interface Preview - Clean, Light Shadow */}
                <div className="relative w-full max-w-5xl mx-auto perspective-1000">
                    {/* Glass Card Container */}
                    <div className="relative bg-white rounded-3xl p-2 shadow-2xl shadow-blue-900/10 border border-white/50 backdrop-blur-xl">
                        <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-[16/10] relative border border-gray-100">
                            {/* Window Chrome */}
                            <div className="h-10 bg-white border-b border-gray-200 flex items-center px-4 gap-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <div className="flex-1 text-center text-xs text-gray-400 font-medium">FlickAI — Desktop</div>
                            </div>

                            {/* UI Mockup Content */}
                            <div className="p-8 flex flex-col h-full bg-[#FAFAFA] relative">
                                {/* Chat Area */}
                                <div className="flex-1 space-y-6">
                                    {/* User Message */}
                                    <div className="flex justify-end">
                                        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-[80%] shadow-sm">
                                            <p className="font-medium">Can you explain this React useEffect bug?</p>
                                        </div>
                                    </div>

                                    {/* AI Message */}
                                    <div className="flex justify-start items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                                            <div className="w-6 h-6 bg-gradient-to-tr from-blue-600 to-violet-600 rounded-lg" />
                                        </div>
                                        <div className="space-y-3 max-w-[85%]">
                                            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm p-5 shadow-sm">
                                                <p className="text-gray-600 leading-relaxed">
                                                    The issue is in the dependency array. You're using <code className="bg-gray-100 px-1.5 py-0.5 rounded text-blue-600 font-mono text-sm">fetchData</code> inside the effect, but it's recreated on every render.
                                                </p>
                                            </div>
                                            {/* Code Snippet */}
                                            <div className="bg-white border border-gray-200 rounded-xl p-4 font-mono text-sm overflow-hidden shadow-sm">
                                                <div className="flex gap-4 text-xs text-gray-400 mb-2 border-b border-gray-100 pb-2">
                                                    <span>components/UserProfile.tsx</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex gap-4">
                                                        <span className="text-gray-300 select-none">1</span>
                                                        <span>
                                                            <span className="text-purple-600">const</span> <span className="text-blue-600">fetchData</span> = <span className="text-amber-600">useCallback</span>(() <span className="text-purple-600">=&gt;</span> {'{'}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <span className="text-gray-300 select-none">2</span>
                                                        <span className="text-gray-400 ml-4">// ... logic</span>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <span className="text-gray-300 select-none">3</span>
                                                        <span>
                                                            {'}'}, []); <span className="text-green-600">// ✅ Fixed: Memoized function</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="mt-8 relative z-20">
                                    <div className="bg-white border border-gray-200 rounded-2xl p-2 flex items-center gap-3 pr-4 shadow-lg shadow-gray-200/50">
                                        <div className="p-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer text-gray-400 hover:text-gray-600">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            disabled
                                            placeholder="Ask anything or paste a screenshot..."
                                            className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 h-10"
                                        />
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
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
                </div>
            </div>

            {/* Fade to remaining content which is dark */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent z-20 pointer-events-none" />
        </section>
    )
}
