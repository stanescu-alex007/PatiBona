import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../shared/components/icon/icon';
import { SectionNavigationService } from '../../services/section-navigation.service';
import { SmoothScrollService } from '../../services/smooth-scroll.service';
import { BUSINESS_INFO } from '../../tokens/business-info.token';

const HIDE_AFTER_PX = 240;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, Icon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-scrolled]': 'scroll.isScrolled()',
    '[class.is-hidden]': 'hidden()',
    '[class.is-open]': 'menuOpen()',
  },
})
export class Navbar {
  protected readonly scroll = inject(SmoothScrollService);
  protected readonly business = inject(BUSINESS_INFO);
  private readonly sectionNav = inject(SectionNavigationService);

  readonly sections = this.sectionNav.sections;
  readonly menuOpen = signal(false);

  readonly hidden = computed(
    () =>
      !this.menuOpen() && this.scroll.direction() === 'down' && this.scroll.scrollY() > HIDE_AFTER_PX,
  );

  /** The brand always returns to the hero: scroll up here, route home from elsewhere. */
  goToTop(): void {
    this.closeMenu();
    this.scroll.scrollTo(0, { duration: 1.2 });
  }

  toggleMenu(): void {
    this.setMenu(!this.menuOpen());
  }

  closeMenu(): void {
    this.setMenu(false);
  }

  goToSection(id: string): void {
    this.closeMenu();
    this.sectionNav.goTo(id);
  }

  /** Locks/unlocks scrolling synchronously so a follow-up scrollTo is never swallowed. */
  private setMenu(open: boolean): void {
    this.menuOpen.set(open);
    if (open) {
      this.scroll.lock();
    } else {
      this.scroll.unlock();
    }
  }
}
