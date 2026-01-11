import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./features/documentation/documentation').then((d) => d.Documentation),
    children: [
      {
        path: 'button',
        loadComponent: () =>
          import('./features/documentation/children/components/form/button-documentation/button-documentation').then(
            (b) => b.ButtonDocumentation,
          ),
      },
      {
        path: 'badge',
        loadComponent: () =>
          import('./features/documentation/children/components/display/badge-documentation/badge-documentation').then(
            (b) => b.BadgeDocumentation,
          ),
      },
      {
        path: 'icon',
        loadComponent: () =>
          import('./features/documentation/children/components/display/icon-documentation/icon-documentation').then(
            (i) => i.IconDocumentation,
          ),
      },
      {
        path: 'text',
        loadComponent: () =>
          import('./features/documentation/children/components/display/text-documentation/text-documentation').then(
            (t) => t.TextDocumentation,
          ),
      },
      {
        path: 'toggle',
        loadComponent: () =>
          import('./features/documentation/children/components/form/toggle-documentation/toggle-documentation').then(
            (t) => t.ToggleDocumentation,
          ),
      },
      {
        path: 'alert',
        loadComponent: () =>
          import('./features/documentation/children/components/feedback/alert-documentation/alert-documentation').then(
            (t) => t.AlertDocumentation,
          ),
      },
      {
        path: 'accordion',
        loadComponent: () =>
          import('./features/documentation/children/components/panel/accordion-documentation/accordion-documentation').then(
            (a) => a.AccordionDocumentation,
          ),
      },
      {
        path: 'ripple',
        loadComponent: () =>
          import('./features/documentation/children/components/design/ripple-documentation/ripple-documentation').then(
            (r) => r.RippleDocumentation,
          ),
      },
      {
        path: 'tooltip',
        loadComponent: () =>
          import('./features/documentation/children/directive/tooltip-documentation/tooltip-documentation').then(
            (t) => t.TooltipDocumentation,
          ),
      },
      {
        path: 'popover',
        loadComponent: () =>
          import('./features/documentation/children/directive/popover-documentation/popover-documentation').then(
            (t) => t.PopoverDocumentation,
          ),
      },
      {
        path: 'flex',
        loadComponent: () =>
          import('./features/documentation/children/components/layout/flex-documentation/flex-documentation').then(
            (f) => f.FlexDocumentation,
          ),
      },
      {
        path: 'grid',
        loadComponent: () =>
          import('./features/documentation/children/components/layout/grid-documentation/grid-documentation').then(
            (g) => g.GridDocumentation,
          ),
      },
      {
        path: 'card',
        loadComponent: () =>
          import('./features/documentation/children/components/panel/card-documentation/card-documentation').then(
            (c) => c.CardDocumentation,
          ),
      },
    ],
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
