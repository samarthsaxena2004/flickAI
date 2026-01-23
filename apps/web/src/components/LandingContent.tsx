'use client'

import Navbar from "./Navbar"
import Hero from "./Sections/Hero"
import SocialProof from "./Sections/SocialProof"
import FeatureSections from "./Sections/FeatureSections"
import TrustGrid from "./Sections/TrustGrid"
import CTA from "./Sections/CTA"
import Footer from "./Sections/Footer"

export default function LandingContent() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-gray-950 text-white selection:bg-violet-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="noise-overlay" />
                <div className="glow-orb w-[600px] h-[600px] bg-violet-600/20 top-[-200px] left-[-200px]" />
                <div className="glow-orb w-[500px] h-[500px] bg-blue-600/20 top-[40%] right-[-150px]" style={{ animationDelay: '-3s' }} />
            </div>

            <div className="relative z-10">
                <Navbar />
                <Hero />
                <SocialProof />
                <FeatureSections />
                <TrustGrid />
                <CTA />
                <Footer />
            </div>
        </main>
    )
}