import { inject, Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlatformService } from './platform.service';

export type MotionBuilder = (gsapRef: typeof gsap, scrollTrigger: typeof ScrollTrigger) => void;

/**
 * Thin façade over GSAP. Owns plugin registration and gives every
 * component a scoped context that is reverted on destroy, so no
 * tween or ScrollTrigger outlives the view that created it.
 */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly platform = inject(PlatformService);
  private registered = false;

  get reducedMotion(): boolean {
    return this.platform.prefersReducedMotion;
  }

  get enabled(): boolean {
    return this.platform.isBrowser && !this.reducedMotion;
  }

  get gsap(): typeof gsap {
    this.ensureRegistered();
    return gsap;
  }

  get scrollTrigger(): typeof ScrollTrigger {
    this.ensureRegistered();
    return ScrollTrigger;
  }

  /**
   * Runs `build` inside a gsap.context bound to `scope`.
   * Returns a cleanup function that reverts every tween/trigger created.
   */
  scope(scope: Element, build: MotionBuilder): () => void {
    if (!this.platform.isBrowser) {
      return () => undefined;
    }
    this.ensureRegistered();
    const ctx = gsap.context(() => build(gsap, ScrollTrigger), scope);
    return () => ctx.revert();
  }

  /**
   * Like `scope`, but only while `query` matches: builds when it starts
   * matching, reverts when it stops. Returns a cleanup that detaches the
   * listener and reverts whatever is running.
   *
   * Deliberately not `gsap.matchMedia()`: in GSAP 3.15 it attaches a listener
   * to a fresh MediaQueryList on every call and never removes it, so each visit
   * to a page that uses it leaks one.
   */
  scopeWhen(query: string, scope: Element, build: MotionBuilder): () => void {
    const win = this.platform.window;
    if (!win) {
      return () => undefined;
    }
    const media = win.matchMedia(query);
    let revert: (() => void) | null = null;

    const sync = (): void => {
      revert?.();
      revert = media.matches ? this.scope(scope, build) : null;
    };

    sync();
    media.addEventListener('change', sync);
    return () => {
      media.removeEventListener('change', sync);
      revert?.();
      revert = null;
    };
  }

  refresh(): void {
    if (this.platform.isBrowser) {
      this.ensureRegistered();
      ScrollTrigger.refresh();
    }
  }

  /** Re-measures ScrollTrigger positions once images inside `root` have loaded. */
  refreshWhenImagesLoad(root: ParentNode): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const pending = Array.from(root.querySelectorAll('img')).filter((img) => !img.complete);
    if (pending.length === 0) {
      this.refresh();
      return;
    }
    let remaining = pending.length;
    const done = (): void => {
      remaining -= 1;
      if (remaining === 0) {
        this.refresh();
      }
    };
    pending.forEach((img) => {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
  }

  private ensureRegistered(): void {
    if (this.registered || !this.platform.isBrowser) {
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out', duration: 1 });
    this.registered = true;
  }
}
