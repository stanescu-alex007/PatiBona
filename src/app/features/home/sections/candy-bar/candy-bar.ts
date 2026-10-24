import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { Icon } from '../../../../shared/components/icon/icon';
import { PhotoMosaic } from '../../../../shared/components/photo-mosaic/photo-mosaic';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { PaginatedList } from '../../../../shared/utils/paginated-list';
import { MotionService } from '../../../../core/services/motion.service';
import { BUSINESS_INFO } from '../../../../core/tokens/business-info.token';
import { STORY } from '../../data/story.data';
import { CATALOG_REPOSITORY } from '../../services/catalog.repository';

const DETAILS_PAGE = 8;

/**
 * Kept identical in candy-bar.scss. The threshold is low on purpose: a laptop
 * at 150% display scaling reports ~850 CSS px and must still get the
 * scroll-driven gallery. Below it, phones keep a native swipe strip.
 */
const GALLERY_QUERY = '(min-width: 768px)';

/**
 * The candy bar showcase: a horizontal gallery driven by vertical scroll,
 * followed by a mosaic of close-ups with load-more.
 */
@Component({
  selector: 'app-candy-bar-section',
  standalone: true,
  imports: [Icon, PhotoMosaic, RevealDirective],
  templateUrl: './candy-bar.html',
  styleUrl: './candy-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandyBarSection {
  protected readonly business = inject(BUSINESS_INFO);
  protected readonly copy = STORY.candyBar;

  private readonly catalog = inject(CATALOG_REPOSITORY);
  protected readonly showcase = this.catalog.candyBarShowcase();
  protected readonly details = new PaginatedList(this.catalog.candyBarDetails(), DETAILS_PAGE);

  private readonly pin = viewChild.required<ElementRef<HTMLElement>>('pin');
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.animate());
  }

  private animate(): void {
    if (!this.motion.enabled) {
      return;
    }
    const pin = this.pin().nativeElement;
    const track = this.track().nativeElement;

    const cleanup = this.motion.scopeWhen(GALLERY_QUERY, pin, (gsap) => {
      const distance = (): number => track.scrollWidth - pin.clientWidth;

      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each photo drifts inside its frame while it crosses the screen.
      gsap.utils.toArray<HTMLElement>('.candy__frame img', track).forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: slide,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        );
      });
    });
    this.destroyRef.onDestroy(cleanup);
  }
}
