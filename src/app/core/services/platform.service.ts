import { DOCUMENT, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Answers environment questions (browser vs. server, user preferences)
 * so components and services never touch `window` directly.
 */
@Injectable({ providedIn: 'root' })
export class PlatformService {
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly document = inject(DOCUMENT);

  get window(): Window | null {
    return this.isBrowser ? this.document.defaultView : null;
  }

  get prefersReducedMotion(): boolean {
    return this.matches('(prefers-reduced-motion: reduce)');
  }

  get isFinePointer(): boolean {
    return this.matches('(hover: hover) and (pointer: fine)');
  }

  get isTouchDevice(): boolean {
    return this.matches('(hover: none) and (pointer: coarse)');
  }

  matches(query: string): boolean {
    return this.window?.matchMedia(query).matches ?? false;
  }

  readStorage(key: string): string | null {
    try {
      return this.window?.localStorage.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  writeStorage(key: string, value: string): void {
    try {
      this.window?.localStorage.setItem(key, value);
    } catch {
      /* storage unavailable (private mode) – ignore */
    }
  }
}
