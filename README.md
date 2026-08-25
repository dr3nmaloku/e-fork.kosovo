# E-Fork Kosovo Website

Modern bilingual website with an Express backend for quote requests.

## Development

```bash
npm install
npm run dev
```

The Vite dev server is useful for frontend-only changes.

## Production-style local run

```bash
npm run build
npm start
```

The server runs at `http://127.0.0.1:5173/`.

## Backend

- `POST /api/quotes` stores quote requests in SQLite.
- `GET /api/health` checks server/database health.
- `GET /api/admin/quotes` lists recent quote requests.

In production, set `ADMIN_TOKEN` and send it as the `x-admin-token` header to access `/api/admin/quotes`.

SQLite data is stored in `data/efork.sqlite` and is intentionally ignored by git.
