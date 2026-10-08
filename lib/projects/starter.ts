import type { PortfolioProject } from '../supabase/types';

// Safe static fallback until the optional seed SQL has been applied.
const entries = [
  ['digital-logbook', 'Digital Logbook', 'Tablet and web application for tracking equipment donations and loans.', 'Flutter,Node.js,PostgreSQL,Docker', 'Digital-Logbook'],
  ['agents-directory', 'Staff Directory', 'Internal staff directory with search, department filters, and role-based administration.', 'Python,Flask,MySQL,JavaScript', 'agents-directory'],
  ['elections-app', 'Bureau de Vote MSA', 'Android app for searching polling stations by voter name or date of birth.', 'Kotlin,Jetpack Compose,Android', 'elections_app'],
  ['saint-andre-city-portal', 'Saint-André City Portal', 'Responsive municipal services portal with news and application shortcuts. Collaborative project.', 'HTML,CSS,JavaScript', 'saint-andre-city-portal'],
  ['article-builder', 'WP Article Builder', 'Lightweight frontend for creating WordPress draft posts.', 'PHP,WordPress,JavaScript', 'article_builder'],
] as const;

export const starterProjects: PortfolioProject[] = entries.map(([slug, title, description, tags, repo], i) => ({
  id: slug, slug, title, description, technologies: tags.split(','),
  github_url: `https://github.com/Stage-mairie/${repo}`, demo_url: null,
  image_url: null, status: 'completed', featured: i < 3, published: true,
  display_order: i, created_at: '', updated_at: '',
}));
