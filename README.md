# FlickAI ⚡️

<!-- 🚨 JUDGES: WATCH THE DEMO FIRST! 🚨 -->
<div align="center">
  <a href="LINK_TO_YOUR_YOUTUBE_VIDEO_OR_LOOM">
    <img src="https://placehold.co/1200x675/1e1e1e/8b5cf6?text=▶️+WATCH+THE+DEMO+(2+mins)" alt="Watch FlickAI Demo" />
  </a>
  
  <p>
    <i>(Click the image above to watch the walkthrough)</i>
  </p>

  <br />

  <h1>The Intelligent Desktop Assistant That Sees What You See</h1>

  <p>
    <b>Built in 24 hours for the Cerebras x Cline: Vibe Coder Hackathon</b> <br />
    Powered by <b>Cerebras GLM 4.7</b> & Built rapidly with <b>Cline</b>
  </p>

  <p>
    <a href="https://github.com/samarthsaxena2004/flickai/issues">Report Bug</a> · 
    <a href="https://github.com/samarthsaxena2004/flickai/issues">Request Feature</a>
  </p>
</div>

---

## 💡 The "Why" (Our Story)

We've all been there: you're debugging a cryptic error, or staring at a blank email draft, and you have to context-switch. You alt-tab to a browser, copy-paste your code/text into ChatGPT, only to lose your flow.

**We built FlickAI because we wanted an assistant that lives *with* us, not in a browser tab.**

We didn't want another chatbot. We wanted a "tap-on-the-shoulder" companion. Something that wakes up instantly, looks at our screen, and says "I see what you're working on, here's the fix."

With just two of us and 24 hours, we set out to build exactly that—a native OS-like experience that feels like magic.

## 🤖 The Cerebras & Cline Experience

This project wouldn't have been possible in this timeframe without our core tech stack. Here is what we learned:

### ⚡️ Cerebras GLM 4.7: "It feels instant"
The biggest bottleneck for desktop assistants is usually latency. Waiting 5-10 seconds for a response breaks the magical "assistant" feeling.
- **What worked**: We plugged in Cerebras GLM 4.7 and were blown away. The token generation is so fast that the answer often appears before we finish blinking.
- **The Trick**: We streamed the response directly to our "Message Bubble" component. Because Cerebras is so fast, the UI feels like it's thinking *with* you, rather than processing *for* you.

### 🚀 Cline: "Vibe Coding"
We practiced "Vibe Coding"—where we focused on the high-level logic and UX "vibe" while Cline handled the heavy lifting.
- **Rapid Prototyping**: We used Cline to scaffold the entire Electron + React + Vite monorepo structure in minutes, not hours.
- **Refactoring**: When we changed our mind about the design (switching from a sidebar to a floating spotlight search style), Cline refactored the Tailwind classes across multiple files instantly.
- **Learnings**: We learned that providing Cline with a "Context" screen of our current file structure helped it make smarter decisions about where to place new components.

---

## ✨ What It Does

- **⚡️ Instant Wake**: Double-tap `Option` (or your custom bind) to summon it. No clicks required.
- **👁️ Context Vision**: It captures your active window/screen instantly. No file uploads needed.
- **🛠️ Smart Actions**: 
  - **Debug**: Segfault? Just invoke FlickAI. It reads the stack trace and suggests a fix.
  - **Draft**: Staring at a blank reply? It reads the email thread and drafts a response in your tone.
  - **Summarize**: meeting notes on screen? It organizes them into action items.
- **🎙️ Voice Mode**: Don't want to type? Just speak. We integrated **Deepgram** for near-instant transcription.

## 📸 Use Cases

<!-- Upload a GIF or Video of your app in action here! -->
<div align="center">
  <img src="https://placehold.co/800x500/1e1e1e/8b5cf6?text=Insert+Application+Demo+GIF+Here" alt="FlickAI Demo" />
</div>

