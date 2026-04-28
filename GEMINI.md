# Gemini Project Notes

This repository is the **Bug Intake Dashboard Study** codebase.

It is intentionally small and structured for short software engineering / HCI study tasks. Keep changes focused on the Bug domain and preserve the inspectable flow:

```text
React page -> client hook -> client API service -> Express route -> controller -> service -> SQLite
```

Useful entry points:

- `src/client/pages/BugListPage.jsx`
- `src/client/pages/BugDetailPage.jsx`
- `src/client/pages/NewBugPage.jsx`
- `src/client/services/bugService.js`
- `src/client/hooks/useBugs.js`
- `src/server/routes/v1/bug.routes.js`
- `src/server/controllers/bug.controller.js`
- `src/server/services/bug.service.js`
- `src/server/db/schema.sql`
- `src/server/db/seed.js`

Run locally with:

```bash
npm install
npm run dev
```

Reset study data with:

```bash
npm run db:reset
```
