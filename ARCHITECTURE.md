# NewsNow Architecture Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT (Browser)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Frontend Layer                                    │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  React + TypeScript                                            │ │    │
│  │  │  • Components (Card, Column, Header, etc.)                     │ │    │
│  │  │  • Client-side rendering                                       │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  │                                                                      │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  Vite (Build Tool)                                            │ │    │
│  │  │  • Fast HMR (Hot Module Replacement)                           │ │    │
│  │  │  • Optimized production builds                                 │ │    │
│  │  │  • Module bundling                                             │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Routing Layer                                    │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  TanStack Router                                              │ │    │
│  │  │  • Client-side routing                                        │ │    │
│  │  │  • Route caching                                              │ │    │
│  │  │  • Error state handling                                       │ │    │
│  │  │  • Async data loading                                         │ │    │
│  │  │  • Type-safe routes                                           │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    State Management Layer                            │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  Jotai (Atomic State)                                          │ │    │
│  │  │  • Primitive atoms (columnID, metadata)                       │ │    │
│  │  │  • Derived atoms                                               │ │    │
│  │  │  • Local storage integration                                  │ │    │
│  │  │  • Focus state, sync state                                     │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  │                                                                      │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  TanStack Query (Server State)                                 │ │    │
│  │  │  • Data fetching from API                                     │ │    │
│  │  │  • Caching & invalidation                                      │ │    │
│  │  │  • Loading & error states                                      │ │    │
│  │  │  • Background refetching                                       │ │    │
│  │  │  • Optimistic updates                                          │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Styling Layer                                    │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  UnoCSS                                                        │ │    │
│  │  │  • Utility-first CSS                                           │ │    │
│  │  │  • Atomic classes                                              │ │    │
│  │  │  • Dark mode support                                           │ │    │
│  │  │  • Responsive utilities                                        │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ↕ HTTP/API Requests
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SERVER (Node.js)                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Server Runtime Layer                               │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  Nitro (Server Runtime Abstraction)                            │ │    │
│  │  │  • Multi-platform support (Node, Cloudflare, Vercel, Bun)     │ │    │
│  │  │  • Auto-imports                                                │ │    │
│  │  │  • Database integration                                        │ │    │
│  │  │  • API route handling                                          │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  │                            ↕                                        │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  H3 (Tiny HTTP Framework)                                       │ │    │
│  │  │  • Request/Response handling                                   │ │    │
│  │  │  • Middleware support                                          │ │    │
│  │  │  • Event handlers                                              │ │    │
│  │  │  • Lightweight & fast                                          │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    API Routes                                        │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  /api/s?id=<source-id>                                         │ │    │
│  │  │  • Fetch news from sources                                     │ │    │
│  │  │  • Cache management                                             │ │    │
│  │  │  • Rate limiting                                                │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  /api/oauth/github                                             │ │    │
│  │  │  • GitHub OAuth authentication                                │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  /api/me/*                                                     │ │    │
│  │  │  • User data sync                                              │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    Data Layer                                       │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  Source Getters                                                │ │    │
│  │  │  • Auto-discovered from server/sources/*.ts                    │ │    │
│  │  │  • Web scraping (cheerio)                                      │ │    │
│  │  │  • RSS parsing                                                 │ │    │
│  │  │  • API fetching                                                │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  │  ┌───────────────────────────────────────────────────────────────┐ │    │
│  │  │  Database (db0)                                               │ │    │
│  │  │  • Better-SQLite3 (dev/prod)                                  │ │    │
│  │  │  • Cloudflare D1 (CF Pages)                                   │ │    │
│  │  │  • Cache storage                                              │ │    │
│  │  │  • User data                                                  │ │    │
│  │  └───────────────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
┌──────────────┐
│   Browser    │
│   (React)    │
└──────┬───────┘
       │
       │ 1. User navigates to route
       ▼
┌─────────────────────┐
│  TanStack Router    │
│  • Resolves route   │
│  • Loads component  │
└──────┬──────────────┘
       │
       │ 2. Component mounts
       ▼
┌─────────────────────┐
│  React Component    │
│  (e.g., NewsCard)   │
└──────┬──────────────┘
       │
       │ 3. useQuery hook
       ▼
┌─────────────────────┐
│  TanStack Query     │
│  • Checks cache     │
│  • Fetches if needed│
└──────┬──────────────┘
       │
       │ 4. HTTP Request
       │    GET /s?id=ao3
       ▼
┌─────────────────────┐
│  Nitro API Handler  │
│  /api/s/index.ts    │
└──────┬──────────────┘
       │
       │ 5. Check database cache
       ▼
┌─────────────────────┐
│  Database (db0)     │
│  • Cache lookup     │
│  • Return if fresh  │
└──────┬──────────────┘
       │
       │ 6. If cache expired
       ▼
┌─────────────────────┐
│  Source Getter      │
│  server/sources/    │
│  • Scrape website   │
│  • Parse HTML/RSS   │
│  • Return NewsItem[]│
└──────┬──────────────┘
       │
       │ 7. Save to cache
       ▼
┌─────────────────────┐
│  Database (db0)     │
│  • Store cache      │
└──────┬──────────────┘
       │
       │ 8. Return response
       ▼
┌─────────────────────┐
│  TanStack Query     │
│  • Update cache     │
│  • Trigger re-render│
└──────┬──────────────┘
       │
       │ 9. Component updates
       ▼
┌─────────────────────┐
│  React Component    │
│  • Display news     │
└─────────────────────┘
```

## Technology Stack Summary

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TanStack Router** - Client-side routing
- **TanStack Query** - Server state management
- **Jotai** - Client state management
- **UnoCSS** - Utility-first CSS

### Backend
- **Nitro** - Server runtime abstraction
- **H3** - HTTP framework
- **db0** - Database abstraction
- **Cheerio** - HTML parsing
- **ofetch** - HTTP client

### Key Features
- **Auto-discovery** - Sources automatically registered
- **Multi-platform** - Runs on Node, Cloudflare, Vercel, Bun
- **Type-safe** - End-to-end TypeScript
- **Caching** - Multi-layer caching strategy
- **PWA** - Progressive Web App support
