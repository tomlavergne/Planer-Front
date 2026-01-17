/***** Import Angular *****/
import { Component, inject } from '@angular/core';

/***** Import de composants *****/
import { Flex, Grid, Button, Text } from '../../../../../shared/components';

/***** Import de types et services *****/
import type { Icon as IconType } from '../../../../../shared/components/display/icon/icon.type';
import type { PrimaryColor, NeutralColor } from '../../../../../shared/types';
import { ThemeService, type Theme, type Radius } from '../../../../../shared/config/theme.service';

@Component({
  selector: 'app-theme-configurator',
  imports: [Flex, Button, Text, Grid],
  templateUrl: './theme-configurator.html',
  styleUrl: './theme-configurator.scss',
})
export class ThemeConfigurator {
  // Injection du service de thème
  themeService = inject(ThemeService);

  // Liste des thèmes disponibles
  primaries: PrimaryColor[] = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'black',
  ];

  neutrals: NeutralColor[] = ['gray', 'slate', 'zinc', 'neutral', 'stone'];

  themes: { name: Theme; icon: IconType.Name }[] = [
    { name: 'light', icon: 'lucideSun' },
    { name: 'dark', icon: 'lucideMoon' },
    { name: 'auto', icon: 'lucideMonitorSmartphone' },
  ];

  radiusOptions: Radius[] = ['none', 'sm', 'md', 'lg', 'xl'];

  // Change le thème courant
  setPrimary(primary: PrimaryColor): void {
    this.themeService.setPrimary(primary);
  }

  // Change le neutre courant
  setNeutral(neutral: NeutralColor): void {
    this.themeService.setNeutral(neutral);
  }

  // Change le thème courant
  setTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }

  // Change le radius courant
  setRadius(radius: Radius): void {
    this.themeService.setRadius(radius);
  }

  // Toggle le thème
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
