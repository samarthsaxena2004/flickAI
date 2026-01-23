import Link from 'next/link'

export default function HomePage() {
    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Background Effects */}
            <div className="noise-overlay" />
            <div className="glow-orb w-[600px] h-[600px] bg-violet-600 top-[-200px] left-[-200px]" />
            <div className="glow-orb w-[500px] h-[500px] bg-blue-600 top-[40%] right-[-150px]" style={{ animationDelay: '-3s' }} />
            <div className="glow-orb w-[400px] h-[400px] bg-cyan-500 bottom-[-100px] left-[30%]" style={{ animationDelay: '-5s' }} />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">F</span>
                        </div>
                        <span className="font-bold text-xl">FlickAI</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="#features" className="text-white/70 hover:text-white transition-colors text-sm">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-white/70 hover:text-white transition-colors text-sm">
                            How it Works
                        </Link>
                        <Link
                            href="/auth/login"
                            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl text-sm font-medium transition-all shadow-lg shadow-violet-500/25"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="max-w-4xl mx-auto text-center animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white/80">Built for the 24hr AI Hackathon</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Your AI Assistant,{' '}
                        <span className="gradient-text">One Flick Away</span>
                    </h1>

                    <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
                        A lightweight, always-available desktop AI that wakes instantly when you need it.
                        Double-tap <kbd className="px-2 py-1 bg-white/10 rounded-lg text-sm">Option</kbd> and get instant help with coding, writing, and troubleshooting.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/auth/login"
                            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105"
                        >
                            Get Started Free
                        </Link>
                        <a
                            href="#how-it-works"
                            className="px-8 py-4 glass hover:bg-white/10 rounded-2xl font-semibold text-lg transition-all border border-white/20"
                        >
                            See How It Works
                        </a>
                    </div>
                </div>

                {/* App Preview */}
                <div className="max-w-3xl mx-auto mt-20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="glass rounded-3xl p-1 gradient-border-animated">
                        <div className="bg-gray-900 rounded-2xl p-6 space-y-4">
                            {/* Mock Window Chrome */}
                            <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-4 text-white/50 text-sm">FlickAI</span>
                            </div>

                            {/* Mock Chat */}
                            <div className="space-y-4">
                                <div className="flex justify-end">
                                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl px-4 py-3 max-w-[70%]">
                                        <p className="text-sm">How do I fix this TypeScript error?</p>
                                    </div>
                                </div>
                                <div className="flex justify-start">
                                    <div className="bg-white/10 rounded-2xl px-4 py-3 max-w-[80%]">
                                        <p className="text-sm text-white/90">
                                            I can see the issue! The error occurs because you're trying to assign a string to a number type.
                                            Here's the fix:
                                        </p>
                                        <div className="mt-3 bg-black/30 rounded-lg p-3 font-mono text-xs text-green-400">
                                            const count: number = parseInt(value, 10);
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mock Input */}
                            <div className="flex items-center gap-3 pt-4">
                                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/40 text-sm">
                                    Ask FlickAI anything...
                                </div>
                                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                        Powerful Features, <span className="gradient-text">Minimal Footprint</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Instant Wake</h3>
                            <p className="text-white/60">
                                Double-tap Option key to summon FlickAI in milliseconds. No waiting, no loading screens.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Screenshot Analysis</h3>
                            <p className="text-white/60">
                                Share your screen with one click. FlickAI analyzes errors, UI issues, and provides instant solutions.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Voice Input</h3>
                            <p className="text-white/60">
                                Speak naturally with Deepgram-powered voice recognition. Perfect for quick questions on the go.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Code Assistant</h3>
                            <p className="text-white/60">
                                Debug, refactor, and write code faster. Supports all major languages with syntax highlighting.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Writing Helper</h3>
                            <p className="text-white/60">
                                Polish emails, documents, and creative content. Get grammar fixes and tone adjustments instantly.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="glass rounded-2xl p-6 hover:bg-white/5 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                            <p className="text-white/60">
                                Your data stays on your device. Minimal footprint, zero telemetry, complete control.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 px-6 relative">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
                        How It <span className="gradient-text">Works</span>
                    </h2>

                    <div className="space-y-8">
                        {/* Step 1 */}
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Sign In & Download</h3>
                                <p className="text-white/60">
                                    Create an account on our web app and download the FlickAI desktop application for your OS.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Runs in Background</h3>
                                <p className="text-white/60">
                                    FlickAI runs silently in your system tray, using near-zero CPU and memory until you need it.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Summon with a Flick</h3>
                                <p className="text-white/60">
                                    Press <kbd className="px-2 py-1 bg-white/10 rounded-lg text-sm">Option + Space</kbd> to instantly bring up the assistant. Ask anything!
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                                4
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Get Instant Help</h3>
                                <p className="text-white/60">
                                    Share screenshots, use voice input, or type your question. FlickAI powered by Cerebras responds in milliseconds.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="glass rounded-3xl p-12 gradient-border-animated">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
                            Join thousands of developers and creators using FlickAI to boost their productivity.
                        </p>
                        <Link
                            href="/auth/login"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105"
                        >
                            Sign In to Continue
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-white/10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">F</span>
                        </div>
                        <span className="font-semibold">FlickAI</span>
                    </div>
                    <p className="text-white/40 text-sm">
                        Built with ❤️ for the 24hr AI Hackathon • Powered by Cerebras
                    </p>
                </div>
            </footer>
        </main>
    )
}
