/***** Imports de Angular *****/
import {
  Component,
  input,
  signal,
  effect,
  ElementRef,
  viewChild,
  PLATFORM_ID,
  inject,
  HostListener,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

/***** Imports de types *****/
import { AdvancedRelativePosition } from '../../../types/common.types';

@Component({
  selector: 'app-popover',
  imports: [CommonModule],
  templateUrl: './popover.html',
  styleUrl: './popover.scss',
})
export class Popover {
  // Inputs
  position = input<AdvancedRelativePosition>('bottom');
  disabled = input<boolean>(false);
  autoPosition = input<boolean>(true);
  closeOnClickOutside = input<boolean>(true);

  // Signals
  isOpen = signal(false);
  finalPosition = signal<AdvancedRelativePosition>(this.position());

  // ViewChild
  private trigger = viewChild<ElementRef>('trigger');
  private popoverElement = viewChild<ElementRef>('popoverElement');

  private platformId = inject(PLATFORM_ID);
  private isAdjusting = false;

  constructor() {
    effect(() => {
      this.finalPosition.set(this.position());
    });

    effect(() => {
      if (
        this.isOpen() &&
        this.autoPosition() &&
        isPlatformBrowser(this.platformId) &&
        !this.isAdjusting
      ) {
        this.isAdjusting = true;
        setTimeout(() => {
          this.adjustPosition();
          this.isAdjusting = false;
        }, 0);
      }
    });
  }

  toggle(): void {
    if (this.disabled()) return;
    this.finalPosition.set(this.position());
    this.isOpen.set(!this.isOpen());
  }

  close(): void {
    this.isOpen.set(false);
    this.isAdjusting = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen() || !this.closeOnClickOutside()) return;

    const triggerEl = this.trigger()?.nativeElement;
    const popoverEl = this.popoverElement()?.nativeElement;

    if (
      triggerEl &&
      !triggerEl.contains(event.target) &&
      popoverEl &&
      !popoverEl.contains(event.target)
    ) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.close();
    }
  }

  private adjustPosition(): void {
    const popover = this.popoverElement()?.nativeElement;
    if (!popover) return;

    const rect = popover.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const requestedPosition = this.position();

    let newPosition: AdvancedRelativePosition = requestedPosition;
    const margin = 8;

    const overflowTop = rect.top < margin;
    const overflowBottom = rect.bottom > viewportHeight - margin;
    const overflowLeft = rect.left < margin;
    const overflowRight = rect.right > viewportWidth - margin;

    // Gérer les positions verticales (top, bottom et leurs variantes)
    if (requestedPosition.startsWith('top')) {
      if (overflowTop) {
        // Basculer vers bottom en conservant l'alignement
        if (requestedPosition === 'top-left') newPosition = 'bottom-left';
        else if (requestedPosition === 'top-right') newPosition = 'bottom-right';
        else newPosition = 'bottom';
      } else if (overflowLeft && requestedPosition !== 'top-right') {
        newPosition = 'top-right';
      } else if (overflowRight && requestedPosition !== 'top-left') {
        newPosition = 'top-left';
      }
    } else if (requestedPosition.startsWith('bottom')) {
      if (overflowBottom) {
        // Basculer vers top en conservant l'alignement
        if (requestedPosition === 'bottom-left') newPosition = 'top-left';
        else if (requestedPosition === 'bottom-right') newPosition = 'top-right';
        else newPosition = 'top';
      } else if (overflowLeft && requestedPosition !== 'bottom-right') {
        newPosition = 'bottom-right';
      } else if (overflowRight && requestedPosition !== 'bottom-left') {
        newPosition = 'bottom-left';
      }
    }
    // Gérer les positions horizontales (left, right et leurs variantes)
    else if (requestedPosition.startsWith('left')) {
      if (overflowLeft) {
        // Basculer vers right en conservant l'alignement
        if (requestedPosition === 'left-top') newPosition = 'right-top';
        else if (requestedPosition === 'left-bottom') newPosition = 'right-bottom';
        else newPosition = 'right';
      } else if (overflowTop && requestedPosition !== 'left-bottom') {
        newPosition = 'left-bottom';
      } else if (overflowBottom && requestedPosition !== 'left-top') {
        newPosition = 'left-top';
      }
    } else if (requestedPosition.startsWith('right')) {
      if (overflowRight) {
        // Basculer vers left en conservant l'alignement
        if (requestedPosition === 'right-top') newPosition = 'left-top';
        else if (requestedPosition === 'right-bottom') newPosition = 'left-bottom';
        else newPosition = 'left';
      } else if (overflowTop && requestedPosition !== 'right-bottom') {
        newPosition = 'right-bottom';
      } else if (overflowBottom && requestedPosition !== 'right-top') {
        newPosition = 'right-top';
      }
    }

    if (newPosition !== this.finalPosition()) {
      this.finalPosition.set(newPosition);
    }
  }
}
