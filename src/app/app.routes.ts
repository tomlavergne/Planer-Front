import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home/home').then((m) => m.Home),
  },
  {
    path: 'calendar',
    loadComponent: () => import('./features/calendar/calendar/calendar').then((m) => m.Calendar),
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/users/users').then((m) => m.Users),
  },
  {
    path: 'ressources',
    loadComponent: () => import('./features/users/users/users').then((m) => m.Users),
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/users/users/users').then((m) => m.Users),
  },
];
