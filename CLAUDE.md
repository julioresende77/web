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
│   ├── ui/               # UI components (ChatBubble, ChatInput, LoadingBubble)
│   ├── ChatBox.tsx       # Main chat interface
│   └── Auth.tsx          # Authentication component
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

## Key Files to Understand

1. `features/flow/flow.types.ts` - Type definitions for the flow system
2. `features/chat/chat.service.ts` - Core chat orchestration logic
3. `components/ChatBox.tsx` - Main UI component with chat state management
4. `flows/*.ts` - Add new flows by creating files here and registering in `flow.registry.ts`
