# Guide pas à pas : réaliser et héberger le hub kimaarnaud.com

Ce guide suppose que vous n'avez jamais utilisé Astro. Il se lit dans l'ordre. Chaque étape se termine par
un commit et un push : une fonctionnalité = une branche = une pull request. La mise en ligne sur le VPS
n'intervient qu'à la fin (étapes 9 à 12), mais une fois faite, chaque fusion sur `main` se déploie seule.

## 0. Ce qu'est Astro, en cinq points

1. Astro est un **générateur de site statique** : `npm run build` transforme vos fichiers en HTML/CSS pur dans `dist/`. Aucun serveur Node en production, juste nginx qui sert des fichiers.
2. Un fichier `.astro` = un composant ou une page. En haut, entre `---`, du TypeScript exécuté **au moment du build** ; en dessous, du HTML avec des `{expressions}` comme en JSX.
3. `src/pages/` définit les URL : `src/pages/catalogues.astro` → `/catalogues/`, `src/pages/projets/[...id].astro` → une page par projet.
4. Les **content collections** (`src/content/projets/*.md`) sont vos données : du Markdown avec un en-tête YAML (« front-matter ») validé par un schéma. Une fiche mal remplie fait échouer le build, jamais le site en ligne.
5. Par défaut Astro n'envoie **aucun JavaScript** au navigateur. Le seul script du site est le filtre de la page Projets (`<script>` dans `projets/index.astro`).

## 1. Préparer votre poste (30 min)

```bash
# Node.js 22 LTS (Windows : installeur sur nodejs.org ; macOS/Linux : nvm)
node -v            # doit afficher v22.x
git --version
```

