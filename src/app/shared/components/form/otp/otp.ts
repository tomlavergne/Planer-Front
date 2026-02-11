/***** Import Angular *****/
import {
  Component,
  input,
  model,
  computed,
  signal,
  viewChildren,
  effect,
  numberAttribute,
  booleanAttribute,
} from '@angular/core';

/***** Import de composants *****/
import { Flex, Input, Icon } from '@shared/components';

/***** Import de classe de base *****/
import { FormItemBase } from '../base/form-item.base';

/***** Imports de types *****/
import { Otp as OtpType } from './otp.type';
import { Input as InputType } from '../input/input.type';

/***** Import de logique *****/
import { numberFilter } from '../input/input.methods';

@Component({
  selector: 'app-otp',
  imports: [Flex, Input, Icon],
  templateUrl: './otp.html',
  styleUrl: './otp.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Otp {
  value = model<string>('');
  length = input<number, any>(6, { transform: numberAttribute });

  values = signal<InputType.Value[]>(Array(this.length()).fill(''));

  /** Index du champ actuellement focus */
  currentIndex = signal<number>(0);
  /** ID aléatoire pour éviter l'autocomplétion Chrome */
  private _randomId = Math.random().toString(36).substring(7);
  /***** VIEW CHILDREN *****/

  /** Référence à tous les inputs */
  inputElements = viewChildren(Input);

  /***** COMPUTEDS *****/

  /** Classes de l'hôte */
  hostClasses = computed(() => {
    return [].join(' ');
  });

  /***** METHODS *****/

  /**
   * Retourne l'ID aléatoire pour les attributs name
   */
  randomId(): string {
    return this._randomId;
  }

  /**
   * Filtre centralisé qui n'accepte que les chiffres (0-9)
   */
  numberOnlyFilter = numberFilter;

  /**
   * Focus un input à l'index spécifié
   * Si l'input a déjà une valeur, sélectionne tout le texte
   * @param index - Index de l'input à focus (0-based)
   */
  focusInput(index: number): void {
    if (index < 0 || index >= this.length()) {
      return;
    }

    const inputs = this.inputElements();
    const targetInput = inputs[index];

    if (targetInput) {
      // Focus l'input
      targetInput.focus();

      // Si l'input a déjà une valeur, sélectionne tout le texte
      // pour que la prochaine saisie l'écrase
      setTimeout(() => {
        if (this.values()[index]) {
          targetInput.selectAll();
        }
      }, 0);

      this.currentIndex.set(index);
    }
  }

  /**
   * Gère le changement de valeur d'un input
   * Écrase la valeur existante et passe à l'input suivant
   */
  onValueChange(index: number, newValue: InputType.Value): void {
    // Convertit en string (au cas où ce serait un number)

    const values = [...this.values()];
    values[index] = newValue;
    this.values.set(values);

    // Met à jour la valeur complète
    this.value.set(values.join(''));

    // Si une valeur a été saisie et qu'il y a un input suivant, le focus
    if (newValue && index < this.length() - 1) {
      this.focusInput(index + 1);
    }
  }

  /**
   * Gère le focus sur un input
   */
  onFocus(index: number): void {
    this.currentIndex.set(index);

    // Si l'input a une valeur, la sélectionner pour que
    // la prochaine saisie l'écrase
    if (this.values()[index]) {
      const inputs = this.inputElements();
      const targetInput = inputs[index];
      if (targetInput) {
        setTimeout(() => targetInput.selectAll(), 0);
      }
    }
  }

  /**
   * Gère les touches clavier (Backspace, flèches)
   */
  onKeyDown(index: number, event: KeyboardEvent): void {
    // Backspace : si le champ est vide, revient au précédent et le vide
    if (event.key === 'Backspace' && !this.values()[index] && index > 0) {
      event.preventDefault();
      const values = [...this.values()];
      values[index - 1] = '';
      this.values.set(values);
      this.value.set(values.join(''));
      this.focusInput(index - 1);
    }

    // Flèche gauche : va à l'input précédent
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusInput(index - 1);
    }

    // Flèche droite : va à l'input suivant
    if (event.key === 'ArrowRight' && index < this.length() - 1) {
      event.preventDefault();
      this.focusInput(index + 1);
    }
  }

  /**
   * Gère le collage de texte
   * Distribue les caractères collés sur les inputs suivants
   */
  onPaste(index: number, event: ClipboardEvent): void {
    event.preventDefault();

    // Récupère le texte collé
    const pastedText = event.clipboardData?.getData('text') || '';

    // Applique le filtre sur le texte collé (garde uniquement les chiffres)
    const filteredText = this.numberOnlyFilter(pastedText);

    if (!filteredText) return;

    // Distribue les caractères sur les inputs à partir de l'index actuel
    const values = [...this.values()];
    const chars = filteredText.split('');

    for (let i = 0; i < chars.length && index + i < this.length(); i++) {
      values[index + i] = chars[i];
    }

    this.values.set(values);
    this.value.set(values.join(''));

    // Focus le dernier input rempli ou le dernier input si tout est rempli
    const nextIndex = Math.min(index + chars.length, this.length() - 1);
    this.focusInput(nextIndex);
  }
}
