import { afterNextRender, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Icon } from '../../../shared/components/icon/icon';
import { UserActivityService } from '../../services/user-activity.service';
import { BUSINESS_INFO } from '../../tokens/business-info.token';

/** How long the page has to sit still before the bubble steps aside. */
const IDLE_MS = 4000;

/**
 * Round WhatsApp bubble in the bottom-right corner. It slides away when the
 * visitor stops interacting, so it never sits on top of a photo they are
 * looking at, and comes back with the next scroll or touch.
 */
@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [Icon],
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappButton {
  protected readonly business = inject(BUSINESS_INFO);
  private readonly activity = inject(UserActivityService);
  protected readonly visible = this.activity.active;

  constructor() {
    afterNextRender(() => this.activity.watch(IDLE_MS));
  }
}
