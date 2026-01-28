/***** Imports Angular *****/
import {
  Component,
  input,
  output,
  signal,
  computed,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

/***** Imports de composants *****/
import { Button, Flex, Separator } from '@shared/components/';

/***** Imports de directives *****/
import { TabPanelDirective } from './tab-panel.directive';

/***** Imports de types *****/
import type { Tabs as TabsType } from './tabs.type';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule, Flex, Button, Separator, TabPanelDirective, NgTemplateOutlet],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Tabs implements AfterContentInit {
  /******************/
  /***** INPUTS *****/
  /******************/

  direction = input<TabsType.Direction>('row');
  tabs = input.required<TabsType.Item[]>();
  defaultTab = input<string | null>(null);

  /*******************/
  /***** SIGNALS *****/
  /*******************/

  activeTab = signal<string | null>(null);

  /***************************/
  /***** CONTENT CHILDREN ****/
  /***************************/

  @ContentChildren(TabPanelDirective) panels!: QueryList<TabPanelDirective>;

  /*******************/
  /***** OUTPUTS *****/
  /*******************/

  tabChange = output<string>();

  ngAfterContentInit(): void {
    // Initialiser l'onglet actif après que le contenu soit disponible
    if (this.defaultTab()) {
      this.activeTab.set(this.defaultTab());
    } else if (this.tabs().length > 0) {
      this.activeTab.set(this.tabs()[0].id);
    }
  }

  /*********************/
  /***** COMPUTEDS *****/
  /*********************/

  hostClasses = computed(() => {});

  /*******************/
  /***** METHODS *****/
  /*******************/

  selectTab(tab: TabsType.Item): void {
    if (tab.disabled) return;
    this.activeTab.set(tab.id);
    this.tabChange.emit(tab.id);
  }

  isActive(tabId: string): boolean {
    return this.activeTab() === tabId;
  }
}