Installez VS Code et l'extension **Astro** (coloration + vérification des fichiers `.astro`), ainsi que **Prettier**.
Créez un compte GitHub si nécessaire (vous l'avez : `kimaarnaud`).

## 2. Récupérer le squelette et le lancer (15 min)

Dézippez `kimaarnaud-hub.zip` (fourni) dans votre dossier de travail, puis :

```bash
cd kimaarnaud-hub
npm install
npm run dev
```

Ouvrez http://localhost:4321. Modifiez le texte d'accueil dans `src/pages/index.astro` : la page se met à jour instantanément. Vous savez maintenant développer avec Astro.

Créez le dépôt GitHub **vide** `kimaarnaud/kimaarnaud-hub` (sans README), puis :

```bash
git init -b main
git add .
git commit -m "chore: squelette Astro du hub"
git remote add origin https://github.com/kimaarnaud/kimaarnaud-hub.git
git push -u origin main
```

Dans GitHub → Settings → Branches, ajoutez une règle sur `main` : « Require a pull request before merging » et « Require status checks to pass » (cochez `CI / build` après la première PR). Vous vous interdisez ainsi de pousser directement sur `main` : tout passe par une PR, y compris pour vous seul. C'est ce qui rend le dépôt lisible pour un recruteur.

## 3. Le workflow Git que vous répéterez pour chaque fonctionnalité

```bash
git switch main && git pull                 # repartir de la dernière version
git switch -c feat/nom-de-la-fonctionnalite # une branche par fonctionnalité
# ... développer, tester avec npm run dev ...
npm run check && npm run build              # ce que la CI fera aussi
git add -A
git commit -m "feat: page compétences générée depuis les fiches"
git push -u origin feat/nom-de-la-fonctionnalite
```

Sur GitHub : **Compare & pull request** → décrivez ce que fait la PR, ajoutez une capture d'écran → attendez le
feu vert de la CI (`ci.yml` : `npm run check` + `npm run build`) → **Squash and merge** → supprimez la branche.
Puis `git switch main && git pull`. Préfixes de commit conseillés : `feat:`, `fix:`, `content:` (fiche projet), `docs:`, `chore:`.

Tant que le VPS n'est pas configuré (étape 9), le workflow `deploy.yml` échouera à l'étape SSH : c'est attendu. Vous pouvez le désactiver temporairement (Actions → Deploy → « Disable workflow ») et le réactiver à l'étape 11.

## 4. Fonctionnalités à réaliser, dans l'ordre (une PR chacune)

Le squelette contient déjà une version de chaque page ; ces PR sont vos itérations pour vous l'approprier.

| PR | Branche | Ce que vous faites | Fichiers |
|---|---|---|---|
| 1 | `feat/identite` | Votre nom, votre accroche, vos liens (GitHub, LinkedIn, e-mail), favicon | `index.astro`, `contact.astro`, `Base.astro`, `public/favicon.svg` |
| 2 | `content/fiche-hub` | Compléter la fiche `logiciel/00-hub-kimaarnaud-com.md` au fil de votre avancement | `src/content/projets/logiciel/00-*.md` |
| 3 | `feat/carte-projet` | Ajouter une image de couverture optionnelle sur les cartes (`cover` est déjà dans le schéma) | `ProjectCard.astro`, une fiche avec `cover: ./cover.png` |
| 4 | `feat/tri-projets` | Sur `/projets/`, ajouter un tri (numéro, statut, mise à jour) au filtre existant | `projets/index.astro` |
| 5 | `feat/page-cv` | Page `/cv/` : parcours, formation, matrice de compétences résumée, lien PDF | `src/pages/cv.astro`, `public/cv.pdf` |
| 6 | `feat/blog` | Deuxième collection `retex` (articles de retour d'expérience), liste + page article + flux RSS (`@astrojs/rss`) | `content.config.ts`, `src/content/retex/`, `src/pages/blog/` |
| 7 | `feat/og-image` | Balises Open Graph avec image par page (aperçu propre sur LinkedIn) | `Base.astro`, `public/og.png` |
| 8 | `feat/i18n-en` | Version anglaise des pages fixes (`src/pages/en/`) si vous visez l'international | `src/pages/en/*` |
| 9 | `feat/statut-plateformes` | Sur l'accueil, afficher l'état des plateformes en lisant un petit JSON publié par Uptime Kuma **au build** (`fetch` dans le front-matter) | `index.astro` |
| 10 | `content/fiches-*` | Au fil des mois : chaque projet terminé = une PR qui passe son statut à `termine` et ajoute les preuves | `src/content/projets/**` |

Comment faire une nouvelle page (exemple PR 5) :

```astro
---
// src/pages/cv.astro
import Base from '../layouts/Base.astro';
---
<Base title="CV">
  <h1 class="text-3xl font-bold tracking-tight">Curriculum vitae</h1>
  <p class="mt-2 text-slate-600">…</p>
</Base>
```

Ajoutez ensuite le lien dans le tableau `nav` de `Base.astro`. C'est tout : Astro crée `/cv/`.

Comment lire les fiches dans une page (déjà utilisé dans `index.astro`) :

```ts
import { getCollection } from 'astro:content';
const termines = await getCollection('projets', (p) => p.data.status === 'termine');
```

## 5. Tester comme en production, sur votre machine (10 min)

```bash
docker compose -f docker-compose.local.yml up --build
# http://localhost:8080 : c'est exactement l'image qui tournera sur le VPS
```

Vérifiez : page d'accueil, un projet, une URL inexistante (page 404 personnalisée), les PDF des catalogues.

## 6. Contrôle qualité avant de passer à l'hébergement

- Lighthouse (Chrome → DevTools → Lighthouse) sur `/` et `/projets/` : visez ≥ 95 partout.
- Validez le HTML : https://validator.w3.org/nu/ sur le fichier `dist/index.html`.
- Testez la navigation au clavier (Tab) et un lecteur d'écran si possible.
- Relisez les textes : c'est la première page qu'un recruteur verra.

## 7. Préparer le VPS OVH (une fois, 1 h)

Connectez-vous en `root` avec les identifiants du mail OVH, puis :

```bash
adduser arnaud && usermod -aG sudo arnaud
mkdir -p /home/arnaud/.ssh && nano /home/arnaud/.ssh/authorized_keys   # collez votre clé publique
chown -R arnaud:arnaud /home/arnaud/.ssh && chmod 700 /home/arnaud/.ssh && chmod 600 /home/arnaud/.ssh/authorized_keys
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/; s/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
systemctl restart ssh
apt update && apt full-upgrade -y && apt install -y ufw fail2ban unattended-upgrades
ufw default deny incoming && ufw allow 22,80,443/tcp && ufw enable
curl -fsSL https://get.docker.com | sh && usermod -aG docker arnaud
docker network create proxy
mkdir -p /srv/traefik/data/letsencrypt /srv/hub && chown -R arnaud:arnaud /srv
```

Ouvrez un **second** terminal et vérifiez `ssh arnaud@IP` avant de fermer la session root.

Créez aussi l'utilisateur de déploiement, sans sudo, utilisé par GitHub Actions :

```bash
adduser --disabled-password --gecos "" deploy && usermod -aG docker deploy
mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh
# sur VOTRE poste : ssh-keygen -t ed25519 -f ~/.ssh/deploy_hub -N ""   puis copiez deploy_hub.pub ci-dessous
nano /home/deploy/.ssh/authorized_keys && chmod 600 /home/deploy/.ssh/authorized_keys && chown -R deploy:deploy /home/deploy/.ssh
chown -R deploy:deploy /srv/hub
```

## 8. DNS OVH (15 min, propagation jusqu'à 1 h)

Espace client OVH → Noms de domaine → kimaarnaud.com → Zone DNS :

| Sous-domaine | Type | Cible |
|---|---|---|
| (vide) | A | IPv4 du VPS |
| (vide) | AAAA | IPv6 du VPS (si présente) |
| `*` | A | IPv4 du VPS |
| `www` | CNAME | `kimaarnaud.com.` |
| (vide) | CAA | `0 issue "letsencrypt.org"` |

Supprimez les enregistrements A/AAAA par défaut qui pointent vers la page de parking OVH.
Vérifiez : `dig +short kimaarnaud.com` et `dig +short test.kimaarnaud.com` → IP du VPS.

Puis créez le jeton API pour le certificat wildcard : https://www.ovh.com/auth/api/createToken
avec les droits `GET /domain/zone/kimaarnaud.com/*`, `POST /domain/zone/kimaarnaud.com/*`,
`PUT /domain/zone/kimaarnaud.com/*`, `DELETE /domain/zone/kimaarnaud.com/*`, validité illimitée.
Notez les trois clés (application key, application secret, consumer key).

## 9. Traefik : le reverse proxy (30 min)

`/srv/traefik/.env` (chmod 600) :

```
OVH_ENDPOINT=ovh-eu
OVH_APPLICATION_KEY=...
OVH_APPLICATION_SECRET=...
OVH_CONSUMER_KEY=...
DASH_USERS=arnaud:$$apr1$$...        # résultat de : htpasswd -nb arnaud 'motdepasse' (doublez chaque $)
```

`/srv/traefik/docker-compose.yml` :

```yaml
services:
  traefik:
    image: traefik:v3.1
    restart: unless-stopped
    ports: ["80:80", "443:443"]
    env_file: .env
    command:
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
      - --providers.docker.network=proxy
      - --entrypoints.web.address=:80
      - --entrypoints.web.http.redirections.entrypoint.to=websecure
      - --entrypoints.web.http.redirections.entrypoint.scheme=https
      - --entrypoints.websecure.address=:443
      - --entrypoints.websecure.http.tls.certresolver=ovh
      - --entrypoints.websecure.http.tls.domains[0].main=kimaarnaud.com
      - --entrypoints.websecure.http.tls.domains[0].sans=*.kimaarnaud.com
      - --certificatesresolvers.ovh.acme.dnschallenge.provider=ovh
      - --certificatesresolvers.ovh.acme.email=contact@kimaarnaud.com
      - --certificatesresolvers.ovh.acme.storage=/letsencrypt/acme.json
      - --api.dashboard=true
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./data/letsencrypt:/letsencrypt
    networks: [proxy]
    labels:
      - traefik.enable=true
      - traefik.http.routers.dash.rule=Host(`traefik.kimaarnaud.com`)
      - traefik.http.routers.dash.entrypoints=websecure
      - traefik.http.routers.dash.service=api@internal
      - traefik.http.routers.dash.middlewares=dash-auth
      - traefik.http.middlewares.dash-auth.basicauth.users=${DASH_USERS}
networks:
  proxy:
    external: true
```

```bash
cd /srv/traefik && docker compose up -d && docker compose logs -f
```

Attendez la ligne indiquant que le certificat a été obtenu (1 à 3 min : Traefik écrit un enregistrement TXT
dans votre zone via l'API, Let's Encrypt le vérifie). Ouvrez https://traefik.kimaarnaud.com : mot de passe demandé, cadenas valide.

Pour tester les erreurs sans épuiser le quota Let's Encrypt (5 échecs/heure), ajoutez temporairement
`- --certificatesresolvers.ovh.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory`, puis retirez-le et supprimez `acme.json`.

## 10. Première mise en ligne du hub (15 min)

Copiez `docker-compose.yml` du dépôt dans `/srv/hub/docker-compose.yml`. L'image est publiée sur GHCR par
le workflow `deploy.yml` ; si le paquet GHCR est privé, connectez le VPS une fois :
`docker login ghcr.io -u kimaarnaud` (jeton GitHub avec `read:packages`). Plus simple : rendez le paquet public
(GitHub → votre profil → Packages → kimaarnaud-hub → Package settings → Change visibility).

```bash
cd /srv/hub && docker compose pull && docker compose up -d
curl -I https://kimaarnaud.com        # HTTP/2 200
curl -I https://www.kimaarnaud.com    # 301 → https://kimaarnaud.com/
```

## 11. Activer le déploiement automatique

GitHub → dépôt → Settings → Secrets and variables → Actions :

| Secret | Valeur |
|---|---|
| `VPS_HOST` | IP du VPS |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | contenu de `~/.ssh/deploy_hub` (la clé **privée**, créée à l'étape 7) |

Réactivez le workflow Deploy si vous l'aviez désactivé. Faites une PR triviale (changer un mot sur l'accueil),
fusionnez : deux minutes plus tard, le site est à jour. Désormais **une fusion sur `main` = une mise en ligne**.

## 12. Ajouter le prochain site sur le même VPS

Le gabarit est toujours le même : un dossier, un compose, deux labels.

```yaml
# /srv/docs/docker-compose.yml  (exemple : documentation MkDocs sur docs.kimaarnaud.com)
services:
  docs:
    image: ghcr.io/kimaarnaud/kimaarnaud-docs:latest
    restart: unless-stopped
    networks: [proxy]
    labels:
      - traefik.enable=true
      - traefik.http.routers.docs.rule=Host(`docs.kimaarnaud.com`)
      - traefik.http.routers.docs.entrypoints=websecure
      - traefik.http.services.docs.loadbalancer.server.port=80
networks:
  proxy:
    external: true
```

Aucune action DNS (wildcard), aucun certificat à demander (wildcard). Ajoutez ensuite : un moniteur dans
Uptime Kuma (`status.kimaarnaud.com`), le dossier dans la sauvegarde, et le lien dans la fiche projet du hub.

## 13. Exploitation courante

```bash
docker ps                                   # tout tourne ?
docker compose -f /srv/hub/docker-compose.yml logs --tail=100
docker compose -f /srv/hub/docker-compose.yml pull && docker compose -f /srv/hub/docker-compose.yml up -d   # déploiement manuel
docker system prune -f                      # ménage hebdomadaire
df -h /                                     # espace disque
```

Sauvegardes : `/srv` contient les compose et `.env` de tous les sites. Sauvegardez-le chaque nuit avec restic vers un
stockage objet (voir le guide « Hub central : conception et déploiement »). Le hub lui-même n'a aucune donnée : il se
reconstruit depuis Git.

## 14. Dépannage

| Symptôme | Cause probable | Vérification |
|---|---|---|
| `npm run build` échoue sur une fiche | front-matter invalide (statut inconnu, URL mal formée) | le message indique le fichier et le champ ; comparez au schéma `content.config.ts` |
| Page 404 sur une nouvelle page | fichier hors `src/pages/` ou URL sans `/` final | `trailingSlash: 'always'` : les URL se terminent par `/` |
| Certificat invalide / page Traefik par défaut | DNS pas propagé ou jeton API OVH sans droits | `dig`, `docker compose logs traefik` |
| Le déploiement GitHub échoue à l'étape SSH | clé ou hôte incorrect, utilisateur `deploy` pas dans le groupe `docker` | `ssh -i ~/.ssh/deploy_hub deploy@IP docker ps` depuis votre poste |
| `docker compose pull` : `denied` | paquet GHCR privé | rendre le paquet public ou `docker login ghcr.io` |
| Le site affiche l'ancienne version | cache navigateur | Ctrl+F5 ; les ressources `_astro/` sont hachées, seul le HTML est à revalider |
