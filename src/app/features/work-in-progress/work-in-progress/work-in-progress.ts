import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatusPage } from '../../../shared/components/status-page/status-page';

@Component({
  selector: 'app-work-in-progress',
  standalone: true,
  imports: [StatusPage],
  templateUrl: './work-in-progress.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkInProgress {}
