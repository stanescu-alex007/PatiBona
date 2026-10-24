// Writes sitemap.xml from the routes Angular actually prerendered, so the file
// can never fall out of step with the site. Runs right after `ng build`.

import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT_DIR = join(ROOT, 'dist', 'PatiBona', 'browser');
const ROUTES_FILE = join(ROOT, 'dist', 'PatiBona', 'prerendered-routes.json');

/** Read the origin back from the page itself, so it lives in one place. */
async function readOrigin() {
  const html = await readFile(join(OUTPUT_DIR, 'index.html'), 'utf8');
  const match = html.match(/<meta property="og:url" content="([^"]+)"/);
  if (!match) {
    throw new Error('og:url is missing from index.html; cannot build a sitemap.');
  }
  return match[1].replace(/\/$/, '');
}

async function run() {
  const origin = await readOrigin();
  const { routes } = JSON.parse(await readFile(ROUTES_FILE, 'utf8'));
  const today = new Date().toISOString().slice(0, 10);

  const urls = Object.keys(routes)
    .sort()
    .map((route) => {
      const path = route === '/' ? '/' : `${route.replace(/\/$/, '')}/`;
      return `  <url>\n    <loc>${origin}${path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(join(OUTPUT_DIR, 'sitemap.xml'), xml);
  console.log(`sitemap.xml · ${Object.keys(routes).length} pages · ${origin}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
