# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 16** application with React 19, TypeScript, and Tailwind CSS v4. It's an AI-powered chat application for creating digital products, social media posts, ads, and AI-assisted selling. The app uses Supabase for authentication and data persistence, and OpenRouter API for AI generation.

## Important: Next.js Version Note

This project uses **Next.js 16** which has breaking changes from previous versions. APIs, conventions, and file structure may differ from older Next.js versions. When working with Next.js features, check `node_modules/next/dist/docs/` for the relevant guide.

## Development Commands

All commands should be run from the `apps/web` directory:

```bash
# Start development server (uses Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture Overview

### Directory Structure

```
apps/web/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page (Auth → ChatBox flow)
│   ├── layout.tsx         # Root layout with Geist font
│   ├── dashboard/         # Dashboard page
│   └── api/chat/route.ts  # API endpoint for chat flow
├── features/              # Domain-driven feature modules
│   ├── flow/             # Flow engine and types
│   │   ├── flow.types.ts # Step, Flow type definitions
│   │   ├── flow.engine.ts # getNextStep, isLastStep logic
│   │   └── flow.registry.ts # Flow registrations
│   ├── chat/             # Chat service logic
│   ├── ai/               # AI generation service
│   └── product/          # Product generation logic
├── flows/                # Flow definitions (declarative)
│   ├── create-product.ts # Product creation flow
│   ├── create-post.ts    # Post creation flow
│   ├── create-ads.ts     # Ads creation flow
│   └── ai-seller.ts      # AI seller flow
├── components/            # React components
│   ├── ui/               # UI components
│   │   ├── ChatBubble.tsx    # Message bubbles with avatars
│   │   ├── ChatInput.tsx     # Modern input with send button
│   │   └── LoadingBubble.tsx # Typing indicator
│   ├── ChatBox.tsx       # Main chat with flow selector
│   ├── Auth.tsx          # Google OAuth login page
│   └── Navbar.tsx        # Top navigation with user menu
├── hooks/                # Custom React hooks
│   └── useUser.ts        # Supabase auth user hook
└── lib/                  # Shared libraries
    ├── supabase.ts       # Supabase client
    └── ai/openrouter.ts  # OpenRouter API client
```

### Flow-Based Architecture

The app uses a declarative flow system:

1. **Flows** (`flows/*.ts`) define step-by-step questionnaires with `id`, `name`, `type`, and `steps[]`
2. **Flow Engine** (`features/flow/flow.engine.ts`) provides navigation logic
3. **Flow Registry** (`features/flow/flow.registry.ts`) exports all available flows
4. **Chat Service** (`features/chat/chat.service.ts`) orchestrates between flow steps and AI generation
5. **API Route** (`app/api/chat/route.ts`) handles HTTP requests

Flow types: `"product"`, `"post"`, `"ads"`, `"seller"`

## Design System

The app uses a modern dark theme with:

- **Colors**: Dark background (`#0f0a1a`) with indigo/purple/pink gradient accents
- **Glassmorphism**: `glass` and `glass-strong` CSS classes for frosted glass effects
- **Animations**: `animate-fade-in`, `animate-slide-in`, `animate-float` for smooth transitions
- **Components**: 
  - `.btn` - Button base class with variants: `.btn-primary`, `.btn-secondary`, `.btn-google`
  - `.card` - Card containers with hover effects
  - `.input` - Styled form inputs with focus states
- **Icons**: Lucide React (`lucide-react` package)

### Authentication Flow

1. User visits `/` - sees beautiful login page with Google button
2. After Google OAuth via Supabase, user is redirected back
3. `useUser` hook detects authenticated user
4. Navbar shows user avatar and dropdown menu with logout
5. ChatBox displays flow selector (4 options)
6. User selects flow → step-by-step questionnaire → AI generates result

### AI Integration

- Uses OpenRouter API (`lib/ai/openrouter.ts`)
- Model: `openrouter/auto`
- Prompts are constructed in `features/ai/ai.service.ts` based on flow type

### Authentication

- Supabase Auth with anonymous key
- `useUser` hook provides auth state
- Auth component handles login/signup

## Environment Variables

Required in `apps/web/.env.local`:

```bash
OPENROUTER_API_KEY=          # OpenRouter API key
NEXT_PUBLIC_SUPABASE_URL=    # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anonymous key
```

## Path Aliases

- `@/*` maps to the project root (e.g., `@/components/Button`)

## GitHub Integration & Auto-Sync

This repository is configured with automatic GitHub synchronization:

### Setup (First Time)

1. **Install GitHub CLI** (if not already installed):
   - Windows: `winget install --id GitHub.cli`
   - macOS: `brew install gh`

2. **Run the setup script**:
   ```bash
   ./scripts/setup-github.sh
   ```

3. **Or manually configure**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/restech-ai.git
   git push -u origin master
   ```

### Auto-Sync Behavior

- Every commit automatically triggers a push to GitHub (via post-commit hook)
- No manual `git push` required after the initial setup

### Manual Sync (if needed)

```bash
git push origin master
```

## Security & Sensitive Data Protection

⚠️ **CRITICAL: Never commit sensitive data!**

### Protected Files (.gitignore)

- `.env` - Environment variables
- `.env.local` - Local environment (contains API keys)
- `.env.*.local` - All local env files
- `node_modules/` - Dependencies

### Pre-Commit Security Hook

The repository includes a pre-commit hook that automatically:
- ✅ Scans for API keys (OpenRouter, Supabase patterns)
- ✅ Blocks commits containing `.env.local`
- ✅ Blocks commits containing `node_modules`
- ✅ Warns about potential secrets in source code

If the hook blocks your commit, move sensitive data to `.env.local` and use environment variables.

### Environment Variables Setup

1. **Copy the template** (already done):
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```

2. **Fill in your actual keys** in `apps/web/.env.local`:
   ```bash
   OPENROUTER_API_KEY=your_actual_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_actual_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_key
   ```

3. **Verify .env.local is NOT tracked**:
   ```bash
   git status  # Should not show .env.local
   ```

### Security Checklist Before Committing

- [ ] No API keys in source code
- [ ] No passwords or tokens in any `.ts`, `.tsx`, `.js` files
- [ ] `.env.local` contains all secrets
- [ ] `git status` does not show sensitive files

## Key Files to Understand

1. `features/flow/flow.types.ts` - Type definitions for the flow system
2. `features/chat/chat.service.ts` - Core chat orchestration logic
3. `components/ChatBox.tsx` - Main UI component with chat state management
4. `flows/*.ts` - Add new flows by creating files here and registering in `flow.registry.ts`
