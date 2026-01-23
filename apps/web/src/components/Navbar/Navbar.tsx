'use client'

import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">F</span>
                    </div>
                    <span className="font-bold text-xl">FlickAI</span>
                </Link>
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
    )
}
