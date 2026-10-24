import { Provider } from '@angular/core';
import { CATALOG } from '../data/catalog.data';
import { CATALOG_REPOSITORY, StaticCatalogRepository } from './catalog.repository';

/** Wires the static catalog as the repository for the home feature. */
export function provideCatalog(): Provider[] {
  return [{ provide: CATALOG_REPOSITORY, useFactory: () => new StaticCatalogRepository(CATALOG) }];
}
