import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { MotionService } from '../../core/services/motion.service';
import { PlatformService } from '../../core/services/platform.service';

/**
 * 3D tilt that follows the pointer. Desktop only (needs a fine pointer),
 * disabled under reduced motion. The host should have `transform-style: preserve-3d`.
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  /** Max rotation in degrees. */
  readonly tiltMax = input(10);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);
  private readonly platform = inject(PlatformService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    if (!this.motion.enabled || !this.platform.isFinePointer) {
      return;
    }
    const el = this.host.nativeElement;
    const max = this.tiltMax();

    let rotateX: (value: number) => void = () => undefined;
    let rotateY: (value: number) => void = () => undefined;

    // quickTo tweens live in GSAP's global timeline. Created outside a context
    // they are never killed, and each one keeps this element, and through its
    // parents the whole destroyed page, alive in memory.
    const revert = this.motion.scope(el, (gsap) => {
      gsap.set(el, { transformPerspective: 1200 });
      rotateX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      rotateY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    });

    const onMove = (event: PointerEvent): void => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * max * 2);
      rotateX(-py * max * 2);
    };
    const onLeave = (): void => {
      rotateX(0);
      rotateY(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    this.destroyRef.onDestroy(() => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      revert();
    });
  }
}
