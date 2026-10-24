import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformService } from './platform.service';
import { SmoothScrollService } from './smooth-scroll.service';

export interface SectionLink {
  readonly id: string;
  readonly label: string;
}

/** Anchors on the home page, in story order. Shared by navbar and hero. */
export const HOME_SECTIONS: readonly SectionLink[] = [
  { id: 'cozonac', label: 'Cozonaci' },
  { id: 'torturi', label: 'Torturi' },
  { id: 'candy-bar', label: 'Candy Bar' },
  { id: 'vitrina', label: 'Vitrina' },
  { id: 'vizita', label: 'Contact' },
];

/**
 * Navigates to a section on the home page: smooth-scrolls when already
 * there, otherwise routes home with a fragment that the home page consumes.
 */
@Injectable({ providedIn: 'root' })
export class SectionNavigationService {
  private readonly router = inject(Router);
  private readonly scroll = inject(SmoothScrollService);
  private readonly platform = inject(PlatformService);

  readonly sections = HOME_SECTIONS;

  goTo(sectionId: string): void {
    const target = this.platform.document.getElementById(sectionId);
    if (target) {
      this.scroll.scrollTo(target);
      return;
    }
    void this.router.navigate(['/'], { fragment: sectionId });
  }

  /** Scrolls to `sectionId` once the element exists (used after route change). */
  revealFragment(sectionId: string | null): void {
    if (!sectionId || !this.platform.isBrowser) {
      return;
    }
    const target = this.platform.document.getElementById(sectionId);
    if (target) {
      this.scroll.scrollTo(target, { duration: 1.8 });
    }
  }
}
