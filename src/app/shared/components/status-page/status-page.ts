import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icon/icon';
import { RevealDirective } from '../../directives/reveal.directive';

/** Full-screen message with the bakery mark and a way back home. */
@Component({
  selector: 'app-status-page',
  standalone: true,
  imports: [RouterLink, Icon, RevealDirective],
  templateUrl: './status-page.html',
  styleUrl: './status-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusPage {
  readonly eyebrow = input.required<string>();
  readonly heading = input.required<string>();
  readonly text = input.required<string>();
}
