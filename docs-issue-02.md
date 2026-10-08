# Issue #2 — Supabase login and admin dashboard

## Setup

- Issue #1 must be merged/applied and `supabase/schema.sql` executed.
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env` (and GitHub Actions repository variables for Pages).
- Create a user in Supabase Authentication > Users; confirm the user's email if required.
- Grant that user admin access in Supabase SQL Editor (replace the placeholder UUID):

```sql
insert into public.admin_users (user_id)
values ('REPLACE_WITH_AUTH_USER_UUID')
on conflict (user_id) do nothing;
```

- `npm run check` and `npm run build` must pass.
- Open `http://localhost:3000/login/` or `https://cassydjye.github.io/login/` after deployment.
- Never commit `.env` or private credentials. Do not use `service_role` / secret keys in browser code.

## Scope

- Password sign-in and private admin eligibility check using `admin_users`.
- `/admin/` route with counts, project list and sign-out.
- This is a client-only route guard suitable for static hosting, **not a server-side boundary**. Database authorization is enforced by Supabase RLS defined in Issue #1.
- No public admin navigation item; public homepage remains unchanged.
- Adding/editing/deleting projects and syncing the public portfolio are in Issue #3.

## Manual smoke tests

1. Anonymous visitor to `/admin/` is redirected to `/login/`.
2. A valid non-admin user signing in is refused and signed out.
3. An admin user signs in and can see the dashboard.
4. Refresh `/admin/` directly (GitHub Pages serves `admin/index.html` with existing `trailingSlash: true`).
5. Sign out, then try `/admin/` again.
6. Ensure unauthenticated users cannot read unpublished projects or mutate projects via Supabase API (RLS).
