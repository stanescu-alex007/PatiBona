import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AttributeList } from '../../../../shared/components/attribute-list/attribute-list';
import { Icon } from '../../../../shared/components/icon/icon';
import { MarqueeDirective } from '../../../../shared/directives/marquee.directive';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { TiltDirective } from '../../../../shared/directives/tilt.directive';
import { BUSINESS_INFO } from '../../../../core/tokens/business-info.token';
import { STORY } from '../../data/story.data';
import { CATALOG_REPOSITORY } from '../../services/catalog.repository';

/**
 * Three cakes on a cake plate beside the pitch, and a slow ribbon of the
 * rest underneath. Nothing to operate.
 */
@Component({
  selector: 'app-torturi-section',
  standalone: true,
  imports: [AttributeList, Icon, MarqueeDirective, RevealDirective, TiltDirective],
  templateUrl: './torturi.html',
  styleUrl: './torturi.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TorturiSection {
  protected readonly business = inject(BUSINESS_INFO);
  protected readonly copy = STORY.torturi;
  private readonly catalog = inject(CATALOG_REPOSITORY);
  protected readonly cakes = this.catalog.torturi();
  /** One group; appMarquee repeats it as many times as the viewport needs. */
  protected readonly gallery = this.catalog.torturiGallery();
}
