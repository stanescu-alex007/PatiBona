import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFound } from './core/components/page-not-found/page-not-found';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard-module')
        .then(m => m.DashboardModule)
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./features/gallery/gallery-module')
        .then(m => m.GalleryModule)
  },
  {
    path: 'despre',
    loadChildren: () =>
      import('./features/work-in-progress/despre-module')
        .then(m => m.DespreModule)
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/work-in-progress/contact-module')
        .then(m => m.ContactModule)
  },
  {
    path: 'work-in-progress',
    loadChildren: () =>
      import('./features/work-in-progress/work-in-progress-module')
        .then(m => m.WorkInProgressModule)
  },
  {
    path: '**',
    component: PageNotFound
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
