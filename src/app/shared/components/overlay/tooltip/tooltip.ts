/***** Imports de Angular *****/
import {
  Component,
  input,
  signal,
  effect,
  ElementRef,
  viewChild,
  contentChild,
  computed,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Popover } from '../popover/popover';

/***** Imports de types *****/
import { RelativePosition } from '../../../types/common.types';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip {
  // Inputs
  text = input<string | null>(null);
  position = input<RelativePosition>('top');
  delay = input<number>(200);
  disabled = input<boolean>(false);
  autoPosition = input<boolean>(true); // Auto-ajustement si overflow vrai par defaut

  // Signals
  isVisible = signal(false);
  finalPosition = signal<RelativePosition>(this.position());

  // ViewChild
  private trigger = viewChild<ElementRef>('trigger');
  private tooltipElement = viewChild<ElementRef>('tooltipElement');

  // ContentChild - Détecter si un popover est présent
  private popover = contentChild(Popover);

  // Computed - Désactiver automatiquement si le popover est ouvert
  private isDisabled = computed(() => {
    const popoverComponent = this.popover();
    return this.disabled() || (popoverComponent?.isOpen() ?? false);
  });

  private platformId = inject(PLATFORM_ID); // Pour vérifier que le programme s'exécute dans le navigateur
  private timeoutId?: number;
  private isAdjusting = false; // ← Éviter les boucles

  constructor() {
    // Recalculer la position quand le tooltip devient visible
    effect(() => {
      this.finalPosition.set(this.position());
    });

    // Ajuster la position quand le tooltip devient visible
    effect(() => {
      if (
        this.isVisible() &&
        this.autoPosition() &&
        isPlatformBrowser(this.platformId) &&
        !this.isAdjusting // ← Protection contre les boucles
      ) {
        this.isAdjusting = true;
        setTimeout(() => {
          this.adjustPosition();
          this.isAdjusting = false;
        }, 0);
      }
    });
  }

  onMouseEnter(): void {
    if (this.isDisabled()) return;

    // Réinitialiser à la position demandée
    this.finalPosition.set(this.position());

    this.timeoutId = window.setTimeout(() => {
      this.isVisible.set(true);
    }, this.delay());
  }

  onMouseLeave(): void {
    this.clearTimer();
    this.isVisible.set(false);
    this.isAdjusting = false; // Reset
  }

  onFocus(): void {
    if (this.isDisabled()) return;
    this.finalPosition.set(this.position());
    this.isVisible.set(true);
  }

  onBlur(): void {
    this.isVisible.set(false);
    this.isAdjusting = false;
  }

  private clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  /**
   * Ajuste automatiquement la position si le tooltip dépasse de la fenêtre
   */
  private adjustPosition(): void {
    const tooltip = this.tooltipElement()?.nativeElement;
    if (!tooltip) return;

    const rect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const requestedPosition = this.position();

    let newPosition = requestedPosition;
    const margin = 8; // Marge de sécurité

    // Vérifier les dépassements et ajuster
    switch (requestedPosition) {
      case 'top':
        if (rect.top < margin) {
          newPosition = 'bottom'; // Pas assez d'espace en haut
        }
        break;

      case 'bottom':
        if (rect.bottom > viewportHeight - margin) {
          newPosition = 'top'; // Pas assez d'espace en bas
        }
        break;

      case 'left':
        if (rect.left < margin) {
          newPosition = 'right'; // Pas assez d'espace à gauche
        }
        break;

      case 'right':
        if (rect.right > viewportWidth - margin) {
          newPosition = 'left'; // Pas assez d'espace à droite
        }
        break;
    }

    // Vérifier aussi les dépassements horizontaux pour top/bottom
    if (newPosition === 'top' || newPosition === 'bottom') {
      if (rect.left < margin) {
        newPosition = 'right';
      } else if (rect.right > viewportWidth - margin) {
        newPosition = 'left';
      }
    }

    // Ne mettre à jour QUE si différent
    if (newPosition !== this.finalPosition()) {
      this.finalPosition.set(newPosition);
    }
  }
}
