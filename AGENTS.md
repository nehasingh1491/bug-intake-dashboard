# AGENTS.md - AI Agent Instructions

## Overview

**bug-intake-dashboard-study** is a controlled full-stack codebase for software engineering / HCI study sessions. It models a lightweight internal Bug Intake Dashboard for QA and product teams.

Keep the project small, stable, and easy to inspect. The goal is not to add production breadth; it is to preserve a realistic frontend -> API -> service -> SQLite flow for short participant tasks.

## Architecture

```text
Client (React 19 + MUI 7) -> API Layer (Express 5) -> SQLite
```

- **Client**: Pages -> Hooks -> Services -> Axios -> Server API
- **Server**: Routes -> Controllers -> Services -> SQLite

## Setup

```bash
npm install
npm run dev
```

Optional reset:

```bash
npm run db:reset
```

## Coding Conventions

- ESM only: `import`/`export`, no `require()`.
- No TypeScript; use readable JavaScript and light JSDoc only where it helps.
- Functional React components only.
- Pages should use hooks/services rather than calling Axios directly.
- API calls belong in `src/client/services/`.
- Server business logic belongs in `src/server/services/`.
- MUI is the UI system; use `sx` for local styling.
- Keep validation understandable and close to the API boundary.

## Testing

```bash
npm test
npm run test:run
npm run test:coverage
```

Test files live under `src/client/__tests__/`.

## Linting & Formatting

```bash
npm run lint
npm run lint:fix
npm run format
```

## Commit Style

Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`.

## Key Files

| File | Purpose |
|------|---------|
| `src/client/pages/BugListPage.jsx` | Bug list and filters |
| `src/client/pages/BugDetailPage.jsx` | Bug detail and status update |
| `src/client/pages/NewBugPage.jsx` | Bug intake form |
| `src/client/services/bugService.js` | Client API wrapper |
| `src/client/hooks/useBugs.js` | Bug data hooks |
| `src/server/routes/v1/bug.routes.js` | Express bug routes |
| `src/server/controllers/bug.controller.js` | Request handlers |
| `src/server/services/bug.service.js` | SQLite-backed domain logic |
| `src/server/db/schema.sql` | SQLite schema |
| `src/server/db/seed.js` | Study seed data |
