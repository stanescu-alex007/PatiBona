import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { PlatformService } from './platform.service';

const ACTIVITY_EVENTS = ['scroll', 'wheel', 'pointermove', 'pointerdown', 'touchstart', 'keydown'] as const;

/** pointermove fires on every pixel; restarting the timer this often is plenty. */
const RESET_THROTTLE_MS = 250;

/**
 * Tells whether the visitor is doing something on the page. `active` turns
 * false after a stretch with no scroll, pointer or key input, and true again
 * on the next one. Always true on the server.
 */
@Injectable({ providedIn: 'root' })
export class UserActivityService {
  private readonly platform = inject(PlatformService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly activeState = signal(true);
  readonly active = this.activeState.asReadonly();

  private idleMs = 0;
  private timer: ReturnType<typeof setTimeout> | undefined;
  private lastReset = 0;
  private listening = false;

  /** Starts watching. Safe to call more than once; the shortest delay wins. */
  watch(idleMs: number): void {
    const win = this.platform.window;
    if (!win) {
      return;
    }
    this.idleMs = this.idleMs ? Math.min(this.idleMs, idleMs) : idleMs;
    this.restartTimer();
    if (this.listening) {
      return;
    }
    this.listening = true;

    const onActivity = (): void => this.onActivity();
    for (const type of ACTIVITY_EVENTS) {
      win.addEventListener(type, onActivity, { passive: true });
    }
    this.destroyRef.onDestroy(() => {
      clearTimeout(this.timer);
      for (const type of ACTIVITY_EVENTS) {
        win.removeEventListener(type, onActivity);
      }
    });
  }

  private onActivity(): void {
    const now = performance.now();
    if (this.activeState() && now - this.lastReset < RESET_THROTTLE_MS) {
      return;
    }
    this.lastReset = now;
    this.activeState.set(true);
    this.restartTimer();
  }

  private restartTimer(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.activeState.set(false), this.idleMs);
  }
}
