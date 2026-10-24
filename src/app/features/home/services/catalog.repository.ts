import { InjectionToken } from '@angular/core';
import { Catalog } from '../models/catalog';
import { GalleryItem } from '../models/gallery-item';

/**
 * Read-side contract for product imagery. Sections depend on this
 * abstraction, not on where the data lives (static file today, CMS tomorrow).
 */
export interface CatalogRepository {
  cozonac(): readonly GalleryItem[];
  torturi(): readonly GalleryItem[];
  torturiGallery(): readonly GalleryItem[];
  candyBarShowcase(): readonly GalleryItem[];
  candyBarDetails(): readonly GalleryItem[];
  vitrina(): readonly GalleryItem[];
}

export class StaticCatalogRepository implements CatalogRepository {
  constructor(private readonly catalog: Catalog) {}

  cozonac(): readonly GalleryItem[] {
    return this.catalog.cozonac;
  }

  torturi(): readonly GalleryItem[] {
    return this.catalog.torturi;
  }

  torturiGallery(): readonly GalleryItem[] {
    return this.catalog.torturiGallery;
  }

  candyBarShowcase(): readonly GalleryItem[] {
    return this.catalog.candyBarShowcase;
  }

  candyBarDetails(): readonly GalleryItem[] {
    return this.catalog.candyBarDetails;
  }

  vitrina(): readonly GalleryItem[] {
    return this.catalog.vitrina;
  }
}

export const CATALOG_REPOSITORY = new InjectionToken<CatalogRepository>('CATALOG_REPOSITORY');
