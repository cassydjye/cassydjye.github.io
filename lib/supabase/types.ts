export type ProjectStatus = 'in_progress' | 'completed' | 'archived';

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
