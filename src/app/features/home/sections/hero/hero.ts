import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { Icon } from '../../../../shared/components/icon/icon';
import { MarqueeDirective } from '../../../../shared/directives/marquee.directive';
import { MotionService } from '../../../../core/services/motion.service';
import { SectionNavigationService } from '../../../../core/services/section-navigation.service';
import { BUSINESS_INFO } from '../../../../core/tokens/business-info.token';
import { STORY } from '../../data/story.data';

/**
 * The intro only plays when the app wakes up quickly. On a slow phone the
 * visitor has already been reading the prerendered hero by then, and hiding
 * it to animate it back in would read as a flicker.
 */
const INTRO_MAX_START_MS = 1000;

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [Icon, MarqueeDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSection {
  protected readonly business = inject(BUSINESS_INFO);
  protected readonly copy = STORY.hero;
  /** One group; appMarquee repeats it as many times as the viewport needs. */
  protected readonly marquee = STORY.hero.marquee;
  protected readonly photos = STORY.hero.photos;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sectionNav = inject(SectionNavigationService);

  constructor() {
    afterNextRender(() => this.animate());
  }

  goToProducts(): void {
    this.sectionNav.goTo('cozonac');
  }

  private animate(): void {
    if (!this.motion.enabled) {
      return;
    }
    const playIntro = performance.now() < INTRO_MAX_START_MS;

    const cleanup = this.motion.scope(this.host.nativeElement, (gsap) => {
      if (playIntro) {
        // The lead and the buttons only move, they never go transparent: the
        // lead is the page's largest paint on phones, and an element at zero
        // opacity does not count as painted.
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero="word"]', { yPercent: 115, duration: 1.3, stagger: 0.08 }, 0.1)
          .from(['[data-hero="lead"]', '[data-hero="actions"]'], { y: 28, duration: 1.1, stagger: 0.12 }, 0.35)
          .from(
            '[data-hero="photo"]',
            { autoAlpha: 0, scale: 0.6, yPercent: 30, duration: 1.4, ease: 'back.out(1.6)', stagger: 0.1 },
            0.25,
          )
          .from('[data-hero="marquee"]', { autoAlpha: 0, duration: 1 }, 0.9);
      }

      gsap.to('[data-hero="content"]', {
        y: -120,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: this.host.nativeElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // The polaroids drift up at different speeds, so the collage has depth.
      gsap.to('[data-hero="photo"]', {
        y: (_: number, el: HTMLElement) => -Number(el.dataset['depth'] ?? 0),
        ease: 'none',
        scrollTrigger: {
          trigger: this.host.nativeElement,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
    this.destroyRef.onDestroy(cleanup);
  }
}
