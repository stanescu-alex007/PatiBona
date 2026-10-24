import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Navbar } from './core/components/navbar/navbar';
import { Footer } from './core/components/footer/footer';
import { ScrollProgress } from './core/components/scroll-progress/scroll-progress';
import { WhatsappButton } from './core/components/whatsapp-button/whatsapp-button';
import { SmoothScrollService } from './core/services/smooth-scroll.service';
import { StructuredDataService } from './core/services/structured-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, ScrollProgress, WhatsappButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly scroll = inject(SmoothScrollService);
  private readonly router = inject(Router);

  constructor() {
    // Emitted into the prerendered HTML, so crawlers see it without running JS.
    inject(StructuredDataService).publish();

    afterNextRender(() => this.scroll.init());

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        const hasFragment = this.router.parseUrl(this.router.url).fragment !== null;
        if (!hasFragment) {
          this.scroll.scrollToTop(true);
        }
      });
  }
}
