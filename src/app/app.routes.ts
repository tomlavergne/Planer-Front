import { Routes } from '@angular/router';
import { generateDocumentationRoutes } from './features/documentation/documentation.config';
import { generateSettingRoutes } from './features/settings/settings.config';

console.log(generateDocumentationRoutes());

export const routes: Routes = [
  {
    path: '',
    // canActivate: [authGuard], // À ajouter plus tard
    loadComponent: () => import('./features/workspace/workspace').then((w) => w.Workspace),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/workspace/pages/home/home').then((m) => m.Home),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./features/workspace/pages/calendar/calendar').then((m) => m.Calendar),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/workspace/pages/users/users').then((m) => m.Users),
      },
      {
        path: 'ressources',
        loadComponent: () => import('./features/workspace/pages/users/users').then((m) => m.Users),
      },
    ],
  },

  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
    children: generateSettingRoutes(),
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./features/documentation/documentation').then((m) => m.Documentation),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      ...generateDocumentationRoutes(),
    ],
  },
  {
    path: '',
    loadComponent: () => import('./features/auth/auth').then((m) => m.Auth),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
      },
      //   {
      //     path: 'register',
      //     loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
      //   },
    ],
  },
];
