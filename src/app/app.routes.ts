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
          import('./shared/components/forms/button/doc/button.doc').then((b) => b.ButtonDoc),
      },
      {
        path: 'badge',
        loadComponent: () =>
          import('./shared/components/display/badge/doc/badge.doc').then((b) => b.BadgeDoc),
      },
      {
        path: 'icon',
        loadComponent: () =>
          import('./shared/components/display/icon/doc/icon.doc').then((i) => i.IconDoc),
      },
      {
        path: 'text',
        loadComponent: () =>
          import('./shared/components/display/text/doc/text.doc').then((d) => d.TextDoc),
      },
      {
        path: 'toggle',
        loadComponent: () =>
          import('./shared/components/forms/toggle/doc/toggle.doc').then((t) => t.ToggleDoc),
      },
      {
        path: 'alert',
        loadComponent: () =>
          import('./shared/components/feedback/alert/doc/alert.doc').then((a) => a.AlertDoc),
      },
      {
        path: 'accordion',
        loadComponent: () =>
          import('./shared/components/panel/accordion/doc/accordion.doc').then(
            (a) => a.AccordionDoc,
          ),
      },
      {
        path: 'ripple',
        loadComponent: () =>
          import('./shared/components/design/ripple/doc/ripple.doc').then((r) => r.RippleDoc),
      },
      {
        path: 'tooltip',
        loadComponent: () =>
          import('./shared/directives/tooltip/doc/tooltip.doc').then((t) => t.TooltipDoc),
      },
      {
        path: 'popover',
        loadComponent: () =>
          import('./shared/directives/popover/doc/popover.doc').then((p) => p.PopoverDoc),
      },
      {
        path: 'flex',
        loadComponent: () =>
          import('./shared/components/layout/flex/doc/flex.doc').then((f) => f.FlexDoc),
      },
      {
        path: 'grid',
        loadComponent: () =>
          import('./shared/components/layout/grid/doc/grid.doc').then((g) => g.GridDoc),
      },
      {
        path: 'card',
        loadComponent: () =>
          import('./shared/components/panel/card/doc/card.doc').then((c) => c.CardDoc),
      },
      {
        path: 'table',
        loadComponent: () =>
          import('./shared/components/data/table/doc/table.doc').then((t) => t.TableDoc),
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
