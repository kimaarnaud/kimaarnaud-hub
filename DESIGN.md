# Design

Système visuel de kimaarnaud.com. Registre : brand tech-minimal premium.
Inspiration de forme : un index technique / un document d'ingénierie, pas une landing SaaS.

## Thème

Deux thèmes, clair par défaut (le recruteur lit en journée) + `.dark` sur `<html>`
(toggle persistant `localStorage['theme']`, fallback `prefers-color-scheme`).
Les tokens sont des custom properties remappées via `@theme inline` dans `global.css`.

## Couleur (OKLCH)

Stratégie : **Restrained fonctionnel** — neutres chauds teintés + un accent « signal » +
4 couleurs de domaine purement informationnelles.

| Token | Clair | Sombre | Usage |
|---|---|---|---|
| `bg` | oklch(0.98 0.004 90) papier | oklch(0.185 0.008 90) | fond page |
| `surface` | oklch(0.995 0.003 90) | oklch(0.225 0.01 90) | cartes, champs |
| `surface-2` | oklch(0.95 0.007 90) | oklch(0.28 0.012 90) | chips, tags, hover |
| `line` | oklch(0.9 0.008 90) | oklch(0.33 0.012 90) | hairlines, bordures |
| `ink` | oklch(0.23 0.02 80) | oklch(0.93 0.008 90) | texte principal |
| `ink-2` | oklch(0.45 0.02 80) | oklch(0.7 0.015 90) | texte secondaire |
| `ink-3` | oklch(0.6 0.015 80) | oklch(0.55 0.015 90) | métadonnées |
| `accent` | oklch(0.56 0.19 43) vermillon | oklch(0.7 0.17 45) | liens forts, CTA, focus |
| `dom-logiciel` | oklch(0.58 0.15 250) | oklch(0.7 0.14 250) | bleu |
| `dom-reseaux` | oklch(0.58 0.14 165) | oklch(0.7 0.13 165) | vert |
| `dom-telecoms` | oklch(0.62 0.14 85) | oklch(0.75 0.13 85) | ambre |
| `dom-ia` | oklch(0.56 0.17 300) | oklch(0.7 0.15 300) | violet |

Règles : jamais `#000`/`#fff` purs ; les couleurs de domaine ne servent qu'à coder
l'information (marqueur, texte, barre de progression), jamais en fond plein décoratif.

## Typographie

- **Geist Variable** : texte et titres. Titres `tracking-tight`, corps `max-w-[65ch]`.
- **Geist Mono Variable** : métadonnées, numéros de projet, eyebrows, chiffres
  (`tabular-nums`), labels de formulaire.
- Échelle : hero `text-4xl→6xl`, h2 `text-xl`, corps `text-base/sm`, meta `text-xs` mono.
- Eyebrows : `font-mono text-xs uppercase tracking-[0.2em]` — usage unique par section max.

## Forme & matière

- Hairlines 1px `line` comme matériau principal (lignes d'index). Bordures `rounded-lg/xl`.
- Pas d'ombre portée forte ; si élévation nécessaire : ombre très diffuse teintée.
- Marqueur de domaine : carré 6–8px plein `dom-*` (l'« index dot »), pas de bande latérale.
- Badges de statut : fond `color/10` + texte teinté + symbole typographique (○ ◐ ●).

## Motion

- Uniquement `transform` + `opacity`. Easing `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo).
- Entrées : `translateY(14px) opacity 0 → 0` en ≤ 600 ms, stagger `--i * 60ms`,
  via `.reveal` + IntersectionObserver. `prefers-reduced-motion` : tout visible.
- Pressables : `active:scale-[0.98]`. Hovers : changement de bordure/teinte en ≤ 200 ms.
- Aucune animation sur les filtres/actions répétées.

## Composants

- **Header** : sticky, `bg-bg/80 backdrop-blur`, hairline basse, logo wordmark mono,
  nav texte + `aria-current`, ThemeToggle.
- **Index de domaines** : lignes pleine largeur (numéro mono · label · progression · flèche),
  séparées par des hairlines — la signature du site.
- **ProjectCard** : hairline, meta mono (domaine · NN + badge), titre, résumé clamp-3,
  chips stack ; hover = bordure `dom-*` + titre souligné.
- **Champs de filtre** : `bg-surface border-line rounded-md`, focus ring `accent`.
