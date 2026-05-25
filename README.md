# Employee Timesheet Portal

Split web app for a WordPress-linked employee timesheet portal.

- Frontend: React + Vite + Tailwind, deployable to GitHub Pages
- Backend: FastAPI, deployable to Render
- Database: Neon Postgres
- Auth: Neon Auth

## Architecture

```txt
WordPress Employee Login link
  -> GitHub Pages React frontend
  -> Neon Auth sign in / sign up
  -> FastAPI API on Render
  -> Neon Postgres
```

## Important Neon Auth note

The frontend uses Neon Auth through `@neondatabase/neon-js/auth`. The backend verifies bearer tokens against Neon Auth's JWKS endpoint. In Neon, enable Auth and enable/configure the JWT plugin so your frontend session token is a JWT that FastAPI can verify.

Neon's React quickstart documents `createAuthClient`, `signUp`, `signIn`, `getSession`, and `signOut`. Neon also documents that JWT verification uses the JWKS endpoint at `<YOUR_NEON_AUTH_URL>/.well-known/jwks.json`.

## Local backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Set `DATABASE_URL` to your Neon pooled or direct connection string using the SQLAlchemy psycopg driver:

```env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST.neon.tech/DB?sslmode=require
```

## Local frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Required frontend environment variables

```env
VITE_API_URL=http://localhost:8000
VITE_NEON_AUTH_URL=https://your-neon-auth-url/neondb/auth
VITE_ALLOWED_EMAIL_DOMAIN=mycompany.com
VITE_GITHUB_PAGES_BASE=/employee-timesheet-portal/
```

## GitHub Pages deployment

The workflow is in `frontend/.github/workflows/deploy.yml`. If your repo keeps workflows only at root, move it to `.github/workflows/deploy.yml` and keep the frontend working directory settings.

Set GitHub repository variables:

- `VITE_API_URL`
- `VITE_NEON_AUTH_URL`
- `VITE_ALLOWED_EMAIL_DOMAIN`
- `VITE_GITHUB_PAGES_BASE`

Then enable GitHub Pages from GitHub Actions.

## Admin access

The user whose email equals `ADMIN_EMAIL` becomes admin automatically after first login. Admins can view all timesheets, filter by employee email, update status, and export CSV.

## Security controls included

- Company email domain enforced in frontend and backend
- Backend JWT verification via Neon Auth JWKS
- Employees can only access their own timesheets
- Admin-only endpoints for all-timesheet access
- SMTP credentials, database URL, and auth settings are environment variables
- CORS restricted to the configured frontend origin
- HTTPS-ready on GitHub Pages and Render

## Production checklist

- Replace `mycompany.com` with your real domain.
- Configure Neon Auth email/password and password reset settings.
- Enable Neon Auth JWT plugin and confirm the token claims include `sub` and `email`.
- Add your GitHub Pages URL to Neon Auth allowed origins/callback URLs.
- Add your Render API URL to frontend `VITE_API_URL`.
- Configure SMTP with an app password or transactional email provider.
- Consider adding Alembic migrations before long-term production use.
