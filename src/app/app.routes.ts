import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'playground',
    loadComponent: () => import('./features/playground/playground').then((p) => p.Playground),
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
