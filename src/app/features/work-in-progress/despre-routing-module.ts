import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Despre } from './despre';

const routes: Routes = [
  {
    path: '',
    component: Despre
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespreRoutingModule { }
