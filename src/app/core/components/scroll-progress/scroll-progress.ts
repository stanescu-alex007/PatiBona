import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

/** Thin bar along the top edge showing how far down the page the reader is. */
@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  templateUrl: './scroll-progress.html',
  styleUrl: './scroll-progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollProgress {
  private readonly scroll = inject(SmoothScrollService);

  readonly scale = computed(() => this.scroll.progress().toFixed(4));
}
