import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkInProgressRoutingModule } from './work-in-progress-routing-module';
import { WorkInProgress } from './work-in-progress/work-in-progress';


@NgModule({
  declarations: [
    WorkInProgress
  ],
  imports: [
    CommonModule,
    WorkInProgressRoutingModule
  ]
})
export class WorkInProgressModule { }
