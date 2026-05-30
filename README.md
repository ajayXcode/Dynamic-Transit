# Dynamic Transit (MDT)

> Extremely detailed developer-oriented README — everything you need
to run, debug, and extend the project locally and in CI.

---

## Project Overview

Dynamic Transit (MDT) is a multi-package monorepo that provides an interactive
web application and a backend API for exploring transit-related data (fares,
weather, AQI, routes) and real-time updates via Socket.io. The workspace uses
pnpm workspaces and Vite for the frontend. The repository contains several
packages and artifacts, including an API server and a Vite-powered React app.

This README documents local development, architecture, debugging steps,
deployment notes, and common pitfalls — enjoy the deep dive.

---

## Repository Structure (high level)

- artifacts/
  - api-server/        - Node API + Socket.io server (Express)
  - mdt-app/           - Vite + React frontend (desktop + mobile UI)
  - mockup-sandbox/    - small Vite sandbox for prototyping
- lib/
  - api-zod/           - generated zod schemas from OpenAPI
  - api-client-react/  - typed React hooks + clients
  - db/                - database schema + drizzle config
- scripts/             - utility scripts
- package.json         - workspace-level scripts

---

## Quickstart — Local (Windows / PowerShell)

Prerequisites:

- Node.js >= 20 (tested on Node 24)
- pnpm installed globally (`npm i -g pnpm`)
- Git credentials configured for push (SSH key or credential helper)

1) Install workspace dependencies

```powershell
pnpm install
```

2) Start the API server (recommended ports shown):

```powershell
cd artifacts/api-server
#$env:NODE_ENV='development' # optional
#$env:PORT='3000' # optional, default is required by server
$env:PORT='3000'
pnpm run build
pnpm run start
```

This builds a bundled ESM artifact and starts the server. If you plan to
iterate on server code, you can add a watcher script (not included by default).

Health checks:

- API root: http://localhost:3000/
- Health: http://localhost:3000/healthz

3) Start the frontend (Vite)

```powershell
cd artifacts/mdt-app
$env:PORT='5173' # avoid colliding with API (3000)
pnpm run dev
```

Open: http://localhost:5173/

Notes:
- The frontend and backend run separately. The frontend connects to the
  backend at the same-origin by default; configure environment variables for
  different API hosts when necessary.

---

## Environment Variables

Minimal variables used during development:

- `PORT` — port for servers (API or frontend preview)
- `NODE_ENV` — `development` or `production`
- `BASE_PATH` — Vite base path (if serving under a subpath)

Add any production secrets (DB, APIs) to your CI environment, not to git.

---

## Common Problems & Debugging

- "Cannot find module ... generated/api": this means generated sources
  (e.g. `lib/api-zod/src/generated`) are missing or imports expect different
  paths. The repo includes generated artifacts; if something is missing, run
  generation scripts (or check `lib/api-spec`/orval config). Alternatively,
  bundle workspace libs in the API build (we patched `artifacts/api-server/build.mjs`).

- Build errors when bundling: inspect `artifacts/api-server/build.mjs`.
  We exclude many native modules; workspace packages can be bundled or
  externalized depending on preference.

- "PORT environment variable is required": set `PORT` before `pnpm run start`.

- Frontend "failed to load" in the browser:
  - Check the browser console for network errors (CORS, 404 for assets, or
    failed JS source maps).
  - Ensure Vite prints a `Local: http://localhost:5173/` line and that you
    opened the correct port.

---

## Development Tips

- Use `pnpm -w -r` to run commands across packages when necessary.
- To iterate quickly on the backend, consider running the compiled server with
  `node --enable-source-maps ./dist/index.mjs` after `pnpm run build`, or make
  a dev script that rebuilds on change (e.g., with `chokidar` to trigger
  esbuild). The repository intentionally bundles many dependencies.
- For frontend changes, Vite dev server provides HMR out of the box.

---

## Testing & Linting

- Typechecking: `pnpm -w -r run typecheck` (workspace-wide typechecking)

---

## CI / Deployment

- The API builds into an ESM bundle. For production deployments, ensure the
  environment has `NODE_OPTIONS='--enable-source-maps'` if you rely on source
  maps for stack traces.
- The frontend can be built with `pnpm --filter ./artifacts/mdt-app run build`.

---

## Architecture Notes (Deep)

- The backend uses Express + Socket.io for real-time features and Pino for
  structured logging. Logs use worker-based transports (see `build.mjs`).
- `lib/api-zod` contains schema definitions generated from an OpenAPI spec
  (check `api-spec/openapi.yaml` and orval config in `lib/api-spec`).
- The workspace uses `pnpm-workspace.yaml` with a catalog of pinned
  dependencies to ensure deterministic installs.

---

## File Map (not exhaustive)

- `artifacts/api-server/src` — server entry & routes
  - `routes/health.ts` — health endpoint
- `artifacts/mdt-app/src` — React app source
- `lib/api-zod/src/generated` — generated zod types (do not edit manually)

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Run tests and typechecks
4. Open a PR with a clear description

---

## License & Credits

This repository is provided as-is. Check the project root or ask the
maintainers for an explicit license.

---

If you want, I can also:

- Start the frontend and open it in a browser automatically.
- Create a smaller, user-focused README (less technical).
- Split deployment notes into separate files: `DEPLOY.md`, `DEV.md`.

Enjoy — and tell me if you want additional sections (diagrams, API
reference, or a generated OpenAPI explorer).
