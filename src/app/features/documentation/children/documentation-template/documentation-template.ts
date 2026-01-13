/***** Import Angular *****/
import { Component, input, signal, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

/***** Import de composants *****/
import { Flex, Text, Card, Table, Button, Separator, Code } from '../../../../shared/components';

/***** Import de directives *****/
import { TooltipDirective } from '../../../../shared/directives/tooltip/tooltip';

/***** Import de services *****/
import {
  DocumentationNavigationService,
  RouteNavigation,
} from '../../documentation-navigation.service';

/***** Import de types *****/
import type { Table as TableType } from '../../../../shared/components/data/table/table.type';

/***** Interfaces pour la documentation *****/
interface InputMetadata {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface OutputMetadata {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-documentation-template',
  imports: [Flex, Text, Card, Table, Button, Separator, Code, RouterLink, TooltipDirective],
  templateUrl: './documentation-template.html',
  styleUrl: './documentation-template.scss',
})
export class DocumentationTemplate {
  title = input.required<string>();
  introduction = input<string>();
  inputs = input<InputMetadata[]>();
  outputs = input<OutputMetadata[]>();

  inputsColumns: TableType.Column<InputMetadata>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
    { id: 'default', header: 'Défaut', accessor: 'default', sortable: false, width: 100 },
    { id: 'description', header: 'Description', accessor: 'description', sortable: false },
  ];

  outputsColumns: TableType.Column<OutputMetadata>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
    { id: 'description', header: 'Description', accessor: 'description', sortable: false },
  ];

  codeExample = input<string>();

  scrollToAPI() {
    console.log('Scrolling to API section');
    const apiSection = document.getElementById('api-section');
    if (apiSection) {
      apiSection.scrollIntoView({ behavior: 'smooth' });
    }
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
    // Capitaliser la première lettre
    return route.charAt(0).toUpperCase() + route.slice(1);
  }
}
