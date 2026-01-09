/***** Imports de Angular *****/
import { Component, signal, computed, HostListener, ElementRef, inject } from '@angular/core';

/***** Imports de composants *****/
import {
  Button,
  Accordion,
  Flex,
  Avatar,
  Icon,
  Spacer,
  Text,
  Separator,
} from '../../../shared/components';
import { SidebarItem } from './childrens/sidebar-item/sidebar-item';

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
    '[style.width]': 'sidebarWidthStyle()',
  },
})
export class Sidebar {
  // Current theme signal
  currentTheme = signal<string>(document.documentElement.getAttribute('data-theme') || 'light');

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
    }
  }

  toggleExpanded(): void {
    // Ne toggle que si on n'a pas drag
    if (this.hasDragged) return;

    console.log('#####Toggle sidebar expanded');
    this.expanded.set(!this.expanded());
    // Si on passe en expanded, s'assurer que la largeur est au moins le minimum
    if (this.expanded() && this.sidebarWidth() < this.EXPANDED_MIN_WIDTH) {
      this.sidebarWidth.set(this.EXPANDED_MIN_WIDTH);
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
}
