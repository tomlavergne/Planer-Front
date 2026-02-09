/***** Imports de Angular *****/
import { Component, input, booleanAttribute, viewChild, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de composants *****/
import { Input } from '../input';

/***** Imports de types *****/
import { Input as InputType } from '../input.type';

@Component({
  selector: 'app-input-email',
  imports: [FormsModule, Input],
  template: `<app-input
    #inputControl
    [(value)]="value"
    [(errorMessage)]="errorMessage"
    icon="lucideAtSign"
    [placeholder]="placeholder() || 'Saisissez un email'"
    [disabled]="disabled()"
    [readonly]="readonly()"
    [required]="required()"
    [fullWidth]="fullWidth()"
    [size]="size()"
    [variant]="variant()"
    [name]="name()"
    [id]="id()"
    [hint]="hint()"
    [filter]="filter()"
    [disableValidation]="disableValidation()"
    [validator]="customValidator() || defaultValidator"
    (focused)="focused.emit()"
    (blurred)="blurred.emit()"
  />`,
})
export class InputEmail {
  // Inputs de configuration
  placeholder = input<string>('');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  readonly = input<boolean, any>(false, { transform: booleanAttribute });
  required = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  variant = input<InputType.Variant>('soft');
  size = input<InputType.Size>('md');
  name = input<string>('');
  id = input<string>('');
  hint = input<string | null>(null);
  filter = input<InputType.FilterFn | null>(null);
  disableValidation = input<boolean, any>(false, { transform: booleanAttribute });
  
  /** Validation personnalisée (surcharge la validation par défaut si fournie) */
  customValidator = input<InputType.ValidatorFn | null>(null);

  // Models pour two-way binding
  value = model<InputType.Value>('');
  errorMessage = model<string | null>(null);

  // Outputs
  focused = output<void>();
  blurred = output<void>();

  /** Référence à l'input sous-jacent */
  inputControl = viewChild.required<Input>('inputControl');

  /** Donne le focus à l'input sous-jacent */
  focus(): void {
    this.inputControl().focus();
  }

  /** Validation par défaut pour les emails */
  defaultValidator: InputType.ValidatorFn = (value: string | number) => {
    const email = String(value).trim();

    // Vérifier si l'email est vide
    if (!email) {
      return "L'adresse email est requise";
    }

    // Vérifier la longueur maximale (RFC 5321)
    if (email.length > 254) {
      return "L'adresse email est trop longue (maximum 254 caractères)";
    }

    // Vérifier la présence du @
    if (!email.includes('@')) {
      return "L'adresse email doit contenir un @";
    }

    // Séparer la partie locale et le domaine
    const parts = email.split('@');

    // Vérifier qu'il n'y a qu'un seul @
    if (parts.length !== 2) {
      return "L'adresse email ne doit contenir qu'un seul @";
    }

    const [localPart, domain] = parts;

    // Vérifier la partie locale (avant @)
    if (!localPart) {
      return 'La partie avant le @ ne peut pas être vide';
    }

    if (localPart.length > 64) {
      return 'La partie avant le @ est trop longue (maximum 64 caractères)';
    }

    if (localPart.startsWith('.') || localPart.endsWith('.')) {
      return 'La partie avant le @ ne peut pas commencer ou finir par un point';
    }

    if (localPart.includes('..')) {
      return 'La partie avant le @ ne peut pas contenir deux points consécutifs';
    }

    // Vérifier les caractères valides dans la partie locale
    const localPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
    if (!localPartRegex.test(localPart)) {
      return 'La partie avant le @ contient des caractères non autorisés';
    }

    // Vérifier le domaine (après @)
    if (!domain) {
      return 'Le domaine après le @ ne peut pas être vide';
    }

    if (domain.length > 253) {
      return 'Le domaine est trop long (maximum 253 caractères)';
    }

    // Vérifier qu'il y a au moins un point dans le domaine
    if (!domain.includes('.')) {
      return 'Le domaine doit contenir au moins un point (ex: exemple.com)';
    }

    if (
      domain.startsWith('.') ||
      domain.endsWith('.') ||
      domain.startsWith('-') ||
      domain.endsWith('-')
    ) {
      return 'Le domaine ne peut pas commencer ou finir par un point ou un tiret';
    }

    if (domain.includes('..')) {
      return 'Le domaine ne peut pas contenir deux points consécutifs';
    }

    // Vérifier le format du domaine (lettres, chiffres, tirets et points)
    const domainRegex = /^[a-zA-Z0-9.-]+$/;
    if (!domainRegex.test(domain)) {
      return 'Le domaine contient des caractères non autorisés';
    }

    // Vérifier que chaque segment du domaine est valide
    const domainParts = domain.split('.');
    for (const part of domainParts) {
      if (!part) {
        return 'Le domaine contient un segment vide';
      }
      if (part.length > 63) {
        return 'Un segment du domaine est trop long (maximum 63 caractères)';
      }
      if (part.startsWith('-') || part.endsWith('-')) {
        return 'Les segments du domaine ne peuvent pas commencer ou finir par un tiret';
      }
    }

    // Vérifier que l'extension (dernier segment) est valide
    const extension = domainParts[domainParts.length - 1];
    if (extension.length < 2) {
      return "L'extension du domaine doit contenir au moins 2 caractères";
    }

    if (!/^[a-zA-Z]+$/.test(extension)) {
      return "L'extension du domaine ne doit contenir que des lettres";
    }

    // Validation finale avec regex complète pour être sûr
    const fullEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!fullEmailRegex.test(email)) {
      return "Le format de l'adresse email est invalide";
    }

    return null;
  };
}
