'use client'

import Link from 'next/link'

export default function CTA() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-5xl md:text-7xl font-bold mb-8">
                    Ready to build <br />
                    <span className="gradient-text">faster?</span>
                </h2>
                <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                    Join developers using FlickAI to skip the context switching and stay in flow.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/auth/login"
                        className="px-8 py-4 bg-white text-black hover:bg-white/90 rounded-2xl font-bold text-lg transition-all shadow-xl hover:scale-105"
                    >
                        Get Started Free
                    </Link>
                    <a
                        href="#"
                        className="px-8 py-4 glass hover:bg-white/10 rounded-2xl font-semibold text-lg transition-all border border-white/20"
                    >
                        Download for Mac
                    </a>
                </div>
            </div>
        </section>
    )
}
