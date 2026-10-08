'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '../../lib/supabase/client';
import { getAdminUser } from '../../lib/supabase/admin';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getAdminUser()
      .then((user) => { if (active && user) router.replace('/admin/'); })
      .catch(() => { /* Show form; errors are handled on submission. */ })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; };
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const supabase = getSupabaseClient();
      const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (loginError) throw loginError;
      const admin = await getAdminUser();
      if (!admin) {
        await supabase.auth.signOut();
        setError('Ce compte ne dispose pas des droits administrateur.');
        return;
      }
      router.replace('/admin/');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Connexion impossible.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-auth-screen">
      <section className="admin-auth-card" aria-labelledby="login-heading">
        <a className="wordmark" href="/">SM<span>.</span></a>
        <p className="admin-eyebrow">ESPACE PRIVÉ / 01</p>
        <h1 id="login-heading">Connexion<span className="admin-accent">.</span></h1>
        <p className="admin-muted">Administration du portfolio.</p>
        <form onSubmit={submit} className="admin-form">
          <label htmlFor="admin-email">Adresse e-mail</label>
          <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={busy || checking}/>
          <label htmlFor="admin-password">Mot de passe</label>
          <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy || checking}/>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="admin-primary-button" type="submit" disabled={busy || checking}>{checking ? 'Vérification…' : busy ? 'Connexion…' : 'Se connecter →'}</button>
        </form>
        <a className="admin-back-link" href="/">← Retour au portfolio</a>
      </section>
    </main>
  );
}
