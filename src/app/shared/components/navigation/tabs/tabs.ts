/***** Imports de Angular *****/
import { Component, input, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

type TabOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Tabs {
  /***** Inputs *****/
  tabs = input.required<TabItem[]>();
  defaultTab = input<string | null>(null);
  orientation = input<TabOrientation>('horizontal');

  /***** Signals *****/
  activeTab = signal<string | null>(null);

  /***** Outputs *****/
  tabChange = output<string>();

  constructor() {
    // Initialiser l'onglet actif avec effect pour éviter les erreurs
    setTimeout(() => {
      const defaultId = this.defaultTab();
      if (defaultId) {
        this.activeTab.set(defaultId);
      } else if (this.tabs().length > 0) {
        this.activeTab.set(this.tabs()[0].id);
      }
    });
  }

  // Computed pour les classes
  hostClasses = computed(() => {
    return [`orientation-${this.orientation()}`].join(' ');
  });

  selectTab(tab: TabItem): void {
    if (tab.disabled) return;
    this.activeTab.set(tab.id);
    this.tabChange.emit(tab.id);
  }

  isActive(tabId: string): boolean {
    return this.activeTab() === tabId;
  }
}
