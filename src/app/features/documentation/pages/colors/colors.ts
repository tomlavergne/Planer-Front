/***** Imports Angular *****/
import { Component, inject } from '@angular/core';

/***** Imports de composants *****/
import { Flex, Text, Card, Code, ColorPicker, Slider } from '@shared/components';
import { DocumentationTemplate } from '../../children/documentation-template/documentation-template';
import { ThemeService } from '@shared/config/theme.service';

@Component({
  selector: 'app-colors',
  imports: [Flex, Text, Card, Code, ColorPicker, Slider, DocumentationTemplate],
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
})
export class Colors {
  themeService = inject(ThemeService);

  primaryColors = [
    { name: 'Primary', var: 'primary' },
    { name: 'Primary Hover', var: 'primary-hover' },
    { name: 'Primary Active', var: 'primary-active' },
    { name: 'Primary Light', var: 'primary-light' },
    { name: 'Primary Alpha', var: 'primary-alpha' },
  ];

  backgroundColors = [
    { name: 'Primary', var: 'background-primary' },
    { name: 'Secondary', var: 'background-secondary' },
    { name: 'Tertiary', var: 'background-tertiary' },
  ];

  surfaceColors = [
    { name: 'Surface', var: 'surface' },
    { name: 'Surface Hover', var: 'surface-hover' },
    { name: 'Surface Active', var: 'surface-active' },
  ];

  borderColors = [
    { name: 'Border Light', var: 'border-light' },
    { name: 'Border', var: 'border' },
    { name: 'Border Strong', var: 'border-strong' },
  ];

  textColors = [
    { name: 'Primary', var: 'text-primary' },
    { name: 'Secondary', var: 'text-secondary' },
    { name: 'Tertiary', var: 'text-tertiary' },
    { name: 'Disabled', var: 'text-disabled' },
  ];

  semanticColors = [
    {
      name: 'Success',
      variants: [
        { name: 'Base', var: 'success' },
        { name: 'Light', var: 'success-light' },
        { name: 'Alpha', var: 'success-alpha' },
      ],
    },
    {
      name: 'Warning',
      variants: [
        { name: 'Base', var: 'warning' },
        { name: 'Light', var: 'warning-light' },
        { name: 'Alpha', var: 'warning-alpha' },
      ],
    },
    {
      name: 'Danger',
      variants: [
        { name: 'Base', var: 'danger' },
        { name: 'Light', var: 'danger-light' },
        { name: 'Alpha', var: 'danger-alpha' },
      ],
    },
    {
      name: 'Info',
      variants: [
        { name: 'Base', var: 'info' },
        { name: 'Light', var: 'info-light' },
        { name: 'Alpha', var: 'info-alpha' },
      ],
    },
    {
      name: 'Neutral',
      variants: [
        { name: 'Base', var: 'neutral' },
        { name: 'Light', var: 'neutral-light' },
        { name: 'Alpha', var: 'neutral-alpha' },
      ],
    },
  ];

  shadows = [
    { name: 'Small', var: 'sm' },
    { name: 'Medium', var: 'md' },
    { name: 'Large', var: 'lg' },
    { name: 'Extra Large', var: 'xl' },
  ];

  cssExample = `/* Utiliser les couleurs dans votre CSS */
.my-button {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border: 1px solid var(--color-border);
}

.my-button:hover {
  background-color: var(--color-primary-hover);
}

.my-card {
  background-color: var(--color-surface);
  box-shadow: var(--shadow-md);
}`;

  scssExample = `// Utiliser les mixins SCSS pour des couleurs statiques
@use 'shared/styles/mixins' as *;

.my-component {
  // ✅ Fonctionne : couleur statique
  background-color: #{lighten-color(#3b82f6, 80)};
  
  // ❌ Ne fonctionne pas : CSS variable
  // background-color: #{lighten-color(var(--color-primary), 80)};
  
  // ✅ Utiliser color-mix() directement pour les variables
  background-color: color-mix(in srgb, var(--color-primary) 20%, var(--color-background) 80%);
}`;

  tsExample = `// Changer les couleurs via le ThemeService
import { ThemeService } from '@shared/config/theme.service';

export class MyComponent {
  constructor(private theme: ThemeService) {}

  changeTheme() {
    // Changer la couleur d'accent
    this.theme.setAccentColor('#10b981');
    
    // Changer le background
    this.theme.setBackgroundColor('#1a1a1a');
    
    // Ajuster le contraste (0-2)
    this.theme.setContrast(1.5);
  }
}`;
}
