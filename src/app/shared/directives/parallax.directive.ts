import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';

/**
 * Moves the host vertically at a fraction of scroll speed while its
 * parent is on screen. Positive speed lags behind, negative leads.
 * Decorative layers only – never text.
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective {
  /** Percent of the host's own height to travel across the parent's scroll range. */
  readonly parallaxSpeed = input(15);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    if (!this.motion.enabled) {
      return;
    }
    const el = this.host.nativeElement;
    const trigger = el.parentElement ?? el;
    const speed = this.parallaxSpeed();

    const cleanup = this.motion.scope(el, (gsap) => {
      gsap.fromTo(
        el,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: {
            trigger,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      );
    });
    this.destroyRef.onDestroy(cleanup);
  }
}
