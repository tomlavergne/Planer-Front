/***** Imports de Angular *****/
import { Component, signal, computed } from '@angular/core';

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
} from '../../../shared/components';
import { SidebarItem } from './sidebar-item/sidebar-item';
import { UserPopoverContent } from './user-popover-content/user-popover-content';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../shared/directives/tooltip/tooltip';

@Component({
  selector: 'app-sidebar',
  imports: [
    Accordion,
    Button,
    Text,
    SidebarItem,
    Popover,
    Avatar,
    Icon,
    UserPopoverContent,
    Flex,
    TooltipDirective,
    Spacer,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Sidebar {
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
}
