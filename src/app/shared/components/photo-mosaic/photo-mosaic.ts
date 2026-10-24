import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Icon } from '../icon/icon';
import { RevealDirective } from '../../directives/reveal.directive';

export interface MosaicPhoto {
  readonly src: string;
  readonly alt: string;
}

/**
 * Responsive photo grid with a "load more" control.
 * Purely presentational: the parent owns the list and pagination.
 */
@Component({
  selector: 'app-photo-mosaic',
  standalone: true,
  imports: [Icon, RevealDirective],
  templateUrl: './photo-mosaic.html',
  styleUrl: './photo-mosaic.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoMosaic {
  readonly photos = input.required<readonly MosaicPhoto[]>();
  readonly hasMore = input(false);
  readonly remaining = input(0);
  readonly moreLabel = input('Mai multe fotografii');

  readonly loadMore = output<void>();
}
