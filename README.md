# maxima-cis-keepalive

Scheduled GitHub Actions workflow that keeps Maxima Ventures Streamlit apps awake 24×7
using a real headless Chromium browser (Playwright). Runs every 10 minutes.

**Apps monitored:**
- https://maxima-cis-live.streamlit.app
- https://maxima-nse-acopening.streamlit.app

To add more apps, append their URLs (comma-separated) to the `URLS` env in
`.github/workflows/keep-alive.yml`.
