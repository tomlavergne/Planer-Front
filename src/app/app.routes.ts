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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./features/workspace/pages/home/home').then((m) => m.Home),
      },
      {
        path: 'planning',
        loadComponent: () =>
          import('./features/workspace/pages/planning/planning').then((p) => p.Planning),
      },
      {
        path: 'activities',
        loadComponent: () =>
          import('./features/workspace/pages/activities/activities').then((a) => a.Activities),
      },
      {
        path: 'registrations',
        loadComponent: () =>
          import('./features/workspace/pages/registrations/registrations').then(
            (r) => r.Registrations,
          ),
      },
      {
        path: 'resources',
        loadComponent: () =>
          import('./features/workspace/pages/resources/resources').then((r) => r.Resources),
      },
      {
        path: 'automations',
        loadComponent: () =>
          import('./features/workspace/pages/automations/automations').then((a) => a.Automations),
      },
    ],
  },

  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
    children: [
      {
        path: '',
        redirectTo: 'preference',
        pathMatch: 'full',
      },
      ...generateSettingRoutes(),
    ],
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
