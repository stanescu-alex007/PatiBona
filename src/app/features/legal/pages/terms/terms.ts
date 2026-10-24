import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../../../../shared/components/icon/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { BUSINESS_INFO } from '../../../../core/tokens/business-info.token';
import { TERMS_INTRO, TERMS_LINKS, TERMS_SECTIONS, TERMS_UPDATED_AT } from '../../data/terms.data';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [Icon, RevealDirective],
  templateUrl: './terms.html',
  styleUrl: './terms.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Terms {
  protected readonly business = inject(BUSINESS_INFO);
  protected readonly company = this.business.company;
  protected readonly intro = TERMS_INTRO;
  protected readonly updatedAt = TERMS_UPDATED_AT;
  protected readonly sections = TERMS_SECTIONS;
  protected readonly links = TERMS_LINKS;
}
