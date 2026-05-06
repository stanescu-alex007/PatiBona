import { Routes } from '@angular/router';
import { PageNotFound } from './core/components/page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard').then(m => m.Dashboard),
  },
  {
    path: 'gallery',
    loadComponent: () => import('./features/gallery/pages/gallery/gallery').then(m => m.Gallery),
  },
  {
    path: 'despre',
    loadComponent: () => import('./features/work-in-progress/despre').then(m => m.Despre),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/work-in-progress/contact').then(m => m.Contact),
  },
  {
    path: 'work-in-progress',
    loadComponent: () =>
      import('./features/work-in-progress/work-in-progress/work-in-progress').then(m => m.WorkInProgress),
  },
  {
    path: '**',
    component: PageNotFound,
  },
];
