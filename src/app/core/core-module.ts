import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { PageNotFound } from './components/page-not-found/page-not-found';
import {RouterLink} from '@angular/router';



@NgModule({
  declarations: [
    Navbar,
    Footer,
    PageNotFound
  ],
  exports: [
    Navbar,
    Footer
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class CoreModule { }
