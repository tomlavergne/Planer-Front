/***** Imports de Angular *****/
import {
  Component,
  input,
  output,
  model,
  computed,
  booleanAttribute,
  viewChild,
  signal,
  ElementRef,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Imports de composants *****/
import { Button, Flex, Text, Card, Separator } from '../../';

/***** Imports de types *****/
import { Size } from '../../../types';
import { Select as SelectType } from './select.type';

/***** Import de directive *****/
import { PopoverDirective } from '@shared/directives';

@Component({
  selector: 'app-select',
  imports: [CommonModule, Button, Flex, Text, Card, Separator, PopoverDirective],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Select {
  /***** INPUTS *****/
  options = input<SelectType.Option[]>([]);
  groups = input<SelectType.OptionGroup[]>([]);
  placeholder = input<string>('Sélectionner');
  size = input<Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  error = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  maxVisibleOptions = input<number>(6);

  /***** MODEL *****/
  value = model<string | null>(null);

  /***** OUTPUTS *****/
  valueChange = output<string | null>();

  /***** VIEWCHILD *****/
  popoverDirective = viewChild(PopoverDirective);
  selectButton = viewChild<ElementRef>('selectButton');

  /***** SIGNALS *****/
  private measuredOptionHeight = signal<number | null>(null);
  private measuredGap = signal<number>(0);
  private measuredContainerPadding = signal<number>(0);
  private measuredSelectButtonHeight = signal<number | null>(null);
  private shouldMeasure = signal<boolean>(true);

  /***** METHODS *****/

  onPopoverOpened(): void {
    // Mesurer la hauteur du bouton select
    const selectBtn = this.selectButton();
    if (selectBtn?.nativeElement) {
      const button = selectBtn.nativeElement.querySelector('button');
      if (button) {
        const rect = button.getBoundingClientRect();
        this.measuredSelectButtonHeight.set(rect.height);
      }
    }

    // Utiliser requestAnimationFrame pour un rendu plus fluide
    requestAnimationFrame(() => {
      // Chercher directement dans le DOM de l'overlay CDK
      const overlayContainer = document.querySelector('.cdk-overlay-pane app-flex');

      if (overlayContainer) {
        // Mesurer seulement la première fois
        if (this.shouldMeasure()) {
          this.measureOptionDimensions(overlayContainer as HTMLElement);
          this.shouldMeasure.set(false);
        }

        // Appliquer le scroll immédiatement
        this.scrollToSelectedOption(overlayContainer as HTMLElement);
      }
    });
  }

  private scrollToSelectedOption(container: HTMLElement): void {
    const index = this.selectedIndex();

    // Déterminer l'index à focus : l'option sélectionnée ou la première option si aucune n'est sélectionnée
    const focusIndex = index === -1 ? 0 : index;

    // Appliquer le scroll seulement si une option est sélectionnée
    if (index !== -1) {
      // Utiliser offsetTop pour obtenir la position exacte de l'option dans le conteneur
      const buttons = container.querySelectorAll('app-button');
      if (buttons[index]) {
        const targetButton = buttons[index].querySelector('button');
        if (targetButton) {
          // offsetTop donne la distance depuis le haut du conteneur parent (incluant le padding)
          const offsetTop = (targetButton as HTMLElement).offsetTop;
          // Soustraire le padding pour aligner avec le haut de la zone de contenu visible
          const padding = this.measuredContainerPadding() ?? 0;
          container.scrollTop = offsetTop - padding;
        }
      }
    }

    // Donner le focus à l'option (sélectionnée ou première option)
    const buttons = container.querySelectorAll('app-button');
    if (buttons[focusIndex]) {
      const buttonToFocus = buttons[focusIndex].querySelector('button');
      if (buttonToFocus) {
        // Focus sur l'option pour la navigation clavier
        (buttonToFocus as HTMLElement).focus();
      }
    }
  }

  private measureOptionDimensions(container: HTMLElement): void {
    const buttons = container.querySelectorAll('app-button');

    if (buttons.length > 0) {
      const firstButton = buttons[0].querySelector('button');
      if (firstButton) {
        const rect = firstButton.getBoundingClientRect();

        // Mesurer la hauteur du bouton et l'arrondir pour éviter les imprécisions
        this.measuredOptionHeight.set(Math.round(rect.height));

        // Si on a au moins 2 options, on peut mesurer le gap précisément
        if (buttons.length > 1) {
          const secondButton = buttons[1].querySelector('button');
          if (secondButton) {
            const rect2 = secondButton.getBoundingClientRect();
            // La distance entre le bas de la première option et le haut de la deuxième = le gap
            const gap = rect2.top - rect.bottom;
            this.measuredGap.set(Math.round(gap));
          }
        }
      }
    }

    // Mesurer le padding du conteneur
    const computedStyle = window.getComputedStyle(container);
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    this.measuredContainerPadding.set(Math.round(paddingTop));
  }

  // Computed pour aplatir toutes les options (groupées ou non)
  allOptions = computed(() => {
    const directOptions = this.options();
    const groupedOptions = this.groups().flatMap((g) => g.options);
    return [...directOptions, ...groupedOptions];
  });

  // Computed pour l'option sélectionnée
  selectedOption = computed(() => {
    const val = this.value();
    return this.allOptions().find((opt) => opt.value === val);
  });

  // Computed pour l'index de l'option sélectionnée (dans la liste des boutons uniquement)
  selectedIndex = computed(() => {
    const val = this.value();
    return this.allOptions().findIndex((opt) => opt.value === val);
  });

  // Computed pour l'offset du popover basé sur l'option sélectionnée
  popoverOffset = computed(() => {
    // Le popover doit rester proche du select button
    // On remonte juste de la hauteur du bouton pour l'aligner avec son haut
    // Le scroll interne gérera l'alignement de l'option sélectionnée
    const selectButtonHeight = this.measuredSelectButtonHeight() ?? 40;

    // Offset fixe : on remonte juste de la hauteur du bouton
    return -selectButtonHeight;
  });

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      this.fullWidth() ? 'full-width' : '',
      this.error() ? 'error' : '',
      this.disabled() ? 'disabled' : '',
    ].join(' ');
  });

  selectOption(option: SelectType.Option): void {
    // Fermer le popover après la sélection
    this.popoverDirective()?.close();
    this.value.set(option.value);
    this.valueChange.emit(option.value);
    // Le popover se ferme automatiquement grâce au backdrop click
  }
}
