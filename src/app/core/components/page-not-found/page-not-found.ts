import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatusPage } from '../../../shared/components/status-page/status-page';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [StatusPage],
  templateUrl: './page-not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFound {}
