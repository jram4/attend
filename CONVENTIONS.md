# CONVENTIONS.md

## 1. General Philosophy

This project is built using a modern, type-safe stack with an AI-first workflow (Cursor). Code must be clean, readable, and maintainable. We prioritize clarity and follow established best practices to ensure the AI can consistently generate high-quality, bug-free code.

## 2. Technology Stack

-   **Framework:** Next.js v15+ (App Router).
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Backend & Database:** Supabase (PostgreSQL, Auth)
-   **SSR Auth Helpers:** `@supabase/ssr` (as `@supabase/auth-helpers-nextjs` is deprecated).
-   **Deployment:** Vercel

## 3. Code & File Structure

-   **Root Directory Structure:** The project follows the default Next.js App Router structure. The `app` directory is located at the project root, not inside a `/src` directory.
-   **Component Naming:** All React components will use `PascalCase.tsx`. (e.g., `CheckInButton.tsx`).
-   **File Naming:** Non-component files (utilities, configurations, types) will use `kebab-case.ts`. (e.g., `event-config.ts`).
-   **Routing:** File-based routing via the `/app` directory. Game-specific routes will be dynamic (e.g., `/app/[gameId]/page.tsx`).

## 4. Coding Style & Best Practices

-   **Type Safety:** TypeScript is mandatory. Avoid `any`; prefer `unknown` or define explicit types.
-   **Function Style:** Use function declarations for React components (`function MyComponent() {}`). Use `const` arrow functions for handlers and utilities.
-   **Imports:** Use absolute imports with the `@/*` alias (e.g., `import { supabase } from '@/lib/supabase'`).
-   **Environment Variables:** All secrets must be in `.env.local` and accessed via `process.env`. Prefix browser-exposed variables with `NEXT_PUBLIC_`.
-   **Component Composition:** Favor creating smaller, single-purpose components over large, multi-state ones. Decompose complex UI into distinct components (e.g., `CheckInButton`, `LoadingSpinner`, `ErrorMessage`).
-   **Server Components First:** Default to Server Components. Only apply the `'use client'` directive to the smallest possible leaf components that require interactivity.

## 5. Supabase Integration

-   **Client:** A single Supabase client will be created for server-side and client-side operations, following the official `@supabase/ssr` package documentation.
-   **Authentication:** The primary method is OAuth with Microsoft, managed via Supabase.
-   **Database Schema:** The primary table is `public.attendance`, structured as follows:
    -   `id` (bigint, pk)
    -   `created_at` (timestamtztz)
    -   `user_id` (uuid, fk to `auth.users`)
    -   `user_email` (text)
    -   `user_grade` (text)
    -   `game_id` (text)
    -   A `UNIQUE` constraint on `(user_id, game_id)` will be enforced at the database level to prevent duplicate check-ins.
