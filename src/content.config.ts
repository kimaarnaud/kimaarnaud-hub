import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const DOMAINS = {
  logiciel: {
    label: 'Développement logiciel',
    short: 'Logiciel',
    desc: 'Applications web, mobile et systèmes : du SaaS à la fintech, du code au déploiement.',
    platform: null,
    color: 'dom-logiciel',
  },
  reseaux: {
    label: 'Réseaux, systèmes et sécurité',
    short: 'Réseaux & sécurité',
    desc: 'Du home-lab au SOC : topologies, durcissement, détection, réponse à incident.',
    platform: 'https://labhub.kimaarnaud.com',
    color: 'dom-reseaux',
  },
  telecoms: {
    label: 'Télécommunications',
    short: 'Télécoms',
    desc: 'Signal, transport IP, VoIP, FTTH, 4G/5G, LPWAN : mesures et protocoles.',
    platform: 'https://telco.kimaarnaud.com',
    color: 'dom-telecoms',
  },
  ia: {
    label: 'Intelligence artificielle',
    short: 'IA',
    desc: 'Du ML écrit à la main au produit IA gouverné : expériences, évaluation, MLOps.',
    platform: 'https://ai.kimaarnaud.com',
    color: 'dom-ia',
  },
} as const;

export type Domain = keyof typeof DOMAINS;

const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      domain: z.enum(['logiciel', 'reseaux', 'telecoms', 'ia']),
      number: z.number().int().min(0).max(20),
      level: z.enum(['fondations', 'avance', 'expert']),
      status: z.enum(['planifie', 'en-cours', 'termine']).default('planifie'),
      summary: z.string().max(300),
      stack: z.array(z.string()).default([]),
      skills: z.array(z.string()).default([]),
      duration: z.string().optional(),
      links: z
        .object({
          demo: z.url().optional(),
          platform: z.url().optional(),
          repo: z.url().optional(),
          report: z.string().optional(),
          video: z.url().optional(),
        })
        .default({}),
      cover: image().optional(),
      updated: z.coerce.date().optional(),
    }),
});

export const collections = { projets };
