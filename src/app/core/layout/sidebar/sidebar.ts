/***** Imports de Angular *****/
import { Component, signal, computed, ViewChild, TemplateRef } from '@angular/core';

/***** Imports de composants *****/
import {
  Button,
  Accordion,
  Popover,
  Flex,
  Avatar,
  Icon,
  Spacer,
  Text,
  Separator,
} from '../../../shared/components';
import { SidebarItem } from './sidebar-item/sidebar-item';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../shared/directives/tooltip/tooltip';
import { PopoverDirective } from '../../../shared/directives/popover/popover';

@Component({
  selector: 'app-sidebar',
  imports: [
    Accordion,
    Button,
    Text,
    SidebarItem,
    Avatar,
    Icon,
    Flex,
    TooltipDirective,
    PopoverDirective,
    Spacer,
    Separator,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Sidebar {
  /***** ViewChild *****/
  @ViewChild('userMenuTemplate', { static: false }) userMenuTemplate?: TemplateRef<any>;

  /***** Signals *****/
  expanded = signal<boolean>(true);
  isHoveringLogo = signal<boolean>(false);
  currentTheme = signal<string>(document.documentElement.getAttribute('data-theme') || 'light');

  /***** Computed *****/
  iconNameTheme = computed(() => {
    return this.currentTheme() === 'dark' ? 'lucideSun' : 'lucideMoon';
  });

  hostClasses = computed(() => {
    return this.expanded() ? 'expanded' : 'collapsed';
  });

  /***** Methods *****/
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  notify() {
    console.log('Spacer clicked!');
    // Ou utilisez votre système de notification
    // this.toaster.show('Spacer cliqué', 'info');
  }

  constructor() {
    console.log('Sidebar initialized with PopoverDirective');
  }
}
