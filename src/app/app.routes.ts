import { Routes } from '@angular/router';
import { generateDocumentationRoutes } from './features/documentation/documentation.config';

console.log(generateDocumentationRoutes());

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./features/documentation/documentation').then((m) => m.Documentation),
    children: generateDocumentationRoutes(),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'calendar',
    loadComponent: () => import('./features/calendar/calendar').then((m) => m.Calendar),
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/users').then((m) => m.Users),
  },
  {
    path: 'ressources',
    loadComponent: () => import('./features/users/users').then((m) => m.Users),
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/users/users').then((m) => m.Users),
  },
];
