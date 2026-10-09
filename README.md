# Seedjye Malbrouck — Portfolio

Portfolio personnel présentant mes projets de développement web, mobile et d'applications métiers, notamment les réalisations issues de l'organisation GitHub [Stage-mairie](https://github.com/Stage-mairie).

**Site :** https://cassydjye.github.io/

## À propos du projet

Le portfolio est développé avec **Next.js 15**, **React 19** et **TypeScript**. Il conserve une interface publique statique hébergée sur **GitHub Pages**, tandis que les projets et leurs visuels sont administrés via **Supabase**.

Les changements de contenu enregistrés depuis le tableau de bord sont visibles sur le site public après actualisation, **sans commit ni nouveau déploiement**. Le design et la structure du site restent gérés dans le code source.

## Projets mis en avant

| Projet | Description | Technologies principales | Dépôt |
| --- | --- | --- | --- |
| Digital Logbook | Gestion des dons, prêts et retours de matériel | Flutter, Node.js, PostgreSQL, Docker | [GitHub](https://github.com/Stage-mairie/Digital-Logbook) |
| Staff Directory | Annuaire municipal avec recherche et gestion des agents | Python, Flask, MySQL | [GitHub](https://github.com/Stage-mairie/agents-directory) |
| Bureau de Vote MSA | Application Android de recherche de bureaux de vote | Kotlin, Jetpack Compose | [GitHub](https://github.com/Stage-mairie/elections_app) |
| Saint-André City Portal | Portail d'accès aux services et applications municipales | HTML, CSS, JavaScript | [GitHub](https://github.com/Stage-mairie/saint-andre-city-portal) |
| WP Article Builder | Création de brouillons d'articles WordPress depuis un formulaire | PHP, JavaScript, WordPress | [GitHub](https://github.com/Stage-mairie/article_builder) |

Les projets visibles et leur ordre sont configurables depuis l'administration.

## Fonctionnalités

- Portfolio public responsive, avec son identité visuelle d'origine.
- Connexion administrateur via `/login/` (sans lien dans la navigation publique).
- Tableau de bord privé accessible via `/admin/`.
- Création, modification, suppression et classement des projets.
- Publication ou masquage, mise en avant et modification des descriptions et technologies.
- Téléversement de captures dans Supabase Storage.
- Affichage des projets publiés depuis Supabase, sans redéploiement du site.
- Export statique Next.js et déploiement automatique par GitHub Actions.

## Stack technique

| Couche | Technologie |
| --- | --- |
| Interface | Next.js, React, TypeScript, CSS |
| Authentification | Supabase Auth |
| Données | Supabase PostgreSQL |
| Images | Supabase Storage (`portfolio-images`) |
| Hébergement | GitHub Pages |
| CI/CD | GitHub Actions |

## Installation locale

Prérequis : **Node.js 22** et npm.

```powershell
git clone https://github.com/cassydjye/cassydjye.github.io.git
cd cassydjye.github.io
npm ci
Copy-Item .env.example .env.local
```

Renseigner dans `.env.local` les valeurs publiques du projet Supabase :

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
```

> Ne jamais exposer de clé `service_role` ou `secret`. Ne pas commiter `.env.local`, `.env` ou de secrets.

Puis lancer le site :

```powershell
npm run dev
```

- Site public : http://localhost:3000/
- Connexion : http://localhost:3000/login/
- Administration : http://localhost:3000/admin/

### Vérification avant PR

```powershell
npm run check
npm run build
```

Le build doit rester compatible avec `output: 'export'` pour GitHub Pages.

## Configuration Supabase

1. Créer un projet dans [Supabase](https://supabase.com/dashboard).
2. Exécuter `supabase/schema.sql` dans **SQL Editor** pour créer les tables, les politiques RLS et le stockage nécessaires.
3. Exécuter `supabase/seed-projects.sql` une fois pour importer les cinq projets Stage-mairie (sans écraser les lignes existantes portant le même slug).
4. Dans **Authentication → Users**, créer ou inviter le compte administrateur et confirmer son adresse si nécessaire.
5. Dans **SQL Editor**, attribuer les droits admin à son UUID :

```sql
insert into public.admin_users (user_id)
values ('REPLACE_WITH_AUTH_USER_UUID')
on conflict (user_id) do nothing;
```

6. Dans **Authentication → URL Configuration**, configurer :
   - Site URL : `https://cassydjye.github.io`
   - Redirect URLs : `https://cassydjye.github.io/**`

Pour les détails du schéma, consulter [la documentation Supabase](supabase/README.md).

### Sécurité

L'absence de bouton `/login/` ne protège pas l'administration à elle seule. L'accès nécessite Supabase Auth et l'autorisation de l'utilisateur dans `admin_users`. **Les politiques Row Level Security (RLS)** protègent les opérations de lecture et d'écriture sur les données.

Les captures stockées dans le bucket public sont accessibles à tous : **ne pas y déposer de données personnelles, d'informations confidentielles ni de documents internes municipaux**.

## Déploiement GitHub Pages

Dans le dépôt GitHub :

1. Aller dans **Settings → Secrets and variables → Actions → Variables**.
2. Ajouter `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` avec leurs véritables valeurs publiques.
3. Dans **Settings → Pages**, sélectionner **GitHub Actions** comme source de déploiement.
4. Fusionner la PR dans `main`, puis contrôler le workflow de déploiement dans **Actions**.

Le fichier `public/.nojekyll` permet de servir les ressources Next.js commençant par `_next` sur GitHub Pages.

Après déploiement, vérifier :

- https://cassydjye.github.io/
- https://cassydjye.github.io/login/
- https://cassydjye.github.io/admin/

Se connecter, modifier un projet publié, enregistrer, puis actualiser le site public pour valider la mise à jour sans nouveau build.

## Organisation du travail

Une tâche GitHub correspond à une branche issue de `main`, suivie d'une Pull Request :

```powershell
git checkout main
git pull origin main
git checkout -b feat/nom-de-la-fonctionnalite
# Effectuer les changements, puis :
npm run check
npm run build
git add .
git commit -m "feat: describe the change"
git push -u origin HEAD
```

Créer ensuite une Pull Request vers `main` et fusionner après validation.

Conventions de commits : `feat:` (fonctionnalité), `fix:` (correctif), `docs:` (documentation), `chore:` (maintenance).

## Licence et crédits

Portfolio de Seedjye Malbrouck. Les applications liées à l'organisation Stage-mairie peuvent être des réalisations collaboratives et conservent leurs propres crédits et licences dans leurs dépôts respectifs.
