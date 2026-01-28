import { Component, inject } from '@angular/core';

import { Flex, Card, Text, Button } from '@shared/components';
import { DocumentationTemplate } from '@features/documentation/children/documentation-template/documentation-template';

import { ThemeService } from '@shared/config/theme.service';

@Component({
  selector: 'app-theme',
  imports: [Flex, DocumentationTemplate, Card, Text, Button],
  templateUrl: './theme.html',
  styleUrl: './theme.scss',
})
export class Theme {
  themeService = inject(ThemeService);

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