<div align="center">
  <img src="https://placehold.co/800x500/1e1e1e/8b5cf6?text=Insert+Application+Demo+GIF+Here" alt="FlickAI Demo" />
</div>

<div align="center">
  <img src="https://placehold.co/800x500/1e1e1e/8b5cf6?text=Insert+Application+Demo+GIF+Here" alt="FlickAI Demo" />
</div>

## 🛠️ Tech Stack

This project uses a modern monorepo architecture managed by **TurboRepo**.

### **Desktop App (`apps/desktop`)**
- **Framework**: [Electron](https://www.electronjs.org/) + [Vite](https://vitejs.dev/)
- **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Vision**: OpenRouter (Llama 3.2 Vision) / Tesseract.js (OCR Fallback)
- **Voice**: [Deepgram API](https://deepgram.com/) for speech-to-text

### **Web Landing (`apps/web`)**
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/) + [Framer Motion](https://www.framer.com/motion/)

### **AI & Infrastructure**
- **Inference**: [Cerebras API](https://cerebras.ai/) (GLM 4.7)
- **Package Manager**: [PNPM](https://pnpm.io/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PNPM (`npm install -g pnpm`)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/samarthsaxena2004/flickai.git
   cd flickai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Environment Variables**
   Copy `.env.example` to `.env` in `apps/desktop` and fill in your keys:
   ```bash
   cp apps/desktop/.env.example apps/desktop/.env
   ```
   
   **Required Keys:**
   - `VITE_CEREBRAS_API_KEY`: Get from [Cerebras Cloud](https://cloud.cerebras.ai/)
   - `VITE_DEEPGRAM_API_KEY`: Get from [Deepgram](https://deepgram.com/)
   - `VITE_OPENROUTER_API_KEY`: (Optional) For advanced vision capabilities

### Running the App

You can run the entire suite (Desktop + Web) or individual parts.

```bash
# Run everything (Desktop App + Landing Page)
pnpm dev

# Run only Desktop App
pnpm desktop

# Run only Web Landing Page
pnpm web
```

## 📂 Project Structure

A high-level overview of our monorepo structure:

```text
samarthsaxena2004-flickai/
├── apps/
│   ├── desktop/                 # Electron Application
│   │   ├── electron/            # Main process code
│   │   └── src/                 # Renderer process (React)
│   │       ├── hooks/           # AI, Vision, Voice hooks
│   │       └── components/      # Chat & UI components
│   └── web/                     # Next.js Landing Page
│       ├── app/                 # App Router pages
│       └── components/          # Marketing sections (Bento grids, Hero)
├── packages/
│   ├── ui/                      # Shared UI components
│   └── api-client/              # Typed API wrappers
├── turbo.json                   # TurboRepo configuration
└── package.json                 # Root dependencies
```

## 🔮 What's Next?
If we had more time, we would:
1.  **Local Context Awareness**: Index local files so FlickAI knows your entire codebase, not just what's on screen.
2.  **Action Agents**: Allow FlickAI to actually *click* and *type* the fixes for you (Agentic capabilities).
3.  **Linux/Windows Support**: Currently optimized for macOS, but Electron allows us to port easily.

## 🏆 Hackathon Context

This project was built for the **Cerebras x Cline: Vibe Coder Hackathon** with a focus on speed and "vibe coding". 

- **Challenge**: Build a project in under 24 hours.
- **Tools Used**: 
    - **Cline**: For rapid systematic coding and refactoring.
    - **Cerebras**: utilized for its insane token generation speed, making the assistant feel instant.
    - **Electron**: For cross-platform desktop capabilities.

## 👥 The Team

- **Samarth Saxena** - [GitHub](https://github.com/samarthsaxena2004)
- **Maaz** - [GitHub](https://github.com/somewherelostt)

---

<div align="center">
  Made with ❤️ & 🔥 by <b>Samarth Saxena</b> & <b>Maaz</b>
</div>
