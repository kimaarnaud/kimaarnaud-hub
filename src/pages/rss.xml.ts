import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('retex');
  return rss({
    title: 'kimaarnaud.com — Journal',
    description:
      "Retours d'expérience sur les projets du portfolio : ce qui a marché, ce qui a échoué, ce qui a été appris.",
    site: context.site ?? 'https://kimaarnaud.com',
    items: articles
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((a) => ({
        title: a.data.title,
        description: a.data.summary,
        pubDate: a.data.date,
        link: `/blog/${a.id}/`,
      })),
  });
}
