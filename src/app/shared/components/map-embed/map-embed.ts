import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

/**
 * The Google map for the shop. `loading="lazy"` leaves it to the browser to
 * fetch the embed only once it is near the viewport, so the page opens without
 * paying for it up front.
 */
@Component({
  selector: 'app-map-embed',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './map-embed.html',
  styleUrl: './map-embed.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapEmbed {
  readonly embedUrl = input.required<string>();
  readonly title = input.required<string>();
}
