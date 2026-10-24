import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { PlatformService } from '../../core/services/platform.service';

/**
 * Fades and lifts the host (or its `[data-reveal-child]` descendants,
 * staggered) into view the first time it enters the viewport.
 *
 * Usage:
 *   <p appReveal>…</p>
 *   <ul appReveal [revealChildren]="true"><li data-reveal-child>…</li></ul>
 *
 * Built for a cheap start-up:
 * - an IntersectionObserver instead of a ScrollTrigger, so nothing measures
 *   layout on scroll and the browser does the watching off the main thread;
 * - the one layout read happens in Angular's early-read phase, before any
 *   directive writes styles, so dozens of instances cause a single layout
 *   instead of one each;
 * - content that is already on screen is left alone, because hiding what the
 *   server already painted would flicker and delay the largest paint.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { 'data-reveal': '' },
})
export class RevealDirective {
  readonly revealChildren = input(false);
  readonly revealY = input(48);
  readonly revealDelay = input(0);
  readonly revealStagger = input(0.09);
  /** How far down the viewport (0–1) the host's top must rise before it reveals. */
  readonly revealAt = input(0.85);
  readonly revealDuration = input(1.1);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly platform = inject(PlatformService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender({
      earlyRead: () => this.isBelowRevealLine(),
      write: (below) => {
        if (below) {
          this.hideAndWatch();
        }
      },
    });
  }

  private isBelowRevealLine(): boolean {
    const win = this.platform.window;
    if (!this.motion.enabled || !win) {
      return false;
    }
    return this.host.nativeElement.getBoundingClientRect().top > win.innerHeight * this.revealAt();
  }

  private hideAndWatch(): void {
    const el = this.host.nativeElement;
    const targets: Element[] = this.revealChildren()
      ? Array.from(el.querySelectorAll('[data-reveal-child]'))
      : [el];
    if (targets.length === 0) {
      return;
    }

    const revertHidden = this.motion.scope(el, (gsap) => {
      gsap.set(targets, { autoAlpha: 0, y: this.revealY() });
    });
    let revertReveal: () => void = () => undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }
        observer.disconnect();
        revertReveal = this.motion.scope(el, (gsap) => {
          gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: this.revealDuration(),
            delay: this.revealDelay(),
            stagger: this.revealStagger(),
            ease: 'power3.out',
            clearProps: 'transform',
          });
        });
      },
      { rootMargin: `0px 0px -${Math.round((1 - this.revealAt()) * 100)}% 0px` },
    );
    observer.observe(el);

    this.destroyRef.onDestroy(() => {
      observer.disconnect();
      revertReveal();
      revertHidden();
    });
  }
}
