---
title: "Construire le hub : Astro, content collections et déploiement Docker"
date: 2026-11-19
summary: "Retour d'expérience sur le premier projet du programme : pourquoi un site statique, comment les fiches sont validées au build, et ce que le pipeline CI/CD apporte concrètement."
tags: [astro, docker, ci-cd, retex]
projets: [logiciel/00-hub-kimaarnaud-com]
---

## Pourquoi un site statique

Le hub est le point d'entrée de tout le portfolio. Il devait être rapide, increvable et gratuit à
héberger. Un site statique répond aux trois : pas de base de données, pas de serveur applicatif,
un nginx qui sert des fichiers dans un conteneur de ~10 Mo. Astro s'est imposé parce qu'il
n'envoie aucun JavaScript au navigateur par défaut — le seul script du site est le filtre de la
page Projets, que j'ai écrit à la main.

## Les content collections comme contrat

Les 81 fiches projets sont des fichiers Markdown validés par un schéma Zod au build. Une fiche
mal remplie — statut inconnu, URL mal formée, résumé trop long — fait échouer `npm run build`,
jamais le site en ligne. C'est le même principe qu'un schéma de base de données, sauf que la
« base » est un dossier de fichiers versionnés dans Git.

Deux bénéfices inattendus : la page Compétences est **générée** depuis les fiches (elle ne peut
pas mentir), et TypeScript connaît la forme de chaque fiche dans les templates.

## Ce que le pipeline apporte

Chaque pull request déclenche `astro check` + `astro build` en CI. Chaque fusion sur `main`
construit une image Docker multi-étapes, la publie sur GHCR, puis exécute `docker compose pull &&
up -d` sur le VPS par SSH. En pratique : une fiche corrigée est en ligne deux minutes après le
merge, sans que je touche au serveur.

## Ce que je referais différemment

- Commencer par les tokens de thème (couleurs, typo, dark mode) plutôt que de les ajouter après :
  la retouche sur les 15 fichiers a pris plus de temps que le design lui-même.
- Versionner les images de couverture à côté des fiches dès le premier jour — le schéma `cover`
  existait, mais aucune fiche ne l'utilisait.

## Prochaines étapes

Ajouter les captures d'écran des projets terminés comme `cover`, générer les images Open Graph
au build, et publier un flux RSS pour ce journal.
