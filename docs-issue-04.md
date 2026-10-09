# Issue #4 — Final portfolio content and GitHub Pages deployment

This issue finalizes the existing Next.js static export. The visual design stays unchanged, and projects remain editable from `/admin/` without redeploying the website.

## Before merging

1. Merge issue #3 to `main`; create a new branch from the updated `main`.
2. Confirm the project `portfolio_2026` is available in Supabase. Apply `supabase/schema.sql` and `supabase/seed-projects.sql` if they have not already been applied.
3. In GitHub repository **Settings > Secrets and variables > Actions > Variables**, create:
   - `NEXT_PUBLIC_SUPABASE_URL` with your project's `https://...supabase.co` URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your project's public publishable/anon key.
   Never use a service role or secret key for the browser.
4. In GitHub **Settings > Pages**, choose **GitHub Actions** as the build/deployment source.
5. In Supabase **Authentication > URL Configuration**, set the Site URL to `https://cassydjye.github.io` and add `https://cassydjye.github.io/**` to Redirect URLs.
6. Make sure your admin user is present in `public.admin_users`.

## Changes

- Add `public/.nojekyll` so GitHub Pages serves Next.js `_next` assets.
- Use `npm ci` for reproducible builds; run TypeScript validation in CI.
- Fail the Pages workflow early when Supabase GitHub Variables are absent or the project URL is a placeholder.
- Ignore generated `tsconfig.tsbuildinfo` to avoid accidental future patches.
- Preserve starter project cards when Supabase cannot initialize in a browser (production should still use Supabase).

## Test locally

```powershell
npm ci
npm run check
npm run build
npm run dev
```

Confirm `/`, `/login/`, and `/admin/` load correctly. Sign in, edit a published project, then refresh `/` to confirm your edits appear without redeployment. The initial public placeholders are intentional while the Supabase query loads.

## After merging

1. Check **Actions > Deploy Next.js site to GitHub Pages** for a successful deployment.
2. Open `https://cassydjye.github.io/`, `/login/` and `/admin/`.
3. Use developer tools Network tab to confirm that `/` fetches published projects from Supabase and `_next` assets return HTTP 200.
4. Upload real screenshots and adjust project descriptions using `/admin/` as desired — no rebuild needed.
5. If the page still has stale content, hard-refresh. If it does not update after refresh, check the Supabase request and RLS policy.

**Note:** A GitHub Pages URL is public; lack of a navigation link to `/login/` is not a security boundary. Authentication and RLS secure admin operations. Public Storage must not contain confidential or personal municipal data.
