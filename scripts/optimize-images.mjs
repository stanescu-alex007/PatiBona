// Generates the web-ready images in public/ from the originals in image-sources/.
// Originals are never modified; re-run with `npm run images` after adding photos.
//
// Every output is WebP, resized to the largest size the layout can actually show
// (plus headroom for high-density screens). Sizes are per folder because a photo
// in the mosaic is displayed far smaller than one in the full-height showcase.

import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = join(ROOT, 'image-sources');
const OUTPUT_DIR = join(ROOT, 'public');

/**
 * maxWidth is in CSS pixels at ~2x density; maxHeight caps portrait shots, which
 * would otherwise stay huge because only their width was constrained.
 */
const PROFILES = {
  // Collage, shown up to ~700 CSS px wide.
  'images/cozonaci': { maxWidth: 1200, quality: 70 },
  // Showcase cards, shown up to ~660 CSS px wide.
  'images/candy-bar/prezentari': { maxWidth: 1400, quality: 68 },
  // Mosaic cells, shown between ~300 and ~660 CSS px wide.
  'images/candy-bar': { maxWidth: 900, quality: 64 },
  'images/shop': { maxWidth: 900, quality: 64 },
  'images/birthday-cake': { maxWidth: 900, quality: 80, alpha: true },
  'app-logo.png': { maxWidth: 192, quality: 85, alpha: true },
  'app-favicon.png': { maxWidth: 420, quality: 85, alpha: true },
};

const DEFAULT_PROFILE = { maxWidth: 1200, quality: 72 };

/**
 * The polaroids scattered around the hero title. Portrait crops cut from the
 * gallery originals; each one is shown at most ~260 CSS px wide.
 */
const HERO_PHOTOS = {
  outputDir: 'images/hero',
  width: 560,
  height: 700,
  quality: 72,
  sources: [
    'images/candy-bar/candy-bar-11.jpeg',
    'images/cozonaci/cozonac-3.jpeg',
    'images/shop/magazin-7.jpeg',
    'images/candy-bar/candy-bar-20.jpeg',
    'images/candy-bar/candy-bar-22.jpeg',
    'images/candy-bar/candy-bar-3.jpeg',
  ],
};

/** The picture social networks show when someone shares a link to the site. */
const SHARE_CARD = {
  source: 'images/cozonaci/cozonac-5.jpeg',
  output: 'og-image.jpg',
  width: 1200,
  height: 630,
};

function profileFor(relativePath) {
  const key = relativePath.split('\\').join('/');
  const match = Object.keys(PROFILES)
    .filter((prefix) => key === prefix || key.startsWith(`${prefix}/`))
    .sort((a, b) => b.length - a.length)[0];
  return match ? PROFILES[match] : DEFAULT_PROFILE;
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(path);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      yield path;
    }
  }
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)} kB`;
}

async function run() {
  let sourceBytes = 0;
  let outputBytes = 0;
  let count = 0;

  for await (const sourcePath of walk(SOURCE_DIR)) {
    const rel = relative(SOURCE_DIR, sourcePath);
    const { maxWidth, quality, alpha } = profileFor(rel);
    const outputPath = join(OUTPUT_DIR, rel.slice(0, -extname(rel).length) + '.webp');

    await mkdir(dirname(outputPath), { recursive: true });

    const buffer = await sharp(sourcePath)
      .rotate()
      .resize({
        width: maxWidth,
        height: Math.round(maxWidth * 1.35),
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality, alphaQuality: alpha ? 90 : 100, effort: 5 })
      .toBuffer();

    await writeFile(outputPath, buffer);

    const { size } = await stat(sourcePath);
    sourceBytes += size;
    outputBytes += buffer.length;
    count += 1;
    console.log(`${rel.padEnd(52)} ${kb(size).padStart(9)} → ${kb(buffer.length).padStart(9)}`);
  }

  await buildHeroPhotos();
  await buildShareCard();

  const saved = sourceBytes - outputBytes;
  console.log(
    `\n${count} images · ${kb(sourceBytes)} → ${kb(outputBytes)} ` +
      `(saved ${kb(saved)}, ${Math.round((saved / sourceBytes) * 100)}%)`,
  );
}

async function buildHeroPhotos() {
  const dir = join(OUTPUT_DIR, HERO_PHOTOS.outputDir);
  await mkdir(dir, { recursive: true });
  let total = 0;
  for (const [i, source] of HERO_PHOTOS.sources.entries()) {
    const output = join(dir, `hero-${i + 1}.webp`);
    await sharp(join(SOURCE_DIR, source))
      .rotate()
      .resize({ width: HERO_PHOTOS.width, height: HERO_PHOTOS.height, fit: 'cover', position: 'attention' })
      .webp({ quality: HERO_PHOTOS.quality, effort: 6 })
      .toFile(output);
    total += (await stat(output)).size;
  }
  console.log(`
hero → ${HERO_PHOTOS.sources.length} photos in ${HERO_PHOTOS.outputDir} (${kb(total)})`);
}

/** JPEG on purpose: a few link scrapers still choke on WebP. */
async function buildShareCard() {
  const output = join(OUTPUT_DIR, SHARE_CARD.output);
  await sharp(join(SOURCE_DIR, SHARE_CARD.source))
    .rotate()
    .resize({ width: SHARE_CARD.width, height: SHARE_CARD.height, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, progressive: true })
    .toFile(output);
  console.log(`
share card → ${SHARE_CARD.output} (${SHARE_CARD.width}x${SHARE_CARD.height})`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
