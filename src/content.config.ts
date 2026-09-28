import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const DOMAINS = {
  logiciel: { label: 'Développement logiciel', short: 'Logiciel', platform: null },
  reseaux: {
    label: 'Réseaux, systèmes et sécurité',
    short: 'Réseaux & sécurité',
    platform: 'https://labhub.kimaarnaud.com',
  },
  telecoms: { label: 'Télécommunications', short: 'Télécoms', platform: 'https://telco.kimaarnaud.com' },
  ia: { label: 'Intelligence artificielle', short: 'IA', platform: 'https://ai.kimaarnaud.com' },
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
          demo: z.string().url().optional(),
          platform: z.string().url().optional(),
          repo: z.string().url().optional(),
          report: z.string().optional(),
          video: z.string().url().optional(),
        })
        .default({}),
      cover: image().optional(),
      updated: z.coerce.date().optional(),
    }),
});

export const collections = { projets };
