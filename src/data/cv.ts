// Données du CV — à compléter avec ton vrai parcours.
// Chaque entrée s'affiche telle quelle sur /cv/ ; supprime les exemples qui ne te concernent pas.

export interface CvEntry {
  period: string;
  title: string;
  org: string;
  note?: string;
}

export const accroche =
  "Ingénieur en formation continue : 80 projets documentés, de la théorie à la mise en production, dans le logiciel, les réseaux et la sécurité, les télécoms et l'IA.";

export const parcours: CvEntry[] = [
  {
    period: 'en cours',
    title: 'Programme autonome de 80 projets techniques',
    org: 'kimaarnaud.com',
    note: "Conception, réalisation et documentation de projets de bout en bout ; administration du VPS, CI/CD, reverse proxy et TLS en production.",
  },
  // Exemple à adapter :
  // { period: '2022 — 2024', title: 'Technicien réseau', org: 'Entreprise', note: 'Mission, résultat mesurable.' },
];

export const formation: CvEntry[] = [
  {
    period: 'en cours',
    title: 'Formation continue en ingénierie',
    org: 'auto-formation structurée (catalogues de projets)',
    note: 'Apprentissage par la pratique : chaque notion est validée par un projet documenté.',
  },
  // Exemple à adapter :
  // { period: '2019 — 2022', title: 'Licence Réseaux & Télécoms', org: 'Université / école' },
];

// — Versions anglaises pour /en/cv/ —
export const accrocheEn =
  'Engineer in continuous training: 80 documented projects, from theory to production, across software, networks & security, telecoms and AI.';

export const parcoursEn: CvEntry[] = [
  {
    period: 'ongoing',
    title: 'Self-directed program of 80 technical projects',
    org: 'kimaarnaud.com',
    note: 'End-to-end design, build and documentation of projects; VPS administration, CI/CD, reverse proxy and TLS in production.',
  },
];

export const formationEn: CvEntry[] = [
  {
    period: 'ongoing',
    title: 'Continuous engineering training',
    org: 'structured self-training (project catalogs)',
    note: 'Learning by doing: every concept is validated by a documented project.',
  },
];
