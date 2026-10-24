import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon, IconName } from '../icon/icon';

export interface AttributeItem {
  readonly icon: IconName;
  readonly text: string;
}

/** Icon + text bullet list used by the product chapters. */
@Component({
  selector: 'app-attribute-list',
  standalone: true,
  imports: [Icon],
  templateUrl: './attribute-list.html',
  styleUrl: './attribute-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttributeList {
  readonly items = input.required<readonly AttributeItem[]>();
}
