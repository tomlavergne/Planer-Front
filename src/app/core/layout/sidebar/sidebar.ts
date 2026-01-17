/***** Imports de Angular *****/
import { Component, signal, computed, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/***** Imports de composants *****/
import { Button, Flex, Avatar, Icon, Text, Separator } from '../../../shared/components';
import { ThemeConfigurator } from './children/theme-configurator/theme-configurator';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../shared/directives/tooltip/tooltip';

/***** Import de types *****/
import type { Icon as IconType } from '../../../shared/components/display/icon/icon.type';
import { PopoverDirective } from '../../../shared/directives';

interface NavigationItem {
  label: string;
  iconName: IconType.Name;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    Button,
    Text,
    Avatar,
    Icon,
    Flex,
    TooltipDirective,
    Separator,
    RouterLink,
    ThemeConfigurator,
    RouterLinkActive,
    PopoverDirective,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[class]': 'hostClasses()',
    '[style.width]': 'sidebarWidthStyle()',
  },
})
export class Sidebar {
  // Current theme signal
  currentTheme = signal<string>(document.documentElement.getAttribute('data-theme') || 'light');
  currentNeutral = signal<string>(document.documentElement.getAttribute('data-neutral') || 'gray');
  currentPrimary = signal<string>(document.documentElement.getAttribute('data-primary') || 'blue');

  // Navigation items
  navigationItems: NavigationItem[] = [
    {
      label: 'Accueil',
      iconName: 'lucideHome',
      path: '/home',
    },
    {
      label: 'Calendrier',
      iconName: 'lucideCalendar',
      path: '/calendar',
    },
    {
      label: 'Utilisateurs',
      iconName: 'lucideUsers',
      path: '/users',
    },
    {
      label: 'Ressources',
      iconName: 'lucideBox',
      path: '/ressources',
    },
  ];

  /***************************/
  /***** RESIZING HANDLE *****/
  /***************************/

  // State to track if sidebar is expanded or collapsed
  expanded = signal<boolean>(true);

  // State to track if we are currently resizing
  isResizing = signal<boolean>(false);

  // Sidebar current width in pixels
  sidebarWidth = signal<number>(200);

  // Constants for resizing
  private readonly EXPANDED_MIN_WIDTH = 200; // Minimum width in mode expanded
  private readonly EXPANDED_MAX_WIDTH = 300; // Maximum width in mode expanded
  private readonly COLLAPSE_THRESHOLD = 100; // Width below which we collapse the sidebar
  private readonly EXPAND_THRESHOLD = 150; // Width above which we expand the sidebar
  private hasDragged = false; // Track if user has dragged

  // Tooltip text for resize handle
  resizeHandleTooltip = computed((): string => {
    return this.expanded() ? 'Redimensionner la barre latérale' : 'Élargir la barre latérale';
  });

  // Method called on mousedown on the resize handle
  onResizeStart(event: MouseEvent): void {
    event.preventDefault();
    this.isResizing.set(true);
    this.hasDragged = false; // Reset drag flag
  }

  // Method called on mousemove to resize the sidebar
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isResizing()) return;

    this.hasDragged = true; // Mark that we've dragged

    let newWidth = event.clientX;

    // Check if we should toggle collapsed/expanded state
    if (this.expanded() && newWidth < this.COLLAPSE_THRESHOLD) {
      // Passer en mode collapsed
      this.expanded.set(false);
    } else if (!this.expanded() && newWidth > this.EXPAND_THRESHOLD) {
      // Repasser en mode expanded
      this.expanded.set(true);
      // Clamp width between min and max pour le mode expanded
      newWidth = Math.max(this.EXPANDED_MIN_WIDTH, Math.min(this.EXPANDED_MAX_WIDTH, newWidth));
      this.sidebarWidth.set(newWidth);
    } else if (this.expanded()) {
      // En mode expanded, limiter la largeur
      newWidth = Math.max(this.EXPANDED_MIN_WIDTH, Math.min(this.EXPANDED_MAX_WIDTH, newWidth));
      this.sidebarWidth.set(newWidth);
    }
  }

  // Handle mouse up to stop resizing
  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isResizing()) {
      this.isResizing.set(false);

      // If the user just clicked without dragging, toggle expanded/collapsed
      if (!this.hasDragged) {
        this.expanded.set(!this.expanded());

        // Adjust width if expanding
        if (this.expanded() && this.sidebarWidth() < this.EXPANDED_MIN_WIDTH) {
          this.sidebarWidth.set(this.EXPANDED_MIN_WIDTH);
        }
      }
    }
  }

  /*********************/
  /***** Computeds *****/
  /*********************/

  // Icon name for theme toggle button
  iconNameTheme = computed(() => {
    return this.currentTheme() === 'dark' ? 'lucideSun' : 'lucideMoon';
  });

  // Host element classes
  hostClasses = computed(() => {
    return this.expanded() ? 'expanded' : 'collapsed';
  });

  // Dynamic sidebar width style
  sidebarWidthStyle = computed(() => {
    return this.expanded() ? `${this.sidebarWidth()}px` : 'auto';
  });

  /*******************/
  /***** Methods *****/
  /********************/

  // Toggle app theme
  toggleTheme(): void {
    const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  // Toggle app neutral
  toggleNeutral(): void {
    const neutral = ['gray', 'slate', 'zinc', 'stone', 'neutral'];
    const currentNeutral = document.documentElement.getAttribute('data-neutral') || 'gray';
    const currentIndex = neutral.indexOf(currentNeutral);
    const nextIndex = (currentIndex + 1) % neutral.length;
    const nextNeutral = neutral[nextIndex];
    this.currentNeutral.set(nextNeutral);
    document.documentElement.setAttribute('data-neutral', nextNeutral);
  }

  // Toggle app primary
  togglePrimary(): void {
    const primary = [
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
      'white',
      'gray',
      'black',
    ];
    const currentPrimary = document.documentElement.getAttribute('data-primary') || 'gray';
    const currentIndex = primary.indexOf(currentPrimary);
    const nextIndex = (currentIndex + 1) % primary.length;
    const nextPrimary = primary[nextIndex];
    this.currentPrimary.set(nextPrimary);
    document.documentElement.setAttribute('data-primary', nextPrimary);
  }
}
