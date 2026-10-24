import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../../../../shared/components/icon/icon';
import { MapEmbed } from '../../../../shared/components/map-embed/map-embed';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { BUSINESS_INFO } from '../../../../core/tokens/business-info.token';
import { STORY } from '../../data/story.data';

/** Final section: the invitation. Phone, hours and address beside the map. */
@Component({
  selector: 'app-visit-section',
  standalone: true,
  imports: [Icon, MapEmbed, RevealDirective],
  templateUrl: './visit.html',
  styleUrl: './visit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisitSection {
  protected readonly business = inject(BUSINESS_INFO);
  protected readonly copy = STORY.visit;
}
