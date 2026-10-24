import { Routes, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageNotFound } from './core/components/page-not-found/page-not-found';

/**
 * The old site had a contact page. It is a section of the home page now, so
 * anyone arriving on the old address lands there instead of on a 404. The
 * hosting config also sends a 301, which is what search engines should follow;
 * this is the fallback for hosts that ignore it.
 */
function toContactSection(): UrlTree {
  return inject(Router).createUrlTree(['/'], { fragment: 'vizita' });
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/pages/home/home').then((m) => m.Home),
    title: 'Pati Bona · Patiseria bunicii',
  },
  {
    path: 'contact',
    redirectTo: toContactSection,
  },
  {
    path: 'termeni-si-conditii',
    loadComponent: () => import('./features/legal/pages/terms/terms').then((m) => m.Terms),
    title: 'Termeni și condiții · Pati Bona',
  },
  {
    path: 'in-lucru',
    loadComponent: () =>
      import('./features/work-in-progress/work-in-progress/work-in-progress').then(
        (m) => m.WorkInProgress,
      ),
    title: 'În lucru · Pati Bona',
  },
  {
    path: '**',
    component: PageNotFound,
    title: 'Pagina nu există · Pati Bona',
  },
];
