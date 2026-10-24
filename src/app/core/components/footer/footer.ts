import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../shared/components/icon/icon';
import { SectionNavigationService } from '../../services/section-navigation.service';
import { SmoothScrollService } from '../../services/smooth-scroll.service';
import { BUSINESS_INFO } from '../../tokens/business-info.token';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly business = inject(BUSINESS_INFO);
  private readonly sectionNav = inject(SectionNavigationService);
  private readonly scroll = inject(SmoothScrollService);

  readonly sections = this.sectionNav.sections;
  readonly year = new Date().getFullYear();

  goToSection(id: string): void {
    this.sectionNav.goTo(id);
  }

  toTop(): void {
    this.scroll.scrollToTop(false);
  }
}
