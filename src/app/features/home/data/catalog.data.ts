import { Catalog } from '../models/catalog';
import { GalleryItem } from '../models/gallery-item';

const IMAGES_ROOT = '/images';

function series(folder: string, prefix: string, ext: string, count: number, alt: string): GalleryItem[] {
  return Array.from({ length: count }, (_, i) => ({
    src: `${IMAGES_ROOT}/${folder}/${prefix}${i + 1}${ext}`,
    alt: `${alt} ${i + 1}`,
  }));
}

function pick(items: readonly GalleryItem[], indexes: readonly number[]): GalleryItem[] {
  return indexes.map((n) => items[n - 1]).filter((item): item is GalleryItem => item !== undefined);
}

const cozonacAll = series('cozonaci', 'cozonac-', '.webp', 6, 'Cozonac de casă, proaspăt scos din cuptor');
const candyBarAll = series('candy-bar', 'candy-bar-', '.webp', 34, 'Dulciuri artizanale pentru candy bar');
const torturiAll = series(
  'birthday-cake',
  'birthday-cake-',
  '-removebg-preview.webp',
  13,
  'Tort personalizat pentru aniversare',
);

/** Static catalog. Swap the repository implementation to load this from an API later. */
export const CATALOG: Catalog = {
  cozonac: pick(cozonacAll, [5, 1, 2]),
  // Three cakes carry the section: a christening cake with a name on it, an
  // elegant tiered one and a fruit one, so the range is obvious at a glance.
  torturi: pick(torturiAll, [1, 4, 2]),
  torturiGallery: pick(torturiAll, [6, 3, 11, 9, 13, 5, 12, 10, 7, 8]),
  candyBarShowcase: series(
    'candy-bar/prezentari',
    'prezentare-',
    '.webp',
    7,
    'Masă de candy bar aranjată pentru eveniment',
  ),
  // Photos 15 and 25 are near-duplicates and are left out on purpose.
  candyBarDetails: pick(candyBarAll, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 1]),
  vitrina: series('shop', 'magazin-', '.webp', 19, 'Prăjitură din vitrina Pati Bona'),
};
