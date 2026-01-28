import { Routes } from '@angular/router';
import { generateDocumentationRoutes } from './features/documentation/documentation.config';

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
    // canActivate: [authGuard],
    children: [
      //   {
      //     path: '',
      //     redirectTo: 'profile',
      //     pathMatch: 'full',
      //   },
      //   {
      //     path: 'profile',
      //     loadComponent: () => import('./features/settings/profile/profile').then((m) => m.Profile),
      //   },
      //   {
      //     path: 'theme',
      //     loadComponent: () => import('./features/settings/theme/theme').then((m) => m.ThemeSettings),
      //   },
    ],
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./features/documentation/documentation').then((m) => m.Documentation),
    children: generateDocumentationRoutes(),
  },

  // Authentification (publique)
  //   {
  // path: 'auth',
  // loadComponent: () => import('./features/auth/auth-layout').then((m) => m.AuthLayout),
  // children: [
  //   {
  //     path: 'login',
  //     loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  //   },
  //   {
  //     path: 'register',
  //     loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  //   },
  // ],
  //   },
];
