-- Run once in Supabase > SQL Editor (new project).
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(trim(title)) > 0),
  slug text not null unique check (length(trim(slug)) > 0),
  description text not null default '',
  image_url text,
  github_url text,
  demo_url text,
  technologies text[] not null default '{}',
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'archived')),
  featured boolean not null default false,
  published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_portfolio_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to anon, authenticated;

drop trigger if exists projects_updated_at on public.projects;
create or replace function public.set_project_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger projects_updated_at before update on public.projects
for each row execute function public.set_project_updated_at();

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;

drop policy if exists "Read own admin status" on public.admin_users;
create policy "Read own admin status" on public.admin_users
for select to authenticated using (user_id = (select auth.uid()));

-- Public visitors see only published projects. Administrators can also see drafts.
drop policy if exists "Read published projects or admin drafts" on public.projects;
create policy "Read published projects or admin drafts" on public.projects
for select to anon, authenticated
using (published = true or (select public.is_portfolio_admin()));

drop policy if exists "Admins insert projects" on public.projects;
create policy "Admins insert projects" on public.projects
for insert to authenticated with check ((select public.is_portfolio_admin()));

drop policy if exists "Admins update projects" on public.projects;
create policy "Admins update projects" on public.projects
for update to authenticated
using ((select public.is_portfolio_admin()))
with check ((select public.is_portfolio_admin()));

drop policy if exists "Admins delete projects" on public.projects;
create policy "Admins delete projects" on public.projects
for delete to authenticated using ((select public.is_portfolio_admin()));

-- Public image bucket; only admins can upload, update or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-images', 'portfolio-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Portfolio images public read" on storage.objects;
create policy "Portfolio images public read" on storage.objects
for select to anon, authenticated using (bucket_id = 'portfolio-images');

drop policy if exists "Portfolio admins upload images" on storage.objects;
create policy "Portfolio admins upload images" on storage.objects
for insert to authenticated
with check (bucket_id = 'portfolio-images' and (select public.is_portfolio_admin()));

drop policy if exists "Portfolio admins update images" on storage.objects;
create policy "Portfolio admins update images" on storage.objects
for update to authenticated
using (bucket_id = 'portfolio-images' and (select public.is_portfolio_admin()))
with check (bucket_id = 'portfolio-images' and (select public.is_portfolio_admin()));

drop policy if exists "Portfolio admins delete images" on storage.objects;
create policy "Portfolio admins delete images" on storage.objects
for delete to authenticated
using (bucket_id = 'portfolio-images' and (select public.is_portfolio_admin()));
