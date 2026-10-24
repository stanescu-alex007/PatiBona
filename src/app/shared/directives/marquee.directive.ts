import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { PlatformService } from '../../core/services/platform.service';

/** Extra copies beyond the strict minimum, so a resize never exposes the end. */
const SPARE_COPIES = 1;

/**
 * Turns a single row of items into an endless horizontal marquee.
 *
 * The host must contain exactly one child element: the group to repeat. That
 * group's content has to be static, because the copies are plain DOM clones
 * which Angular does not keep up to date.
 *
 * The directive clones the group until the strip is wider than the viewport
 * plus one group, then slides the strip by exactly one group width and loops.
 * Both halves of that rule matter: too few clones leave a visible gap on wide
 * screens, and sliding by anything other than one group width shows a seam.
 */
@Directive({
  selector: '[appMarquee]',
  standalone: true,
})
export class MarqueeDirective {
  /** Scroll speed in pixels per second. */
  readonly marqueeSpeed = input(45);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly platform = inject(PlatformService);
  private readonly destroyRef = inject(DestroyRef);

  private stopAnimation: (() => void) | null = null;
  private resizeHandle = 0;

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    if (!this.motion.enabled) {
      return;
    }
    this.build();

    const win = this.platform.window;
    if (!win) {
      return;
    }
    const onResize = (): void => {
      cancelAnimationFrame(this.resizeHandle);
      this.resizeHandle = requestAnimationFrame(() => this.build());
    };
    win.addEventListener('resize', onResize);

    this.destroyRef.onDestroy(() => {
      win.removeEventListener('resize', onResize);
      cancelAnimationFrame(this.resizeHandle);
      this.stopAnimation?.();
    });
  }

  private build(): void {
    const track = this.host.nativeElement;
    const original = track.firstElementChild as HTMLElement | null;
    const viewport = track.parentElement?.clientWidth ?? 0;
    if (!original || viewport === 0) {
      return;
    }

    this.stopAnimation?.();
    this.stopAnimation = null;
    track.querySelectorAll('[data-marquee-clone]').forEach((clone) => clone.remove());

    const groupWidth = original.getBoundingClientRect().width;
    if (groupWidth === 0) {
      return;
    }

    const copies = Math.ceil((viewport + groupWidth) / groupWidth) + SPARE_COPIES;
    for (let i = 1; i < copies; i++) {
      const clone = original.cloneNode(true) as HTMLElement;
      clone.setAttribute('data-marquee-clone', '');
      track.append(clone);
    }

    this.stopAnimation = this.motion.scope(track, (gsap) => {
      gsap.set(track, { x: 0 });
      gsap.to(track, {
        x: -groupWidth,
        duration: groupWidth / this.marqueeSpeed(),
        ease: 'none',
        repeat: -1,
      });
    });
  }
}
