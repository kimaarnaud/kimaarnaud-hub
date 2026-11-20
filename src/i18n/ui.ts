export const languages = { fr: 'FR', en: 'EN' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

export const ui = {
  fr: {
    'nav.projets': 'Projets',
    'nav.catalogues': 'Catalogues',
    'nav.competences': 'Compétences',
    'nav.cv': 'CV',
    'nav.journal': 'Journal',
    'nav.contact': 'Contact',
    'footer.note': 'site statique, sans tracking',
    'footer.status': 'Statut',
    'footer.legal': 'Mentions légales',
    'badge.planifie': 'Planifié',
    'badge.en-cours': 'En cours',
    'badge.termine': 'Terminé',
  },
  en: {
    'nav.projets': 'Projects',
    'nav.catalogues': 'Catalogs',
    'nav.competences': 'Skills',
    'nav.cv': 'Resume',
    'nav.journal': 'Journal',
    'nav.contact': 'Contact',
    'footer.note': 'static site, no tracking',
    'footer.status': 'Status',
    'footer.legal': 'Legal notice',
    'badge.planifie': 'Planned',
    'badge.en-cours': 'In progress',
    'badge.termine': 'Completed',
  },
} as const;

export type UiKey = keyof (typeof ui)['fr'];

export function getLangFromUrl(url: URL): Lang {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'fr';
}

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** Préfixe un chemin interne de la langue : '/x/' → '/fr/x/' ou '/en/x/'. */
export function localizeHref(href: string, lang: Lang): string {
  if (!href.startsWith('/')) return href;
  return `/${lang}${href}`;
}

/** Chemin équivalent dans l'autre langue (switcher FR/EN, hreflang). */
export function equivalentPath(pathname: string, lang: Lang): string {
  const bare = pathname.replace(/^\/(fr|en)(?=\/|$)/, '') || '/';
  const other: Lang = lang === 'fr' ? 'en' : 'fr';
  return `/${other}${bare}`;
}
