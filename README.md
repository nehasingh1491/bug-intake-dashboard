# Bug Intake Dashboard Study

This is a lightweight internal dashboard used by QA and product teams to track incoming bugs.

The repository is prepared for a software engineering / HCI study. Participants will complete a small junior-developer-style ticket that may require coordinated frontend, backend, and database changes.

## Setup

```bash
npm install
npm run dev
```

The app runs the Express API on port `8080` and the Vite frontend on port `3000`.

## Optional Reset

```bash
npm run db:reset
```

This resets the local SQLite database with the study seed bugs.

## Architecture Overview

- React/Vite frontend
- Express API under `/api/v1`
- SQLite local database
- Client API service layer in `src/client/services/`
- Client data hooks in `src/client/hooks/`
- Server route/controller/service layers

Data flows from UI to API to SQLite and back. Field changes usually require updates in multiple places.

## Key Entry Points

Frontend routes:

- `/bugs` - bug list and filters
- `/bugs/new` - new bug form
- `/bugs/:id` - bug detail and status update

Frontend files:

- `src/client/pages/BugListPage.jsx`
- `src/client/pages/BugDetailPage.jsx`
- `src/client/pages/NewBugPage.jsx`
- `src/client/components/bugs/BugTable.jsx`
- `src/client/components/bugs/BugForm.jsx`
- `src/client/components/bugs/BugFilters.jsx`
- `src/client/services/bugService.js`
- `src/client/hooks/useBugs.js`

Backend files:

- `src/server/routes/v1/bug.routes.js`
- `src/server/controllers/bug.controller.js`
- `src/server/services/bug.service.js`
- `src/server/db/database.js`
- `src/server/db/schema.sql`
- `src/server/db/seed.js`

## Current API Reference

All endpoints return a consistent JSON response:

```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "timestamp": "2026-04-28T12:00:00.000Z"
}
```

Endpoints:

```text
GET    /api/v1/bug/list
GET    /api/v1/bug/:id
POST   /api/v1/bug
PUT    /api/v1/bug/:id
PATCH  /api/v1/bug/:id/status
```

List filters:

```text
GET /api/v1/bug/list?status=open&priority=high
```

Allowed values:

- `status`: `open`, `in_progress`, `blocked`, `resolved`
- `priority`: `low`, `medium`, `high`
- `area`: `frontend`, `backend`, `auth`, `notifications`, `search`, `performance`, `other`

## Notes For Participants

- The README gives entry points but does not describe every implementation detail.
- The app is intentionally small enough to inspect during a short task.
- Most field or workflow changes touch the React form/table, API service, server validation, server service, and SQLite schema/seed data.
