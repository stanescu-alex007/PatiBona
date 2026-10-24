import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Which scatter pattern to use, so neighbouring sections do not repeat. */
export type BlossomLayout = 'a' | 'b' | 'c';

/** The section colour the flowers sit on: they take colours that read on it. */
export type BlossomTone = 'light' | 'pink';

/** Which of the two background ribbons to draw. */
export type BlossomRibbons = 'both' | 'stitched';

const FLOWER_COUNT = 10;
const BOW_COUNT = 3;

/**
 * Flowers, little bows and two wavy ribbons over a section's background,
 * purely for decoration. Place it as the first child of a positioned,
 * isolated section; it fills the section and never takes clicks.
 */
@Component({
  selector: 'app-blossoms',
  standalone: true,
  templateUrl: './blossoms.html',
  styleUrl: './blossoms.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[class]': '"blossoms--" + layout() + " blossoms--on-" + tone()',
  },
})
export class Blossoms {
  readonly layout = input<BlossomLayout>('a');
  readonly tone = input<BlossomTone>('light');
  readonly ribbons = input<BlossomRibbons>('both');

  protected readonly flowers = Array.from({ length: FLOWER_COUNT }, (_, i) => i);
  protected readonly bows = Array.from({ length: BOW_COUNT }, (_, i) => i);
}
