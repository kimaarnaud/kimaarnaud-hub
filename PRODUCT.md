# Product

## Register

brand

## Users

Recruteurs, responsables techniques et collaborateurs potentiels qui visitent kimaarnaud.com.
Ils arrivent avec peu de temps : ils veulent évaluer en quelques minutes si les compétences
annoncées sont réelles, puis creuser un projet précis si le signal est bon.

## Product Purpose

Point d'entrée unique d'un écosystème de 80 projets documentés dans quatre domaines
(développement logiciel, réseaux/systèmes/sécurité, télécoms, IA). Le hub agrège les fiches,
renvoie vers les plateformes spécialisées (LabHub, TelcoLab Hub, AI Lab Hub) et prouve le
travail : chaque projet a un statut, une stack, des compétences et des liens de preuve.
Succès = un recruteur comprend l'étendue en 30 secondes et trouve une preuve en 2 clics.

## Brand Personality

Rigoureux, factuel, discret. Trois mots : méthodique, vérifiable, calme.
Ton : la démonstration plutôt que la promesse (« cette matrice ne peut pas mentir »).
Aucune grandiloquence marketing ; la structure et les données portent le discours.

## Anti-references

- Pas de landing SaaS générique (hero centré + 3 cartes icônes + gradient violet/bleu).
- Pas de portfolio « dribbble » qui privilégie l'effet visuel sur la substance.
- Pas de statistiques inventées ou de barres de compétence auto-attribuées.
- Pas de jargon startup (« seamless », « next-gen », « elevate »).
- Pas d'emoji : symboles typographiques ou SVG uniquement.

## Design Principles

1. **L'index comme identité** : le site se lit comme un document technique — numérotation,
   lignes d'index, données tabulaires. La forme épouse la fonction du site (un catalogue).
2. **Preuves, pas promesses** : chaque affirmation visuelle (compteurs, badges, compétences)
   est générée depuis les fiches projets. Rien n'est décoratif au sens mensonger.
3. **La couleur code, elle ne décore pas** : les 4 couleurs de domaine sont un système
   d'information (un domaine = une couleur, partout pareil), pas un habillage.
4. **Vitesse perçue** : site statique, zéro JS par défaut, animations uniquement en
   transform/opacity, < 300 ms, jamais d'animation sur les actions répétées.
5. **Lisibilité d'abord** : corps de texte ≤ 75ch, contraste AA minimum, navigation clavier
   complète, `prefers-reduced-motion` respecté.

## Accessibility & Inclusion

- Cible WCAG 2.1 AA : contrastes vérifiés sur les deux thèmes.
- `prefers-reduced-motion` : toutes les animations d'entrée désactivées.
- Navigation clavier : focus-visible visible partout, aria-current dans la nav.
- Thème clair par défaut + sombre via `prefers-color-scheme` et toggle persistant.
