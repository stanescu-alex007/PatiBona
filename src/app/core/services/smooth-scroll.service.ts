import { computed, inject, Injectable, signal } from '@angular/core';
import Lenis from 'lenis';
import { MotionService } from './motion.service';
import { PlatformService } from './platform.service';

export interface ScrollToOptions {
  readonly offset?: number;
  readonly immediate?: boolean;
  readonly duration?: number;
}

export type ScrollDirection = 'up' | 'down';

const SCROLLED_THRESHOLD = 32;

/**
 * Wraps Lenis (inertial scrolling) and keeps GSAP ScrollTrigger in sync.
 * Exposes scroll state as signals so the UI (navbar, progress bar) can
 * react without registering its own listeners.
 */
@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly platform = inject(PlatformService);
  private readonly motion = inject(MotionService);

  private lenis: Lenis | null = null;

  private readonly scrollYState = signal(0);
  private readonly directionState = signal<ScrollDirection>('down');
  private readonly progressState = signal(0);

  readonly scrollY = this.scrollYState.asReadonly();
  readonly direction = this.directionState.asReadonly();
  readonly progress = this.progressState.asReadonly();
  readonly isScrolled = computed(() => this.scrollYState() > SCROLLED_THRESHOLD);

  /** Call once from the root component after first render. */
  init(): void {
    if (!this.platform.isBrowser || this.lenis) {
      return;
    }

    if (this.motion.reducedMotion) {
      this.listenNative();
      return;
    }

    const gsap = this.motion.gsap;
    const scrollTrigger = this.motion.scrollTrigger;

    this.lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      autoRaf: false,
    });

    this.lenis.on('scroll', (instance) => {
      this.publish(instance.scroll, instance.direction, instance.progress);
      scrollTrigger.update();
    });

    gsap.ticker.add((time) => this.lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  scrollTo(target: string | number | HTMLElement, options: ScrollToOptions = {}): void {
    if (!this.platform.isBrowser) {
      return;
    }
    if (this.lenis) {
      this.lenis.scrollTo(target, {
        offset: options.offset ?? 0,
        immediate: options.immediate ?? false,
        duration: options.duration ?? 1.4,
      });
      return;
    }
    this.nativeScrollTo(target, options);
  }

  scrollToTop(immediate = true): void {
    this.scrollTo(0, { immediate });
  }

  /** Locks page scroll (e.g. while a full-screen menu is open). */
  lock(): void {
    this.lenis?.stop();
    this.platform.document.documentElement.classList.add('is-locked');
  }

  unlock(): void {
    this.lenis?.start();
    this.platform.document.documentElement.classList.remove('is-locked');
  }

  private listenNative(): void {
    const win = this.platform.window;
    if (!win) {
      return;
    }
    let last = win.scrollY;
    win.addEventListener(
      'scroll',
      () => {
        const y = win.scrollY;
        const max = this.platform.document.documentElement.scrollHeight - win.innerHeight;
        this.publish(y, y >= last ? 1 : -1, max > 0 ? y / max : 0);
        last = y;
      },
      { passive: true },
    );
  }

  private nativeScrollTo(target: string | number | HTMLElement, options: ScrollToOptions): void {
    const win = this.platform.window;
    if (!win) {
      return;
    }
    const behavior: ScrollBehavior = options.immediate ? 'instant' : 'smooth';
    if (typeof target === 'number') {
      win.scrollTo({ top: target, behavior });
      return;
    }
    const el =
      typeof target === 'string' ? this.platform.document.querySelector<HTMLElement>(target) : target;
    if (!el) {
      return;
    }
    const top = el.getBoundingClientRect().top + win.scrollY + (options.offset ?? 0);
    win.scrollTo({ top, behavior });
  }

  private publish(scroll: number, direction: number, progress: number): void {
    this.scrollYState.set(scroll);
    this.directionState.set(direction < 0 ? 'up' : 'down');
    this.progressState.set(progress);
  }
}
