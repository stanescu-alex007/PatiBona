import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AttributeList } from '../../../../shared/components/attribute-list/attribute-list';
import { Blossoms } from '../../../../shared/components/blossoms/blossoms';
import { Icon } from '../../../../shared/components/icon/icon';
import { ParallaxDirective } from '../../../../shared/directives/parallax.directive';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { BUSINESS_INFO } from '../../../../core/tokens/business-info.token';
import { STORY } from '../../data/story.data';
import { CATALOG_REPOSITORY } from '../../services/catalog.repository';

/** The signature product: text on the left, an even collage of loaves on the right. */
@Component({
  selector: 'app-cozonac-section',
  standalone: true,
  imports: [Blossoms, AttributeList, Icon, ParallaxDirective, RevealDirective],
  templateUrl: './cozonac.html',
  styleUrl: './cozonac.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CozonacSection {
  protected readonly business = inject(BUSINESS_INFO);
  protected readonly copy = STORY.cozonac;
  protected readonly images = inject(CATALOG_REPOSITORY).cozonac();

  /** Alternating parallax depth so the collage feels layered. */
  protected readonly depths = [6, 12, 8];
}
