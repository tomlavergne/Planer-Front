/***** Imports de Angular *****/
import { Directive, input, output, signal, computed, model, booleanAttribute } from '@angular/core';

/***** Imports de types *****/
import type { FormItem } from './form-item.type';

/**
 * Classe abstraite de base pour tous les contrôles de formulaire
 * (Input, Select, Textarea, Checkbox, Toggle, FileDropper, etc.)
 *
 * Fournit :
 * - Les propriétés communes (placeholder, size, disabled, required, etc.)
 * - La gestion d'état (focus, touch, dirty, valid)
 * - La validation
 * - Les méthodes utilitaires (reset, focus, etc.)
 */
@Directive()
export abstract class FormItemBase<T = FormItem.Value> {
  /**********************/
  /***** INPUTS *****/
  /**********************/

  /** Le champ est désactivé (non éditable, grisé) */
  disabled = input<boolean, any>(false, { transform: booleanAttribute });

  /** Le champ est en lecture seule (non éditable mais pas grisé) */
  readonly = input<boolean, any>(false, { transform: booleanAttribute });

  /** Le champ est obligatoire (validation automatique) */
  required = input<boolean, any>(false, { transform: booleanAttribute });

  /** Le champ occupe toute la largeur disponible */
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });

  /** Nom du champ (utile pour les formulaires natifs) */
  name = input<string>('');

  /** ID du champ (utile pour l'accessibilité) */
  id = input<string>('');

  /** Texte d'aide affiché sous le champ */
  hint = input<string | null>(null);

  /** Fonction de validation personnalisée */
  validator = input<FormItem.ValidatorFn<T> | null>(null);

  /** Fonction de filtre pour transformer la valeur */
  filter = input<FormItem.FilterFn | null>(null);

  /** Désactive la validation automatique */
  disableValidation = input<boolean, any>(false, { transform: booleanAttribute });

  /*****************/
  /***** MODELS *****/
  /*****************/

  /** Valeur actuelle du contrôle (two-way binding) */
  value = model<T>(null as T);

  /** Message d'erreur actuel (two-way binding avec FormField) */
  errorMessage = model<string | null>(null);

  /******************/
  /***** OUTPUTS ****/
  /******************/

  /** Émis quand le champ reçoit le focus */
  focused = output<void>();

  /** Émis quand le champ perd le focus */
  blurred = output<void>();

  /** Émis quand la valeur change */
  valueChange = output<T>();

  /******************/
  /***** SIGNALS ****/
  /******************/

  /** Le champ a actuellement le focus */
  isFocused = signal<boolean>(false);

  /** Le champ a été visité (focus puis blur au moins une fois) */
  isTouched = signal<boolean>(false);

  /** La valeur a été modifiée depuis l'initialisation */
  isDirty = signal<boolean>(false);

  /** Valeur initiale (pour détecter les changements) */
  protected initialValue = signal<T>(null as T);

  /********************/
  /***** COMPUTED *****/
  /********************/

  /** Le champ est valide (pas d'erreur) */
  isValid = computed(() => this.errorMessage() === null);

  /** Le champ a une erreur */
  hasError = computed(() => this.errorMessage() !== null);

  /** Le champ est éditable (non disabled et non readonly) */
  isEditable = computed(() => !this.disabled() && !this.readonly());

  /** État complet du contrôle */
  state = computed<FormItem.ControlState>(() => ({
    isTouched: this.isTouched(),
    isFocused: this.isFocused(),
    isDirty: this.isDirty(),
    isValid: this.isValid(),
    errorMessage: this.errorMessage(),
  }));

  /*******************/
  /***** METHODS *****/
  /*******************/

  /**
   * Marque le champ comme visité (touched)
   * Généralement appelé sur blur
   */
  markAsTouched(): void {
    this.isTouched.set(true);
  }

  /**
   * Marque le champ comme non visité
   */
  markAsUntouched(): void {
    this.isTouched.set(false);
  }

  /**
   * Marque le champ comme modifié (dirty)
   */
  markAsDirty(): void {
    this.isDirty.set(true);
  }

  /**
   * Marque le champ comme non modifié (pristine)
   */
  markAsPristine(): void {
    this.isDirty.set(false);
  }

  /**
   * Réinitialise le champ à sa valeur initiale
   * et remet tous les états à false
   */
  reset(): void {
    this.value.set(this.initialValue());
    this.isTouched.set(false);
    this.isDirty.set(false);
    this.isFocused.set(false);
    this.errorMessage.set(null);
  }

  /**
   * Réinitialise le champ avec une nouvelle valeur
   * @param newValue - Nouvelle valeur initiale
   */
  resetWith(newValue: T): void {
    this.initialValue.set(newValue);
    this.value.set(newValue);
    this.markAsPristine();
    this.markAsUntouched();
    this.errorMessage.set(null);
  }

  /**
   * Valide le champ et met à jour errorMessage
   * @returns true si valide, false sinon
   */
  validate(): boolean {
    if (this.disableValidation()) {
      return true;
    }

    // Validation "required"
    if (this.required()) {
      const val = this.value();
      const isEmpty =
        val === null ||
        val === undefined ||
        (typeof val === 'string' && val.trim() === '') ||
        (typeof val === 'number' && isNaN(val));

      if (isEmpty) {
        this.errorMessage.set('Ce champ est obligatoire');
        return false;
      }
    }

    // Validation personnalisée
    const validatorFn = this.validator();
    if (validatorFn) {
      const error = validatorFn(this.value());
      this.errorMessage.set(error);
      return error === null;
    }

    this.errorMessage.set(null);
    return true;
  }

  /**
   * Gère le focus du champ
   * À surcharger dans les classes filles si nécessaire
   */
  onFocus(): void {
    if (this.disabled() || this.readonly()) return;
    this.isFocused.set(true);
    this.focused.emit();
  }

  /**
   * Gère la perte de focus du champ
   * À surcharger dans les classes filles si nécessaire
   */
  onBlur(): void {
    this.isFocused.set(false);
    this.markAsTouched();
    this.validate();
    this.blurred.emit();
  }

  /**
   * Gère le changement de valeur
   * Détecte si le champ est dirty
   * À surcharger dans les classes filles
   */
  protected handleValueChange(newValue: T): void {
    // Détecte si la valeur a changé depuis l'initial
    if (newValue !== this.initialValue()) {
      this.markAsDirty();
    }

    this.value.set(newValue);
    this.valueChange.emit(newValue);

    // Valide en temps réel si déjà touché
    if (this.isTouched()) {
      this.validate();
    }
  }

  /**
   * Méthode abstraite pour donner le focus au contrôle natif
   * Doit être implémentée dans chaque classe fille
   */
  abstract focus(): void;
}
