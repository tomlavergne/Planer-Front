/***** Imports de types *****/
import type { Routing } from '@shared/types/routing.type';

export const SETTING_ROUTES: Routing.Index = [
  {
    name: 'General',
    path: 'general',
    importPath: '../../shared/components/layout/flex/doc/flex.doc',
    loadComponent: () =>
      import('../../shared/components/layout/flex/doc/flex.doc').then((f) => f.FlexDoc),
    content: [
      {
        name: 'Apparance',
        icon: 'lucideBrush',
        path: 'appearance',
        importPath: './pages/general/appearance/appearance',
        loadComponent: () =>
          import('./pages/general/appearance/appearance').then((a) => a.Appearance),
      },
      {
        name: 'Profil',
        icon: 'lucideUserCircle',
        path: 'appearance',
        importPath: './pages/general/appearance/appearance',
        loadComponent: () =>
          import('./pages/general/appearance/appearance').then((a) => a.Appearance),
      },
    ],
  },
];

/**
 * Génère automatiquement les routes de documentation
 * à partir de la configuration des composants
 */
export function generateSettingRoutes(): any {
  const routes: any[] = [];

  // Aplatir toutes les sections pour créer des routes plates
  SETTING_ROUTES.forEach((item: Routing.Item) => {
    if (item.content) {
      item.content.forEach((item: Routing.Item) => {
        routes.push({
          path: item.path,
          loadComponent: item.loadComponent,
        });
      });
    } else {
      routes.push({
        path: item.path,
        loadComponent: item.loadComponent,
      });
    }
  });

  return routes;
}
