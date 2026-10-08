# Issue 1 — Supabase setup (GitHub Pages compatible)

## 1. Create Supabase project

Create a project at https://supabase.com/dashboard.

Go to **SQL Editor** and execute `supabase/schema.sql` once. This creates the `projects` table, `admin_users` access list, RLS policies, and the public `portfolio-images` storage bucket.

## 2. Create ONLY your admin account

In **Authentication > Providers > Email**, enable email/password authentication. Disable public signups (Allow new users to sign up = off) for this personal portfolio. In **Authentication > Users**, create/invite your own admin email account (confirm it before attempting to sign in). Copy its UUID, then in SQL Editor run:

```sql
insert into public.admin_users (user_id)
values ('REPLACE_WITH_AUTH_USER_UUID');
```

Never put this UUID, any password, or Supabase secret/service_role key into browser code.

## 3. Configure local development

Copy `.env.example` to `.env.local` and fill in Supabase project URL and public publishable/anon key. Restart `npm run dev` if it is running.

## 4. Configure GitHub Pages deployment

In the **portfolio repository** > Settings > Secrets and variables > Actions > **Variables**, add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

GitHub Actions injects them at build time. They are intentionally **public client credentials**, not secrets; the database is secured by RLS and authentication.

## 5. Supabase auth configuration

In **Authentication > URL Configuration**, configure Site URL to `https://cassydjye.github.io` and add `https://cassydjye.github.io/**` as an allowed Redirect URL. If you deploy under a repository subpath or custom domain, adjust accordingly.

## 6. Verify

Run `npm run check` and `npm run build`. The current portfolio is unchanged on this first issue. `/login` and `/admin` UIs are implemented in issue 2. The client is initialized only in the browser, preserving Next.js `output: 'export'`.

If admin account creation is done by an invite email, confirm the user and auth settings before testing login.
