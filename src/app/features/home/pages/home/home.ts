import { afterNextRender, ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MotionService } from '../../../../core/services/motion.service';
import { PlatformService } from '../../../../core/services/platform.service';
import { SectionNavigationService } from '../../../../core/services/section-navigation.service';
import { provideCatalog } from '../../services/catalog.providers';
import { HeroSection } from '../../sections/hero/hero';
import { CozonacSection } from '../../sections/cozonac/cozonac';
import { TorturiSection } from '../../sections/torturi/torturi';
import { CandyBarSection } from '../../sections/candy-bar/candy-bar';
import { MagazinSection } from '../../sections/magazin/magazin';
import { VisitSection } from '../../sections/visit/visit';

const FRAGMENT_SETTLE_MS = 400;

/** The story: one full-screen chapter after another. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroSection, CozonacSection, TorturiSection, CandyBarSection, MagazinSection, VisitSection],
  providers: [provideCatalog()],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly route = inject(ActivatedRoute);
  private readonly platform = inject(PlatformService);
  private readonly sectionNav = inject(SectionNavigationService);

  constructor() {
    afterNextRender(() => {
      this.motion.refreshWhenImagesLoad(this.host.nativeElement);

      const fragment = this.route.snapshot.fragment;
      if (fragment && this.platform.isBrowser) {
        // Let pinned sections register their spacers before measuring the target.
        setTimeout(() => this.sectionNav.revealFragment(fragment), FRAGMENT_SETTLE_MS);
      }
    });
  }
}
