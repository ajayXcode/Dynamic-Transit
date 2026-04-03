# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Mumbai Dynamic Transit (MDT) v2.0 — `artifacts/mdt-app`
- **Type**: React + Vite SPA (no backend, fully offline-capable)
- **Preview path**: `/`
- **Stack**: React, Zustand (state), Leaflet (map), TypeScript
- **Key features**:
  - Graph-based multi-modal Dijkstra routing (Central, Western, Harbour, Metro, Monorail, Ferry, Bus)
  - 50+ Mumbai stations with real coordinates
  - MDT Sathi AI assistant with Mumbai-dialect commentary (English + Marathi toggle)
  - Crisis Simulator with 5 real disruption scenarios
  - Live map via Leaflet (CartoDB Dark theme) with route polylines
  - CO2 savings, cost comparison vs. cab, crowd density indicators
  - Monsoon safety scores, offline-first (localStorage graph cache)
- **Files**:
  - `src/data/mumbaiGraph.ts` — Transit graph nodes + edges
  - `src/logic/router.ts` — Multi-modal Dijkstra algorithm
  - `src/logic/sathi.ts` — AI commentary engine + disruption scenarios
  - `src/store/useStore.ts` — Zustand state management
  - `src/pages/Home.tsx` — Main app page
  - `src/components/` — MapView, RouteCard, SathiPanel, DisruptionPanel, StationSearch, StatsBar
