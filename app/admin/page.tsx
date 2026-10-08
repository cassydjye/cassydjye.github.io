'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminUser } from '../../lib/supabase/admin';
import { getSupabaseClient } from '../../lib/supabase/client';
import type { PortfolioProject } from '../../lib/supabase/types';

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const admin = await getAdminUser();
        if (!active) return;
        if (!admin) { router.replace('/login/'); return; }
        setEmail(admin.email ?? 'Administrateur');
        const { data, error: queryError } = await getSupabaseClient()
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        if (queryError) throw queryError;
        if (active) setProjects((data ?? []) as PortfolioProject[]);
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : 'Chargement impossible.');
      } finally {
        if (active) setChecking(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [router]);

  async function logout() {
    const { error: logoutError } = await getSupabaseClient().auth.signOut();
    if (logoutError) { setError(logoutError.message); return; }
    router.replace('/login/');
  }

  if (checking) return <main className="admin-loading" role="status">Vérification de l'accès administrateur…</main>;

  // Never display private project information on a failed authorization check.
  if (!email) return <main className="admin-loading"><p role="alert">{error || 'Accès impossible.'}</p><a href="/login/">Retour à la connexion</a></main>;

  return (
    <main className="admin-dashboard shell">
      <header className="admin-dashboard-header">
        <div>
          <a className="wordmark" href="/">SM<span>.</span></a>
          <p className="admin-eyebrow">PORTFOLIO / ADMINISTRATION</p>
          <h1>Tableau de bord<span className="admin-accent">.</span></h1>
          <p className="admin-muted">Connecté : {email}</p>
        </div>
        <button className="admin-outline-button" type="button" onClick={() => void logout()}>Déconnexion ↗</button>
      </header>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <div className="admin-stats">
        <article className="admin-stat"><span>01 / PROJETS</span><strong>{projects.length}</strong><p>Total enregistré</p></article>
        <article className="admin-stat"><span>02 / PUBLIÉS</span><strong>{projects.filter((project) => project.published).length}</strong><p>Visibles publiquement après l'issue 3</p></article>
        <article className="admin-stat"><span>03 / BROUILLONS</span><strong>{projects.filter((project) => !project.published).length}</strong><p>Non publiés</p></article>
      </div>
      <section className="admin-projects" aria-labelledby="admin-projects-title">
        <div className="admin-section-head">
          <div><p className="admin-eyebrow">GESTION DU CONTENU</p><h2 id="admin-projects-title">Projets enregistrés</h2></div>
          <span className="admin-pill">Édition prévue dans l'issue #3</span>
        </div>
        {projects.length === 0 ? (
          <p className="admin-muted">Aucun projet dans Supabase pour le moment. L'import des applications Stage-mairie et les formulaires de gestion arrivent dans l'issue #3.</p>
        ) : (
          <ul className="admin-project-list">{projects.map((project) => <li key={project.id}><div><strong>{project.title}</strong><p>{project.description}</p></div><span className="admin-pill">{project.published ? 'Publié' : 'Brouillon'}</span></li>)}</ul>
        )}
      </section>
      <p className="admin-muted admin-footer">Le portfolio public n'est pas modifié par cette issue. <a href="/">Voir le site ↗</a></p>
    </main>
  );
}
