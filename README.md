# FlickAI

Lightweight desktop AI assistant that wakes on double-tap Option key.

## Quick Start

```bash
# Install dependencies
pnpm install

# Run desktop app
pnpm desktop

# Run web app
pnpm web

# Run both in parallel
pnpm dev
```

## Project Structure

- `apps/desktop` - Electron desktop application
- `apps/web` - Next.js landing page & auth
- `packages/ui` - Shared UI components
- `packages/api-client` - Cerebras API wrapper

## Environment Setup

Copy `.env.example` to `.env` in each app and fill in your API keys.
