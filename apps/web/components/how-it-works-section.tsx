
import { Download, Terminal, Sparkles } from "lucide-react"

const StepCard = ({ number, title, description, icon: Icon }) => (
    <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm relative z-10 w-full md:w-auto flex-1">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2 shadow-inner">
            <Icon className="w-8 h-8 text-primary" />
        </div>
        <div className="flex flex-col gap-2">
            <span className="text-secondary text-base font-semibold tracking-wider uppercase">Step {number}</span>
            <h3 className="text-foreground text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-[280px]">
                {description}
            </p>
        </div>
    </div>
)

export function HowItWorksSection() {
    const steps = [
        {
            number: "01",
            title: "Download & Install",
            description: "Get the lightweight FlickAI desktop app for Mac or Windows.",
            icon: Download,
        },
        {
            number: "02",
            title: "Invoke instantly",
            description: "Press Cmd+Space (or your custom keybind) to open FlickAI anywhere.",
            icon: Terminal,
        },
        {
            number: "03",
            title: "Get Context-Aware Help",
            description: "FlickAI sees what you're working on and provides instant, relevant assistance.",
            icon: Sparkles,
        },
    ]

    return (
        <section className="w-full px-5 py-16 md:py-24 flex flex-col justify-center items-center gap-12 overflow-hidden relative">
            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full z-0" />

            <div className="flex flex-col items-center text-center gap-4 relative z-10 max-w-3xl">
                <h2 className="text-foreground text-3xl md:text-5xl font-semibold leading-tight">
                    How FlickAI works
                </h2>
                <p className="text-muted-foreground text-lg font-medium max-w-xl">
                    Three simple steps to supercharge your workflow with your new desktop assistant.
                </p>
            </div>

            <div className="w-full max-w-[1200px] flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch relative z-10">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-[56px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0" />

                {steps.map((step) => (
                    <StepCard key={step.number} {...step} />
                ))}
            </div>
        </section>
    )
}
