import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    // Adopt the prerendered DOM instead of rebuilding the page on start-up.
    // Deliberately without withEventReplay(): in Angular 21.2 it retained every
    // routed page it had seen, leaking a full copy of the home page per visit.
    // The buttons that matter are plain tel: and router links, so nothing is
    // lost if a click lands before the app wakes up.
    provideClientHydration(),
    // Scrolling (top on navigate, fragments) is owned by SmoothScrollService,
    // so the router's built-in scroll handling is intentionally not enabled.
    provideRouter(routes),
  ],
};
