import type { Domain } from '../content.config';

export interface Platform {
  id: string;
  name: string;
  url: string;
  dom: Exclude<Domain, 'logiciel'>;
  // Chaîne attendue dans le nom du moniteur Uptime Kuma (insensible à la casse)
  monitorHint: string;
  tag: Record<'fr' | 'en', string>;
  desc: Record<'fr' | 'en', string>;
}

export const PLATFORMS: Platform[] = [
  {
    id: 'labhub',
    name: 'LabHub',
    url: 'https://labhub.kimaarnaud.com',
    dom: 'reseaux',
    monitorHint: 'labhub',
    tag: { fr: 'réseaux · sécu', en: 'net · sec' },
    desc: {
      fr: "Topologies, configurations, rapports d'audit, tableaux de bord.",
      en: 'Topologies, configurations, audit reports, dashboards.',
    },
  },
  {
    id: 'telco',
    name: 'TelcoLab Hub',
    url: 'https://telco.kimaarnaud.com',
    dom: 'telecoms',
    monitorHint: 'telco',
    tag: { fr: 'télécoms', en: 'telecom' },
    desc: {
      fr: 'Mesures radio, captures de protocoles, cartes de couverture, carnets rejouables.',
      en: 'Radio measurements, protocol captures, coverage maps, replayable notebooks.',
    },
  },
  {
    id: 'ai',
    name: 'AI Lab Hub',
    url: 'https://ai.kimaarnaud.com',
    dom: 'ia',
    monitorHint: 'ai lab',
    tag: { fr: 'ia', en: 'ai' },
    desc: {
      fr: 'Expériences MLflow, fiches de modèles, démos, métriques de production.',
      en: 'MLflow experiments, model cards, demos, production metrics.',
    },
  },
];
