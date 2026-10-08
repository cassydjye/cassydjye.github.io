'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminUser } from '../../lib/supabase/admin';
import { getSupabaseClient } from '../../lib/supabase/client';
import type { PortfolioProject, ProjectStatus } from '../../lib/supabase/types';

type Draft = Pick<PortfolioProject, 'title' | 'slug' | 'description' | 'image_url' | 'github_url' | 'demo_url' | 'technologies' | 'status' | 'featured' | 'published' | 'display_order'>;
const blank = (): Draft => ({ title: '', slug: '', description: '', image_url: null, github_url: null, demo_url: null, technologies: [], status: 'in_progress', featured: false, published: false, display_order: 0 });
const asText = (v: string) => v.trim() || null;

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(blank());
  const [tags, setTags] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function refresh() {
    const { data, error: err } = await getSupabaseClient().from('projects').select('*').order('display_order', { ascending: true });
    if (err) throw err;
    setProjects((data ?? []) as PortfolioProject[]);
  }
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const admin = await getAdminUser();
        if (!active) return;
        if (!admin) { router.replace('/login/'); return; }
        setEmail(admin.email ?? 'Administrateur');
        await refresh();
      } catch (e) { if (active) setError(e instanceof Error ? e.message : 'Erreur de chargement'); }
      finally { if (active) setChecking(false); }
    })();
    return () => { active = false; };
  }, [router]);

  function open(project?: PortfolioProject) {
    setEditing(project?.id ?? 'new');
    setDraft(project ? { title: project.title, slug: project.slug, description: project.description, image_url: project.image_url, github_url: project.github_url, demo_url: project.demo_url, technologies: project.technologies, status: project.status, featured: project.featured, published: project.published, display_order: project.display_order } : { ...blank(), display_order: projects.length });
    setTags(project?.technologies.join(', ') ?? '');
    setError(''); setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const change = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft(prev => ({ ...prev, [key]: value }));

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setError(''); setNotice('');
    try {
      if (!draft.title.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug)) throw new Error('Titre requis et slug au format lettres-minuscules-et-tirets.');
      const payload = { ...draft, title: draft.title.trim(), slug: draft.slug.trim(), description: draft.description.trim(), technologies: tags.split(',').map(t => t.trim()).filter(Boolean), image_url: asText(draft.image_url ?? ''), github_url: asText(draft.github_url ?? ''), demo_url: asText(draft.demo_url ?? '') };
      const db = getSupabaseClient();
      const result = editing === 'new' ? await db.from('projects').insert(payload) : await db.from('projects').update(payload).eq('id', editing);
      if (result.error) throw result.error;
      await refresh(); setEditing(null); setNotice('Projet enregistré.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) { setError(e instanceof Error ? e.message : 'Erreur d’enregistrement'); }
    finally { setSaving(false); }
  }
  async function remove(project: PortfolioProject) {
    if (!window.confirm(`Supprimer définitivement « ${project.title} » ?`)) return;
    setError('');
    const { error: err } = await getSupabaseClient().from('projects').delete().eq('id', project.id);
    if (err) { setError(err.message); return; }
    try { await refresh(); setNotice('Projet supprimé.'); } catch (e) { setError(String(e)); }
  }
  async function toggle(project: PortfolioProject) {
    setError('');
    const { error: err } = await getSupabaseClient().from('projects').update({ published: !project.published }).eq('id', project.id);
    if (err) setError(err.message);
    else { try { await refresh(); } catch (e) { setError(String(e)); } }
  }
  async function upload(file: File) {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type) || file.size > 5 * 1024 * 1024) { setError('Image JPG, PNG, WebP ou GIF, maximum 5 Mo.'); return; }
    setSaving(true); setError('');
    try {
      const path = `${crypto.randomUUID()}.${file.name.split('.').pop()?.toLowerCase() || 'webp'}`;
      const client = getSupabaseClient();
      const { error: err } = await client.storage.from('portfolio-images').upload(path, file, { contentType: file.type });
      if (err) throw err;
      change('image_url', client.storage.from('portfolio-images').getPublicUrl(path).data.publicUrl);
    } catch (e) { setError(e instanceof Error ? e.message : 'Upload impossible'); }
    finally { setSaving(false); }
  }
  async function logout() { await getSupabaseClient().auth.signOut(); router.replace('/login/'); }

  if (checking) return <main className="admin-loading" role="status">Vérification de l'accès administrateur…</main>;
  if (!email) return <main className="admin-loading"><p role="alert">{error || 'Accès refusé.'}</p><a href="/login/">Connexion</a></main>;

  return <main className="admin-dashboard shell">
    <header className="admin-dashboard-header"><div><a className="wordmark" href="/">SM<span>.</span></a><p className="admin-eyebrow">PORTFOLIO / ADMINISTRATION</p><h1>Tableau de bord<span className="admin-accent">.</span></h1><p className="admin-muted">{email}</p></div><button className="admin-outline-button" onClick={() => void logout()}>Déconnexion ↗</button></header>
    {error && <p role="alert" className="admin-error">{error}</p>}{notice && <p role="status" className="admin-muted">{notice}</p>}
    {!editing && <>
    <div className="admin-stats"><article className="admin-stat"><span>01 / PROJETS</span><strong>{projects.length}</strong><p>Total</p></article><article className="admin-stat"><span>02 / PUBLIÉS</span><strong>{projects.filter(p => p.published).length}</strong><p>En ligne</p></article><article className="admin-stat"><span>03 / BROUILLONS</span><strong>{projects.filter(p => !p.published).length}</strong><p>Privés</p></article></div>
    <section className="admin-projects"><div className="admin-section-head"><div><p className="admin-eyebrow">GESTION DU CONTENU</p><h2>Mes projets</h2></div><button className="admin-primary-button" onClick={() => open()}>+ Nouveau projet</button></div>
      {projects.length === 0 && <p className="admin-muted">Aucun projet. Exécute le script supabase/seed-projects.sql pour importer Stage-mairie.</p>}
      <ul className="admin-project-list">{projects.map(p => <li key={p.id}><div><strong>{p.title}</strong><p>{p.published ? 'Publié' : 'Brouillon'} · position {p.display_order} · {p.featured ? 'Mis en avant' : 'Standard'}</p></div><div className="admin-item-actions"><button className="admin-outline-button" onClick={() => open(p)}>Modifier</button><button className="admin-outline-button" onClick={() => void toggle(p)}>{p.published ? 'Masquer' : 'Publier'}</button><button className="admin-outline-button" onClick={() => void remove(p)}>Supprimer</button></div></li>)}</ul>
    </section>
    </>}
    {editing && <section className="admin-editor" aria-labelledby="editor-title"><div className="admin-section-head"><h2 id="editor-title">{editing === 'new' ? 'Nouveau projet' : 'Modifier le projet'}</h2><button className="admin-outline-button" onClick={() => { setEditing(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>← Retour aux projets</button></div><form onSubmit={e => void save(e)} className="admin-edit-grid">
      <label>Titre<input required value={draft.title} onChange={e => change('title', e.target.value)} /></label>
      <label>Slug (unique)<input required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={draft.slug} onChange={e => change('slug', e.target.value)} /></label>
      <label className="admin-wide">Description<textarea rows={4} value={draft.description} onChange={e => change('description', e.target.value)} /></label>
      <label>Technologies (séparées par virgules)<input value={tags} onChange={e => setTags(e.target.value)} /></label>
      <label>Position<input type="number" value={draft.display_order} onChange={e => change('display_order', Number(e.target.value))} /></label>
      <label>GitHub URL<input type="url" value={draft.github_url ?? ''} onChange={e => change('github_url', e.target.value)} /></label>
      <label>Démo URL<input type="url" value={draft.demo_url ?? ''} onChange={e => change('demo_url', e.target.value)} /></label>
      <label className="admin-wide">Image URL (HTTPS)<input type="url" value={draft.image_url ?? ''} onChange={e => change('image_url', e.target.value)} /></label>
      <label className="admin-wide">Ou importer une image (5 Mo max)<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e => { const file = e.target.files?.[0]; if (file) void upload(file); }} /></label>
      <label>Statut<select value={draft.status} onChange={e => change('status', e.target.value as ProjectStatus)}><option value="in_progress">En cours</option><option value="completed">Terminé</option><option value="archived">Archivé</option></select></label>
      <div className="admin-flags"><label><input type="checkbox" checked={draft.featured} onChange={e => change('featured', e.target.checked)} /> Mis en avant</label><label><input type="checkbox" checked={draft.published} onChange={e => change('published', e.target.checked)} /> Publier</label></div>
      <button className="admin-primary-button" type="submit" disabled={saving}>{saving ? 'Patiente…' : 'Enregistrer le projet'}</button>
    </form></section>}
    <p className="admin-muted admin-footer"><a href="/">Voir mon portfolio ↗</a></p>
  </main>;
}
