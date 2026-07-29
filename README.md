# maxima-cis-keepalive

Scheduled GitHub Actions workflow that keeps Maxima Ventures Streamlit apps awake 24×7
using a real headless Chromium browser (Playwright), and pings production Supabase
directly to prevent its free-tier auto-pause. Runs every 10 minutes.

**Apps monitored:**
- https://maxima-cis-live.streamlit.app
- https://maxima-nse-acopening.streamlit.app

To add more apps, append their URLs (comma-separated) to the `URLS` env in
`.github/workflows/keep-alive.yml`.

## Required secrets

| Secret | Purpose |
|---|---|
| `SUPABASE_PROD_SERVICE_KEY` | Production Supabase `service_role` (or `sb_secret_...`) key. Used by the "Ping Supabase" step to hit `/rest/v1/partners` directly — app-level pings alone don't touch the DB, since Maxima CIS's login gate blocks all Supabase calls until credentials are submitted. Without real API traffic, the Supabase project auto-pauses after 7 days of inactivity even while the app itself stays awake. |

Set via:
```bash
gh secret set SUPABASE_PROD_SERVICE_KEY --repo sunny2303/maxima-cis-keepalive
```

**If the production Supabase service key is ever rotated, this secret must be updated
too** — otherwise the ping starts failing silently and the project can pause again.
