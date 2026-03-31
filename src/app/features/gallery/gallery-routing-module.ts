import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Gallery} from './pages/gallery/gallery';

const routes: Routes = [
  {
    path: '',
    component: Gallery
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
