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
        name: 'Préférences',
        icon: 'lucideSettings2',
        path: 'preference',
        importPath: './pages/general/preference/preference',
        loadComponent: () =>
          import('./pages/general/preference/preference').then((p) => p.Preference),
      },
      {
        name: 'Profil',
        icon: 'lucideUser',
        path: 'profile',
        importPath: './pages/general/profile/profile',
        loadComponent: () => import('./pages/general/profile/profile').then((p) => p.Profile),
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
