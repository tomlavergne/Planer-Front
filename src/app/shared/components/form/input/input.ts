/***** Imports de Angular *****/
import {
  Component,
  input,
  computed,
  booleanAttribute,
  ElementRef,
  viewChild,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de composants *****/
import { Flex, Icon, Button } from '../..';

/***** Import de directives *****/
import { TooltipDirective } from '@shared/directives';

/***** Import de classe de base *****/
import { FormItemBase } from '../base/form-item.base';

/***** Import de configuration *****/
import { INPUT_SIZES_CONFIG } from './input.config';

/***** Imports de types *****/
import { Input as InputType } from './input.type';
import type { Icon as IconType } from '../../misc/icon/icon.type';
import { InputBase } from './base/input.base';

@Component({
  selector: 'app-input',
  imports: [FormsModule, Flex, Icon, Button, TooltipDirective],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'focus()',
  },
})
export class Input extends InputBase {
  /***** PROPRIÉTÉS SPÉCIFIQUES À INPUT *****/

  /** Type de l'input natif (text, password, email, number, etc.) */
  type = input<string>('text');

  /** Icône affichée à gauche de l'input */
  icon = input<IconType.Name | null>(null);

  /** Actions (boutons) affichés à droite de l'input */
  actions = input<InputType.Action[] | null>(null);

  /** Force l'affichage d'une erreur (indépendant de la validation) */
  error = input<boolean, any>(false, { transform: booleanAttribute });

  /***** ViewChild *****/
  inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  /***** CONSTRUCTOR *****/
  constructor() {
    super();
    // Initialise la valeur initiale au chargement
    effect(() => {
      if (this.initialValue() === null) {
        this.initialValue.set(this.value());
      }
    });
  }

  /***** COMPUTEDS *****/

  // Computed pour la configuration actuelle en fonction de la taille
  currentConfig = computed(
    () => INPUT_SIZES_CONFIG[this.size() as keyof typeof INPUT_SIZES_CONFIG],
  );

  // Computed pour les classes host
  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      `variant-${this.variant()}`,
      this.fullWidth() ? 'full-width' : '',
      this.error() || this.errorMessage() ? 'error' : '',
      this.disabled() ? 'disabled' : '',
      this.isFocused() ? 'focused' : '',
    ].join(' ');
  });

  /***** METHODS *****/

  /**
   * Gère l'événement input (saisie utilisateur)
   */
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    let newValue = target.value;

    // Appliquer le filtre si défini
    const filterFn = this.filter();
    if (filterFn) {
      newValue = filterFn(newValue);
      // Mettre à jour l'input HTML si le filtre a modifié la valeur
      if (newValue !== target.value) {
        target.value = newValue;
      }
    }

    // Utilise la méthode de la classe de base
    this.handleValueChange(newValue as InputType.Value);
  }

  /**
   * Donne le focus à l'input natif
   */
  override focus(): void {
    this.inputElement()?.nativeElement.focus();
  }
}
