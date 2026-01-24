'use client'

// const stacks = [
//     { name: 'TypeScript', icon: 'M3 5v14l18-7L3 5z' }, // Simplified mock paths for now
//     { name: 'Electron', icon: 'M12 2L2 7l10 5 10-5-10-5zm0 9l2-1 5 1v1l-7 4-7-4v-1l5-1 2 1z' },
//     { name: 'Next.js', icon: 'M12 2L2 19.7h18.3L12 2zm0 3.3l6.5 11.4H5.5L12 5.3z' },
//     { name: 'Supabase', icon: 'M12 2.5L3 17h6v5l9-14.5h-6l2.5-5z' },
//     { name: 'Tailwind', icon: 'M12 4.5C7 4.5 2.7 7.6 1 10c1.7 2.4 6 5.5 11 5.5s9.3-3.1 11-5.5c-1.7-2.4-6-5.5-11-5.5zM12 13c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z' },
// ]

export default function SocialProof() {
    return (
        <section className="py-12 border-y border-white/5 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <p className="text-sm font-medium text-white/40 mb-8 uppercase tracking-widest">
                    Built with modern stack
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono">TypeScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-sans">Electron</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-sans">Next.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-sans">Supabase</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-sans">Cerebras</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-sans">Deepgram</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
