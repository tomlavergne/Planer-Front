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

    // Attendre que le template soit rendu dans l'overlay
    setTimeout(() => {
      // Chercher directement dans le DOM de l'overlay CDK
      const overlayContainer = document.querySelector('.cdk-overlay-pane app-flex');
      console.log('Overlay container found:', overlayContainer);

      if (overlayContainer && this.shouldMeasure()) {
        console.log('##### Measuring option dimensions...');
        this.measureOptionDimensions(overlayContainer as HTMLElement);
        this.shouldMeasure.set(false); // Mesurer une seule fois
      }
    }, 100);
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
    const index = this.selectedIndex();
    if (index === -1) return 0; // Pas d'option sélectionnée

    // Utiliser les mesures réelles si disponibles, sinon utiliser des valeurs par défaut
    const optionHeight = this.measuredOptionHeight() ?? 40;
    const gap = this.measuredGap() ?? 8;
    const containerPadding = this.measuredContainerPadding() ?? 8;
    const selectButtonHeight = this.measuredSelectButtonHeight() ?? 40;

    // Calcule l'offset pour que le HAUT de l'option sélectionnée soit aligné avec le HAUT du bouton select
    // - Le popover est positionné à partir du BAS du bouton select (position: 'bottom')
    // - Pour aligner les hauts, on doit remonter de:
    //   1. La hauteur du bouton select lui-même (pour revenir au haut du bouton)
    //   2. Le padding du conteneur
    //   3. La hauteur de toutes les options avant celle sélectionnée
    //   4. Les gaps entre ces options
    // Formule: -(selectButtonHeight + containerPadding + index * (optionHeight + gap))
    const offset = -(selectButtonHeight + containerPadding + index * (optionHeight + gap));
    console.log('Calculated offset:', {
      index,
      selectButtonHeight,
      containerPadding,
      optionHeight,
      gap,
      offset,
    });
    return offset;
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
