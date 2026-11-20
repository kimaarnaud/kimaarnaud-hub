// État des plateformes lu au build depuis l'API publique d'Uptime Kuma.
// Config : STATUS_PAGE_URL (ex. https://status.kimaarnaud.com) et STATUS_PAGE_SLUG
// (slug de la page de statut publique, « default » par défaut).
// Sans config ou en cas d'erreur réseau : tout passe à « unknown » et le site
// s'affiche normalement — le build ne casse jamais.

export type PlatformStatus = 'up' | 'down' | 'maintenance' | 'pending' | 'unknown';

// Uptime Kuma : 0 = down, 1 = up, 2 = pending, 3 = maintenance
const HEARTBEAT_STATUS: Record<number, PlatformStatus> = {
  0: 'down',
  1: 'up',
  2: 'pending',
  3: 'maintenance',
};

interface KumaMonitor {
  id: number;
  name: string;
}

interface StatusPage {
  config?: { publicGroupList?: { monitorList?: KumaMonitor[] }[] };
}

interface HeartbeatPage {
  heartbeatList?: Record<string, { status: number }[]>;
  uptimeList?: Record<string, number>;
}

const BASE = import.meta.env.STATUS_PAGE_URL?.replace(/\/+$/, '');
const SLUG = import.meta.env.STATUS_PAGE_SLUG || 'default';
export const STATUS_PAGE_URL = BASE || null;

export interface PlatformStatuses {
  configured: boolean;
  status: Record<string, PlatformStatus>;
  /** Disponibilité glissante sur 24 h (ratio 0–1) par id de plateforme. */
  uptime24h: Record<string, number>;
}

/**
 * `hints` associe chaque plateforme à une sous-chaîne attendue dans le nom du
 * moniteur Uptime Kuma (ex. { labhub: 'labhub' }). Retourne un état par clé.
 */
export async function fetchPlatformStatuses(
  hints: Record<string, string>,
): Promise<PlatformStatuses> {
  const status: Record<string, PlatformStatus> = {};
  const uptime24h: Record<string, number> = {};
  for (const id of Object.keys(hints)) status[id] = 'unknown';
  if (!BASE) return { configured: false, status, uptime24h };

  try {
    const headers = { accept: 'application/json' };
    const [pageRes, hbRes] = await Promise.all([
      fetch(`${BASE}/api/status-page/${SLUG}`, {
        headers,
        signal: AbortSignal.timeout(8000),
      }),
      fetch(`${BASE}/api/status-page/heartbeat/${SLUG}`, {
        headers,
        signal: AbortSignal.timeout(8000),
      }),
    ]);
    if (!pageRes.ok || !hbRes.ok) return { configured: true, status, uptime24h };

    const page = (await pageRes.json()) as StatusPage;
    const hb = (await hbRes.json()) as HeartbeatPage;
    const monitors =
      page.config?.publicGroupList?.flatMap((g) => g.monitorList ?? []) ?? [];

    for (const [id, hint] of Object.entries(hints)) {
      const monitor = monitors.find((m) =>
        m.name.toLowerCase().includes(hint.toLowerCase()),
      );
      if (!monitor) continue;
      const beats = hb.heartbeatList?.[String(monitor.id)] ?? [];
      const last = beats[beats.length - 1];
      if (last) status[id] = HEARTBEAT_STATUS[last.status] ?? 'unknown';
      const up = hb.uptimeList?.[`${monitor.id}_24`];
      if (typeof up === 'number') uptime24h[id] = up;
    }
  } catch {
    // Uptime Kuma injoignable au build → états « unknown »
  }
  return { configured: true, status, uptime24h };
}
