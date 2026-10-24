import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PhotoMosaic } from '../../../../shared/components/photo-mosaic/photo-mosaic';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { PaginatedList } from '../../../../shared/utils/paginated-list';
import { STORY } from '../../data/story.data';
import { CATALOG_REPOSITORY } from '../../services/catalog.repository';

const VITRINA_PAGE = 8;

/** Chapter four: what is in the shop window today. */
@Component({
  selector: 'app-magazin-section',
  standalone: true,
  imports: [PhotoMosaic, RevealDirective],
  templateUrl: './magazin.html',
  styleUrl: './magazin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagazinSection {
  protected readonly copy = STORY.vitrina;
  protected readonly list = new PaginatedList(inject(CATALOG_REPOSITORY).vitrina(), VITRINA_PAGE);
}
