import { GalleryItem } from './gallery-item';

/** Every image collection the home story is built from. */
export interface Catalog {
  readonly cozonac: readonly GalleryItem[];
  readonly torturi: readonly GalleryItem[];
  /** The rest of the cakes, for the strip under the display. */
  readonly torturiGallery: readonly GalleryItem[];
  readonly candyBarShowcase: readonly GalleryItem[];
  readonly candyBarDetails: readonly GalleryItem[];
  readonly vitrina: readonly GalleryItem[];
}
