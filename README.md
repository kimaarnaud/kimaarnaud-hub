# kimaarnaud-hub

Site central de [kimaarnaud.com](https://kimaarnaud.com) : portail statique (Astro + Tailwind) qui présente
les 80 projets du portfolio et renvoie vers les plateformes et applications hébergées sur le VPS.

## Démarrer en local

```bash
npm install        # une seule fois
npm run dev        # http://localhost:4321, rechargement à chaud
npm run check      # vérification TypeScript / Astro
npm run build      # génère dist/
npm run preview    # sert dist/ comme en production
```

## Ajouter ou mettre à jour un projet

1. Ouvrir `src/content/projets/<domaine>/NN-slug.md`.
2. Renseigner le front-matter (`status`, `stack`, `skills`, `links`…) : le schéma est dans `src/content.config.ts` et le build échoue si un champ est invalide.
3. Rédiger le corps en Markdown (objectif, réalisation, preuves).
4. `npm run build` pour vérifier, puis commit + pull request.

## Structure

```
src/
  content.config.ts        schéma des fiches projets + collection retex (Zod), métadonnées des domaines
  content/projets/         81 fiches Markdown, un dossier par domaine
  content/retex/           articles de retour d'expérience (journal)
  i18n/ui.ts               dictionnaire FR/EN et helpers de localisation
  data/cv.ts               contenu de la page /cv/ (FR + EN)
  layouts/Base.astro       en-tête, navigation, switcher FR/EN, dark mode, SEO + OG
  components/              ProjectCard, StatusBadge, ThemeToggle
  pages/fr/                pages françaises : index, projets/, blog/, catalogues, competences, cv, contact…
  pages/en/                versions anglaises des pages fixes
  pages/rss.xml.ts         flux RSS du journal
public/docs/               les 4 catalogues (HTML + PDF)
Dockerfile, nginx.conf     image de production (nginx alpine)
docker-compose.yml         déploiement sur le VPS derrière Traefik
.github/workflows/         ci.yml (PR) et deploy.yml (main → GHCR → VPS)
```

## Déploiement

Une fusion sur `main` construit l'image `ghcr.io/kimaarnaud/kimaarnaud-hub` et exécute
`docker compose pull && up -d` dans `/srv/hub` sur le VPS (secrets `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`).
Voir le guide `GUIDE.md` pour la mise en place complète (VPS, DNS, Traefik).
