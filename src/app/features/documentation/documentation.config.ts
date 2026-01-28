/***** Imports de types *****/
import path from 'path';
import { Documentation as DocumentationType } from './documentation.type';

export const DOCUMENTED_COMPONENTS: DocumentationType.Index = [
  {
    name: 'General',
    path: 'general',
    importPath: '../../shared/components/layout/flex/doc/flex.doc',
    loadComponent: () =>
      import('../../shared/components/layout/flex/doc/flex.doc').then((f) => f.FlexDoc),
    content: [
      {
        name: 'Theme',
        path: 'theme',
        importPath: './pages/theme/theme',
        loadComponent: () => import('./pages/theme/theme').then((t) => t.Theme),
      },
      {
        name: 'Colors',
        path: 'colors',
        importPath: './pages/colors/colors',
        loadComponent: () => import('./pages/colors/colors').then((m) => m.Colors),
      },
    ],
  },
  {
    name: 'Layout',
    path: 'layout',
    importPath: '../../shared/components/layout/flex/doc/flex.doc',
    loadComponent: () =>
      import('../../shared/components/layout/flex/doc/flex.doc').then((m) => m.FlexDoc),
    content: [
      {
        name: 'Flex',
        path: 'flex',
        importPath: '../../shared/components/layout/flex/doc/flex.doc',
        loadComponent: () =>
          import('../../shared/components/layout/flex/doc/flex.doc').then((m) => m.FlexDoc),
      },
      {
        name: 'Grid',
        path: 'grid',
        importPath: '../../shared/components/layout/grid/doc/grid.doc',
        loadComponent: () =>
          import('../../shared/components/layout/grid/doc/grid.doc').then((m) => m.GridDoc),
      },
    ],
  },
  {
    name: 'Panel',
    path: 'panel',
    importPath: '../../shared/components/panel/card/doc/card.doc',
    loadComponent: () =>
      import('../../shared/components/panel/card/doc/card.doc').then((m) => m.CardDoc),
    content: [
      {
        name: 'Card',
        path: 'card',
        importPath: '../../shared/components/panel/card/doc/card.doc',
        loadComponent: () =>
          import('../../shared/components/panel/card/doc/card.doc').then((m) => m.CardDoc),
      },
      {
        name: 'Accordion',
        path: 'accordion',
        importPath: '../../shared/components/panel/accordion/doc/accordion.doc',
        loadComponent: () =>
          import('../../shared/components/panel/accordion/doc/accordion.doc').then(
            (m) => m.AccordionDoc,
          ),
      },
    ],
  },
  {
    name: 'Element',
    path: 'element',
    importPath: '../../shared/components/display/text/doc/text.doc',
    loadComponent: () =>
      import('../../shared/components/display/text/doc/text.doc').then((m) => m.TextDoc),
    content: [
      {
        name: 'Shape',
        path: 'shape',
        importPath: '../../shared/components/element/shape/doc/shape.doc',
        loadComponent: () =>
          import('../../shared/components/element/shape/doc/shape.doc').then((m) => m.ShapeDoc),
      },
      {
        name: 'Text',
        path: 'text',
        importPath: '../../shared/components/display/text/doc/text.doc',
        loadComponent: () =>
          import('../../shared/components/display/text/doc/text.doc').then((m) => m.TextDoc),
      },
      {
        name: 'Icon',
        path: 'icon',
        importPath: '../../shared/components/display/icon/doc/icon.doc',
        loadComponent: () =>
          import('../../shared/components/display/icon/doc/icon.doc').then((m) => m.IconDoc),
      },
      {
        name: 'Badge',
        path: 'badge',
        importPath: '../../shared/components/display/badge/doc/badge.doc',
        loadComponent: () =>
          import('../../shared/components/display/badge/doc/badge.doc').then((m) => m.BadgeDoc),
      },
    ],
  },
  {
    name: 'Form',
    path: 'form',
    importPath: '../../shared/components/forms/button/doc/button.doc',
    loadComponent: () =>
      import('../../shared/components/form/button/doc/button.doc').then((m) => m.ButtonDoc),
    content: [
      {
        name: 'Button',
        path: 'button',
        importPath: '../../shared/components/forms/button/doc/button.doc',
        loadComponent: () =>
          import('../../shared/components/form/button/doc/button.doc').then((m) => m.ButtonDoc),
      },
      {
        name: 'ColorPicker',
        path: 'color-picker',
        importPath: '../../shared/components/form/color-picker/doc/color-picker.doc',
        loadComponent: () =>
          import('@shared/components/form/color-picker/doc/color-picker.doc').then(
            (m) => m.ColorPickerDoc,
          ),
      },
      {
        name: 'Toggle',
        path: 'toggle',
        importPath: '../../shared/components/forms/toggle/doc/toggle.doc',
        loadComponent: () =>
          import('../../shared/components/form/toggle/doc/toggle.doc').then((m) => m.ToggleDoc),
      },
    ],
  },
  {
    name: 'Navigation',
    path: 'navigation',
    importPath: '../../shared/components/forms/button/doc/button.doc',
    loadComponent: () =>
      import('../../shared/components/form/button/doc/button.doc').then((m) => m.ButtonDoc),
    content: [
      {
        name: 'Tabs',
        path: 'tabs',
        importPath: '../../shared/components/navigation/tabs/doc/tabs.doc',
        loadComponent: () =>
          import('../../shared/components/navigation/tabs/doc/tabs.doc').then((t) => t.TabsDoc),
      },
    ],
  },
  {
    name: 'Feedback',
    path: 'feedback',
    importPath: '../../shared/components/feedback/alert/doc/alert.doc',
    loadComponent: () =>
      import('../../shared/components/feedback/alert/doc/alert.doc').then((m) => m.AlertDoc),
    content: [
      {
        name: 'Alert',
        path: 'alert',
        importPath: '../../shared/components/feedback/alert/doc/alert.doc',
        loadComponent: () =>
          import('../../shared/components/feedback/alert/doc/alert.doc').then((m) => m.AlertDoc),
      },
    ],
  },
];

/**
 * Génère automatiquement les routes de documentation
 * à partir de la configuration des composants
 */
export function generateDocumentationRoutes(): any {
  const routes: any[] = [];

  // Aplatir toutes les sections pour créer des routes plates
  DOCUMENTED_COMPONENTS.forEach((section: DocumentationType.Section) => {
    section.content.forEach((item: DocumentationType.Item) => {
      routes.push({
        path: item.path,
        loadComponent: item.loadComponent,
      });
    });
  });

  return routes;
}
