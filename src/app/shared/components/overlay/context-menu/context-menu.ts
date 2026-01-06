/***** Imports de Angular *****/
import {
  Component,
  input,
  output,
  signal,
  computed,
  HostListener,
  HostBinding,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';

/***** Imports de types *****/
import type { Icon as IconType } from '../../display/icon/icon.type';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: IconType.Name;
  disabled?: boolean;
  separator?: boolean;
  submenu?: ContextMenuItem[];
}

@Component({
  selector: 'app-context-menu',
  imports: [CommonModule, Icon],
  templateUrl: './context-menu.html',
  styleUrl: './context-menu.scss',
})
export class ContextMenu {
  /***** Inputs *****/
  items = input.required<ContextMenuItem[]>();

  /***** Signals *****/
  isOpen = signal(false);
  position = signal({ x: 0, y: 0 });

  /***** Host Bindings *****/
  @HostBinding('style.display') get display() {
    return this.isOpen() ? 'block' : 'none';
  }

  @HostBinding('style.left.px') get left() {
    return this.position().x;
  }

  @HostBinding('style.top.px') get top() {
    return this.position().y;
  }

  @HostBinding('attr.role') role = 'menu';

  /***** Outputs *****/
  itemClicked = output<string>();

  private platformId = inject(PLATFORM_ID);

  open(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (isPlatformBrowser(this.platformId)) {
      const x = this.adjustX(event.clientX);
      const y = this.adjustY(event.clientY);

      this.position.set({ x, y });
      this.isOpen.set(true);
    }
  }

  private adjustX(x: number): number {
    if (!isPlatformBrowser(this.platformId)) return x;

    const menuWidth = 220; // Largeur approximative du menu
    const screenWidth = window.innerWidth;

    if (x + menuWidth > screenWidth) {
      return screenWidth - menuWidth - 10;
    }

    return x;
  }

  private adjustY(y: number): number {
    if (!isPlatformBrowser(this.platformId)) return y;

    const menuHeight = 300; // Hauteur approximative du menu
    const screenHeight = window.innerHeight;

    if (y + menuHeight > screenHeight) {
      return screenHeight - menuHeight - 10;
    }

    return y;
  }

  close(): void {
    this.isOpen.set(false);
  }

  onItemClick(item: ContextMenuItem): void {
    if (item.disabled || item.separator) return;

    this.itemClicked.emit(item.id);
    this.close();
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.close();
  }

  @HostListener('document:contextmenu', ['$event'])
  onDocumentContextMenu(event: MouseEvent): void {
    // Laisser le menu natif s'ouvrir en dehors de notre zone
    if (!this.isOpen()) {
      return;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.close();
  }
}
