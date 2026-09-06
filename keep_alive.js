const { chromium } = require('playwright');

const urls = (process.env.URLS || 'https://maxima-cis-live.streamlit.app')
  .split(',').map(s => s.trim()).filter(Boolean);

(async () => {
  const browser = await chromium.launch();
  for (const url of urls) {
    const page = await browser.newPage();
    try {
      console.log(`Loading ${url}`);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      try {
        const wake = page.getByRole('button', { name: /get this app back up/i });
        if (await wake.isVisible({ timeout: 5000 })) {
          console.log('  asleep — clicking wake');
          await wake.click();
          await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
        }
      } catch (e) {
        if (e.name === 'TimeoutError') console.log('  already awake');
        else throw e;
      }
      await page.waitForTimeout(15000);
      console.log('  session registered');
    } catch (e) {
      console.error(`  failed: ${e.message}`);
      process.exitCode = 1;
    } finally {
      await page.close();
    }
  }
  await browser.close();
})();
