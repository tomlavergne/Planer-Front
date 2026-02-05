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
import { Button, Flex } from '../../';

/***** Imports de types *****/
import { Size } from '../../../types';

/***** Import de directive *****/
import { PopoverDirective } from '@shared/directives';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  imports: [CommonModule, Button, Flex, PopoverDirective],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Select {
  /***** Inputs *****/
  options = input.required<SelectOption[]>();
  placeholder = input<string>('Sélectionner');
  size = input<Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  error = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  maxVisibleOptions = input<number>(6);

  /***** Model (two-way binding) *****/
  value = model<string | null>(null);

  /***** Outputs *****/
  valueChange = output<string | null>();

  /***** ViewChild *****/
  popoverDirective = viewChild(PopoverDirective);
  selectButton = viewChild<ElementRef>('selectButton');

  /***** Signals *****/
  private measuredOptionHeight = signal<number | null>(null);
  private measuredGap = signal<number>(0);
  private measuredContainerPadding = signal<number>(0);
  private measuredSelectButtonHeight = signal<number | null>(null);
  private shouldMeasure = signal<boolean>(true);

  constructor() {
    console.log('Select component initialized');
  }

  onPopoverOpened(): void {
    console.log('##### Popover opened, attempting to measure...');

    // Mesurer la hauteur du bouton select
    const selectBtn = this.selectButton();
    if (selectBtn?.nativeElement) {
      const button = selectBtn.nativeElement.querySelector('button');
      if (button) {
        const rect = button.getBoundingClientRect();
        this.measuredSelectButtonHeight.set(rect.height);
        console.log('Select button height:', rect.height);
      }
    }

    // Utiliser requestAnimationFrame pour un rendu plus fluide
    requestAnimationFrame(() => {
      // Chercher directement dans le DOM de l'overlay CDK
      const overlayContainer = document.querySelector('.cdk-overlay-pane app-flex');
      console.log('Overlay container found:', overlayContainer);

      if (overlayContainer) {
        // Mesurer seulement la première fois
        if (this.shouldMeasure()) {
          console.log('##### Measuring option dimensions...');
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
    if (index === -1) {
      console.log('No option selected, no scroll needed');
      return;
    }

    const optionHeight = this.measuredOptionHeight() ?? 40;
    const gap = this.measuredGap() ?? 8;

    // Calculer la position de scroll pour que l'option sélectionnée soit en haut du conteneur visible
    // Note: on ne compte PAS le padding car le scroll se fait à partir du contenu, pas du padding
    const scrollPosition = index * (optionHeight + gap);

    console.log('Applying scroll:', {
      index,
      optionHeight,
      gap,
      calculatedScrollPosition: scrollPosition,
      containerHeight: container.clientHeight,
      containerScrollHeight: container.scrollHeight,
    });

    // Appliquer le scroll
    container.scrollTop = scrollPosition;

    // Vérifier que le scroll a bien été appliqué
    console.log('Scroll after application:', {
      scrollTop: container.scrollTop,
      expected: scrollPosition,
    });
  }

  private measureOptionDimensions(container: HTMLElement): void {
    console.log('Measuring dimensions from container:', container);
    const buttons = container.querySelectorAll('app-button');
    console.log('Found buttons:', buttons.length);

    if (buttons.length > 0) {
      const firstButton = buttons[0].querySelector('button');
      if (firstButton) {
        const rect = firstButton.getBoundingClientRect();
        console.log('First button rect:', rect);

        // Mesurer la hauteur du bouton
        this.measuredOptionHeight.set(rect.height);

        // Si on a au moins 2 options, on peut mesurer le gap précisément
        if (buttons.length > 1) {
          const secondButton = buttons[1].querySelector('button');
          if (secondButton) {
            const rect2 = secondButton.getBoundingClientRect();
            // La distance entre le bas de la première option et le haut de la deuxième = le gap
            const gap = rect2.top - rect.bottom;
            console.log('Measured gap:', gap);
            this.measuredGap.set(gap);
          }
        }
      }
    }

    // Mesurer le padding du conteneur
    const computedStyle = window.getComputedStyle(container);
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    console.log('Container padding:', paddingTop);
    this.measuredContainerPadding.set(paddingTop);

    console.log('Final measurements:', {
      optionHeight: this.measuredOptionHeight(),
      gap: this.measuredGap(),
      padding: this.measuredContainerPadding(),
    });
  }

  // Computed pour l'option sélectionnée
  selectedOption = computed(() => {
    const val = this.value();
    return this.options().find((opt) => opt.value === val);
  });

  // Computed pour l'index de l'option sélectionnée
  selectedIndex = computed(() => {
    const val = this.value();
    return this.options().findIndex((opt) => opt.value === val);
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

  selectOption(option: SelectOption): void {
    // Fermer le popover après la sélection
    this.popoverDirective()?.close();
    this.value.set(option.value);
    this.valueChange.emit(option.value);
    // Le popover se ferme automatiquement grâce au backdrop click
  }
}
