import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type IconName =
  | 'phone'
  | 'arrow-down'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'map-pin'
  | 'clock'
  | 'leaf'
  | 'hand'
  | 'hourglass'
  | 'gift'
  | 'cake'
  | 'sparkles'
  | 'menu'
  | 'close'
  | 'chevron-left'
  | 'chevron-right'
  | 'wheat'
  | 'heart'
  | 'calendar'
  | 'flame'
  | 'star'
  | 'whatsapp';

const SPRITE_URL = '/svg/icons.svg';

/**
 * Renders an icon from the SVG sprite in /public/svg/icons.svg.
 * Decorative by default; pass `label` to expose it to assistive tech.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly label = input<string | null>(null);

  readonly href = computed(() => `${SPRITE_URL}#${this.name()}`);
}
