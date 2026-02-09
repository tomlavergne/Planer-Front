/***** Imports de Angular *****/
import { Directive, input } from '@angular/core';

/***** Import de classe de base *****/
import { FormItemBase } from '../../base/form-item.base';

/***** Imports de types *****/
import { Input as InputType } from '../input.type';
import type { Icon as IconType } from '../../../misc/icon/icon.type';

/**
 * Classe de base pour les variants d'Input
 * (InputEmail, InputNumber, InputSearch, InputPassword, etc.)
 *
 * Hérite de FormItemBase et ajoute les propriétés spécifiques aux inputs
 */
@Directive()
export abstract class InputBase extends FormItemBase<InputType.Value> {
  /** Icône affichée dans l'input */
  placeholder = input<string>('');
  variant = input<InputType.Variant>('soft');
  size = input<InputType.Size>('md');

  /**
   * Méthode focus abstraite - chaque variant doit l'implémenter
   * Généralement en appelant focus() sur l'Input sous-jacent
   */
  abstract override focus(): void;
}
