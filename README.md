# Todo App — React + Flask + Postgres

- **Frontend:** React (Vite)
- **Backend:** Python (Flask)
- **Database:** Postgres

## Local development

### 1. Get a Postgres server running

Pick one:

**Docker (easiest)**
```
docker run --name todo-postgres -e POSTGRES_PASSWORD=devpassword -e POSTGRES_DB=tododb -p 5432:5432 -d postgres
```

**Install Postgres directly** — https://www.postgresql.org/download/, then `createdb tododb`

### 2. Run the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
export DATABASE_URL="postgresql://postgres:devpassword@localhost:5432/tododb"
python app.py
```

Backend runs at http://localhost:5000

### 3. Run the frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:5173 and proxies `/api/*` to the Flask backend — no env vars needed locally.

---

## Deploying to Render + a custom domain

### 1. Push this repo to GitHub
Render deploys straight from a connected GitHub repo.

### Option A — one-click with the included blueprint
This repo includes `render.yaml`. In the Render dashboard: **New → Blueprint**, select your repo, and Render will create the Postgres database, backend web service, and frontend static site together. You'll still need to manually set two env vars afterward (Render will prompt you, since they depend on each service's generated URL):
- On `todo-backend`: `FRONTEND_URL` = your frontend's URL
- On `todo-frontend`: `VITE_API_URL` = your backend's URL, then trigger a redeploy of the frontend so the build picks it up

### Option B — set up each piece manually
1. **Database:** New → PostgreSQL. Once created, copy the *internal* connection string.
2. **Backend:** New → Web Service → connect repo → root directory `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `gunicorn app:app`
   - Env vars: `DATABASE_URL` (the internal Postgres string from step 1)
3. **Frontend:** New → Static Site → connect repo → root directory `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
   - Env var: `VITE_API_URL` = your backend's `https://todo-backend.onrender.com` URL
4. Go back to the backend service and add `FRONTEND_URL` = your frontend's URL, so CORS only allows requests from your actual site.

### 2. Point your domain at the frontend
On the frontend static site: Settings → Custom Domains → add your domain. Render will show you a DNS record (usually a CNAME) to add at your domain registrar. HTTPS is set up automatically once DNS propagates.

### Notes on the free tier
- Free web services spin down after inactivity, so there's a cold-start delay on the first request after idle time.
- Render's free Postgres database expires after 30 days — fine for testing, but you'll want a paid plan (~$6/mo) before relying on it long-term.

## What changed from the SQLite version

- `sqlite3` → `psycopg2` for the database connection
- `?` placeholders → `%s` placeholders in SQL queries
- `INTEGER PRIMARY KEY AUTOINCREMENT` → `SERIAL PRIMARY KEY`
- Database is now a `DATABASE_URL` env var instead of a local file
- Frontend fetch calls now go through an `API_URL` constant (empty locally, set via `VITE_API_URL` in production) instead of hardcoded relative paths

## API

| Method | Route              | Body                     | Description       |
|--------|---------------------|---------------------------|--------------------|
| GET    | /api/todos           | –                         | List all todos     |
| POST   | /api/todos           | `{ "text": "..." }`      | Create a todo       |
| PATCH  | /api/todos/:id       | `{ "done": true }`       | Update a todo       |
| DELETE | /api/todos/:id       | –                         | Delete a todo       |


