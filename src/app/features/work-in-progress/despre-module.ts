import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespreRoutingModule } from './despre-routing-module';
import { Despre } from './despre';


@NgModule({
  declarations: [
    Despre
  ],
  imports: [
    CommonModule,
    DespreRoutingModule
  ]
})
export class DespreModule { }
