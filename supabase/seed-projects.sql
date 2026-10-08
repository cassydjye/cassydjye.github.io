-- Run once in Supabase SQL Editor, after schema.sql. No destructive updates.
-- Existing slugs are left unchanged so edits made in /admin are preserved.
insert into public.projects (slug, title, description, technologies, github_url, display_order, featured, published, status)
values
('digital-logbook', 'Digital Logbook', 'Tablet and web application for managing equipment donations and loans.', ARRAY['Flutter','Node.js','PostgreSQL','Docker']::text[], 'https://github.com/Stage-mairie/Digital-Logbook', 0, true, true, 'completed'),
('agents-directory', 'Staff Directory', 'Municipal staff directory with search, departmental filters and role-based access.', ARRAY['Python','Flask','MySQL','JavaScript']::text[], 'https://github.com/Stage-mairie/agents-directory', 1, true, true, 'completed'),
('elections-app', 'Bureau de Vote MSA', 'Android application to find a polling station from voter identity details.', ARRAY['Kotlin','Jetpack Compose','Android']::text[], 'https://github.com/Stage-mairie/elections_app', 2, true, true, 'completed'),
('saint-andre-city-portal', 'Saint-André City Portal', 'Responsive municipal portal with application shortcuts and news. Collaborative project.', ARRAY['HTML','CSS','JavaScript']::text[], 'https://github.com/Stage-mairie/saint-andre-city-portal', 3, false, true, 'completed'),
('article-builder', 'WP Article Builder', 'Web interface to create WordPress draft articles.', ARRAY['PHP','WordPress','JavaScript']::text[], 'https://github.com/Stage-mairie/article_builder', 4, false, true, 'completed')
on conflict (slug) do nothing;
