/***** Import Angular *****/
import { Component, input, signal, inject, computed, booleanAttribute } from '@angular/core';
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
  Tabs,
} from '../../../../shared/components';

/***** Import de directives *****/
import { TooltipDirective } from '../../../../shared/directives/tooltip/tooltip';
import { PopoverDirective } from '../../../../shared/directives';
import { TabPanelDirective } from '../../../../shared/components/navigation/tabs/tab-panel.directive';

/***** Import de services *****/
import {
  DocumentationNavigationService,
  RouteNavigation,
} from '../../documentation-navigation.service';
import { ToastService } from '@shared/components/feedback/toast-stack/toast-stack.service';

/***** Import de types *****/
import type { Table as TableType } from '../../../../shared/components/data/table/table.type';
import { Documentation as DocumentationType } from '@features/documentation/documentation.type';
import type { Tabs as TabsType } from '@shared/components/navigation/tabs/tabs.type';

@Component({
  selector: 'app-documentation-template',
  imports: [
    Flex,
    Text,
    Badge,
    Table,
    TableColumnTemplate,
    Button,
    Tabs,
    Separator,
    RouterLink,
    TooltipDirective,
    PopoverDirective,
    TabPanelDirective,
  ],
  templateUrl: './documentation-template.html',
  styleUrl: './documentation-template.scss',
})
export class DocumentationTemplate {
  toastService = inject(ToastService);

  title = input.required<string>();
  introduction = input<string>();
  selector = input<string>();
  inputs = input<DocumentationType.InputConfig[]>();
  models = input<DocumentationType.ModelConfig[]>();
  outputs = input<DocumentationType.OutputConfig[]>();
  showUsageTab = input<boolean, any>(false, { transform: booleanAttribute });
  showLibraryTab = input<boolean, any>(false, { transform: booleanAttribute });

  hasApiContent = computed(() => {
    return !!(this.inputs() || this.models() || this.outputs());
  });

  allTabs: TabsType.Item[] = [
    {
      id: 'usage',
      label: 'Usage',
    },
    {
      id: 'api',
      label: 'API',
    },
    {
      id: 'library',
      label: 'Library',
    },
  ];

  tabsConfig = computed(() => {
    return this.allTabs.filter((tab) => {
      if (tab.id === 'usage') {
        return this.showUsageTab();
      }
      if (tab.id === 'library') {
        return this.showLibraryTab();
      }
      if (tab.id === 'api') {
        return this.hasApiContent();
      }
      return true;
    });
  });

  inputsColumns: TableType.Column<DocumentationType.InputConfig>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
    { id: 'default', header: 'Défaut', accessor: 'default', sortable: false, width: 100 },
  ];

  modelsColumns: TableType.Column<DocumentationType.ModelConfig>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
    { id: 'default', header: 'Défaut', accessor: 'default', sortable: false, width: 100 },
  ];

  outputsColumns: TableType.Column<DocumentationType.OutputConfig>[] = [
    { id: 'name', header: 'Nom', accessor: 'name', sortable: true, width: 150 },
    { id: 'type', header: 'Type', accessor: 'type', sortable: true, width: 200 },
  ];

  // Structure pour itérer sur les sections API
  apiSections: Array<{
    title: string;
    data: () =>
      | DocumentationType.InputConfig[]
      | DocumentationType.ModelConfig[]
      | DocumentationType.OutputConfig[]
      | undefined;
    columns: TableType.Column<any>[];
    hasDefault: boolean;
  }> = [
    {
      title: 'Inputs',
      data: () => this.inputs(),
      columns: this.inputsColumns,
      hasDefault: true,
    },
    {
      title: 'Models',
      data: () => this.models(),
      columns: this.modelsColumns,
      hasDefault: true,
    },
    {
      title: 'Outputs',
      data: () => this.outputs(),
      columns: this.outputsColumns,
      hasDefault: false,
    },
  ];

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

  /*******************/
  /***** Methods *****/
  /*******************/

  copySelector(): void {
    navigator.clipboard.writeText(this.selector()!);
    this.toastService.secondary(
      `Le sélecteur "${this.selector()}" a été copié dans le presse papier`,
      'Selector Copied',
    );
  }

  //   Type checking methods for template

  isArray(val: unknown): boolean {
    return Array.isArray(val);
  }

  isBoolean(val: unknown): boolean {
    return typeof val === 'boolean';
  }

  isString(val: unknown): boolean {
    return typeof val === 'string';
  }

  isNumber(val: unknown): boolean {
    return typeof val === 'number';
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
    // Capitaliser la première lettre
    return route.charAt(0).toUpperCase() + route.slice(1);
  }
}
