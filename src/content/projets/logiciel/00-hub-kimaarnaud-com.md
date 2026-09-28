---
title: "Hub central kimaarnaud.com"
domain: logiciel
number: 0
level: fondations
status: en-cours
summary: "Le site que vous lisez : portail statique Astro qui présente les 80 projets et renvoie vers les plateformes hébergées sur le VPS OVH."
stack: [Astro, TypeScript, Tailwind CSS, nginx, Docker, Traefik, GitHub Actions]
skills: [Site statique et SEO, Conteneurisation, CI/CD, Reverse proxy et TLS, Administration VPS]
duration: "3 semaines"
updated: 2026-09-28
links:
  repo: https://github.com/kimaarnaud/kimaarnaud-hub
  demo: https://kimaarnaud.com
---

## Objectif

Disposer d'un point d'entrée unique, rapide et sans base de données, qui présente les quatre domaines,
liste les 80 projets avec leur statut et renvoie vers les plateformes LabHub, TelcoLab Hub et AI Lab Hub
ainsi que vers les applications dédiées (`app-*.kimaarnaud.com`).

## Architecture

- **Astro** génère des pages HTML statiques à partir de fichiers Markdown (`src/content/projets`) validés par un schéma Zod.
- **nginx** (image Alpine, ~10 Mo) sert le dossier `dist/` dans un conteneur Docker.
- **Traefik** route `kimaarnaud.com` vers ce conteneur et fournit le certificat HTTPS wildcard.
- **GitHub Actions** construit l'image à chaque fusion sur `main` et la déploie sur le VPS par SSH.

## Ce qui a été réalisé

- Squelette Astro + Tailwind, layout, pages accueil / projets (filtres) / fiche / catalogues / compétences.
- 80 fiches projets générées depuis les catalogues, au statut « planifié ».
- Dockerfile multi-étapes, configuration nginx, workflow de déploiement.

## Preuves

Voir les liens dans la colonne de droite : dépôt et site en production.
