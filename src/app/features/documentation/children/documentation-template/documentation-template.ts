/***** Import Angular *****/
import { Component, input, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

/***** Import de composants *****/
import {
  Flex,
  Text,
  Table,
  TableColumnTemplate,
  Button,
  Badge,
  Separator,
} from '../../../../shared/components';

/***** Import de directives *****/
import { TooltipDirective } from '../../../../shared/directives/tooltip/tooltip';
import { PopoverDirective } from '../../../../shared/directives';

/***** Import de confiuration *****/
import { DOCUMENTED_COMPONENTS } from '../../documentation.config';

/***** Import de services *****/
import {
  DocumentationNavigationService,
  RouteNavigation,
} from '../../documentation-navigation.service';

/***** Import de types *****/
import type { Table as TableType } from '../../../../shared/components/data/table/table.type';
import { InputConfig, ModelConfig, OutputConfig } from '../../../../shared/types';

@Component({
  selector: 'app-documentation-template',
  imports: [
    Flex,
    Text,
    Badge,
    Table,
    TableColumnTemplate,
    Button,
    Separator,
    RouterLink,
    TooltipDirective,
    PopoverDirective,
  ],
  templateUrl: './documentation-template.html',
  styleUrl: './documentation-template.scss',
})
export class DocumentationTemplate {
  title = input.required<string>();
  introduction = input<string>();
  inputs = input<InputConfig[]>();
  models = input<ModelConfig[]>();
  outputs = input<OutputConfig[]>();

  inputsColumns: TableType.Column<InputConfig>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
    { id: 'default', header: 'Défaut', accessor: 'default', sortable: false, width: 100 },
  ];

  modelsColumns: TableType.Column<ModelConfig>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
    { id: 'default', header: 'Défaut', accessor: 'default', sortable: false, width: 100 },
  ];

  outputsColumns: TableType.Column<OutputConfig>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
  ];

  codeExample = input<string>();

  formatDefaultValue(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value.toString();
    if (typeof value === 'number') return value.toString();
    if (Array.isArray(value)) return JSON.stringify(value);
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  }

  private navService = inject(DocumentationNavigationService);

  navigation = signal<RouteNavigation>({
    current: null,
    previous: null,
    next: null,
    currentIndex: -1,
    total: 0,
  });

  ngOnInit() {
    // Obtenir la navigation initiale
    this.navigation.set(this.navService.getNavigation());

    // S'abonner aux changements de route
    this.navService.getNavigationChanges().subscribe((nav) => {
      this.navigation.set(nav);
    });
  }

  goToPrevious() {
    this.navService.navigateToPrevious();
  }

  goToNext() {
    this.navService.navigateToNext();
  }

  getRouteName(route: string): string {
    if (!route) return '';
    console.log('route', route);
    // Capitaliser la première lettre
    return route.charAt(0).toUpperCase() + route.slice(1);
  }
}
