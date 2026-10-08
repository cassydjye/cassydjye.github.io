# Issue #3 — Manage projects from /admin

## Before starting
- Merge issue #2 into `main`, create a fresh issue #3 branch.
- Supabase project must contain the `schema.sql` tables and RLS policies from issue #1.
- Run `supabase/seed-projects.sql` **once** in Supabase SQL Editor. It inserts the five Stage-mairie repositories; it does not overwrite existing rows.
- Confirm your auth user is listed in `public.admin_users`.
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` and in GitHub repository **Variables** (Settings > Secrets and variables > Actions > Variables) before deployment.

## Features
- `/admin/`: add, edit, delete, publish/hide, set order and featured flag, upload images to `portfolio-images` storage.
- `/`: loads public published projects from Supabase on the client. The five Stage-mairie projects are shown during initial loading as a static placeholder; the database replaces the list when the query completes. Run the seed SQL before deployment. Updates appear on reload without redeploy.
- GitHub Pages still deploys a static Next.js export.

## Test
`npm run check` then `npm run build`, `npm run dev`.
Log in at `/login/`, then open `/admin/`. Edit a project, save, open homepage and refresh. Test publishing and deleting a draft.

## Security
RLS authorizes edits, not the hidden /login path. Never use a service role key in Next.js or GitHub Pages. Uploaded files are public; do not upload private municipal information or personal data.
