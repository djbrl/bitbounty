// Maintenance mode: while the API moves from the Docker setup on Jib's Mac to Fly.io, the landing (`/`) stays
// up and every other page (sign-in, app, explore...) shows /maintenance with the waitlist form instead of
// failing on a dead API. Switched on by MAINTENANCE_MODE=1
// in the Vercel env, then a redeploy; switched off by removing it.

export const MAINTENANCE_PATH = "/maintenance";

/** When the app is expected back, shown on the page ("De retour fin novembre."). */
export const BACK_ON = { fr: "fin novembre", en: "at the end of November" } as const;

/** Where "contact us" points. Empty hides the contact line. */
export const CONTACT_EMAIL = "sydjbrl@gmail.com";

export const FLY_URL = "https://fly.io";

export function maintenanceOn(env: Record<string, string | undefined> = process.env): boolean {
  const v = env.MAINTENANCE_MODE?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "on";
}

/**
 * Pages that keep working during maintenance: the landing and the maintenance page itself. Static files, `/_next/*` and
 * `/api/*` (where the waitlist endpoint lives) never reach the middleware (see `config.matcher`).
 */
export function servedDuringMaintenance(pathname: string): boolean {
  return pathname === "/" || pathname === MAINTENANCE_PATH;
}
