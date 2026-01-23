'use client'

interface SectionProps {
    title: string
    subtitle: string
    description: string
    imagePosition: 'left' | 'right'
    gradient: string
    mockContent: React.ReactNode
}

function FeatureSection({ title, subtitle, description, imagePosition, gradient, mockContent }: SectionProps) {
    return (
        <div className="py-24 md:py-32 px-6 border-b border-white/5 last:border-0 relative overflow-hidden group">
            {/* Background Gradient */}
            <div className={`absolute top-0 ${imagePosition === 'right' ? 'right-0' : 'left-0'} w-1/2 h-full bg-gradient-to-b ${gradient} opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none blur-3xl`} />

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
                {/* Content */}
                <div className={`space-y-8 ${imagePosition === 'left' ? 'md:order-2' : ''}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white/70">
                        {subtitle}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">{title}</h2>
                    <p className="text-xl text-white/60 leading-relaxed">
                        {description}
                    </p>

                    <ul className="space-y-4 pt-4">
                        {[1, 2, 3].map((i) => (
                            <li key={i} className="flex items-center gap-3 text-white/80">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span>Feature benefit point {i} goes here based on context</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Image/Mockup */}
                <div className={`relative ${imagePosition === 'left' ? 'md:order-1' : ''}`}>
                    <div className="glass rounded-3xl p-1 gradient-border-animated shadow-2xl">
                        <div className="bg-gray-900 rounded-2xl p-6 aspect-square sm:aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                            {mockContent}
                        </div>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -inset-4 bg-white/5 rounded-3xl -z-10 blur-xl opacity-50" />
                </div>
            </div>
        </div>
    )
}

export default function FeatureSections() {
    return (
        <section className="relative">
            <FeatureSection
                title="Instant Desktop Intelligence"
                subtitle="Always Available"
                description="Why switch contexts? FlickAI runs silenty in the background. A simple double-tap brings the power of LLMs directly to your active window, ready to solve problems without breaking your flow."
                imagePosition="right"
                gradient="from-violet-600 to-indigo-600"
                mockContent={
                    <div className="text-center space-y-4">
                        <div className="text-6xl animate-pulse">⚡️</div>
                        <div className="text-2xl font-bold text-white">Double-Tap <span className="text-violet-400">Option</span></div>
                        <div className="px-6 py-2 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md">
                            &lt;Wake /&gt;
                        </div>
                    </div>
                }
            />
            <FeatureSection
                title="Seamless Workflow Integration"
                subtitle="Context Aware"
                description="Debug code, draft emails, or analyze data without leaving your app. FlickAI understands what's on your screen and provides relevant, actionable assistance."
                imagePosition="left"
                gradient="from-blue-600 to-cyan-600"
                mockContent={
                    <div className="w-full h-full flex flex-col gap-3">
                        <div className="flex-1 bg-white/5 rounded-xl animate-pulse delay-75" />
                        <div className="h-20 bg-blue-500/20 rounded-xl border border-blue-500/30 p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                                <div className="h-2 w-32 bg-white/10 rounded" />
                            </div>
                        </div>
                    </div>
                }
            />
        </section>
    )
}
