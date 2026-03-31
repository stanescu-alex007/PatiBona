import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkInProgress} from './work-in-progress/work-in-progress';

const routes: Routes = [
  {
    path: '',
    component: WorkInProgress
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkInProgressRoutingModule { }
