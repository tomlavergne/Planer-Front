/***** Imports de Angular *****/
import {
  Component,
  input,
  computed,
  booleanAttribute,
  signal,
  viewChild,
  model,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de composants *****/
import { Input } from '../input';

/***** Imports de types *****/
import { Input as InputType } from '../input.type';

@Component({
  selector: 'app-input-password',
  imports: [FormsModule, Input],
  template: `<app-input
    #inputControl
    [(value)]="value"
    [(errorMessage)]="errorMessage"
    icon="lucideLock"
    [placeholder]="placeholder() || 'Mot de passe'"
    [disabled]="disabled()"
    [readonly]="readonly()"
    [required]="required()"
    [fullWidth]="fullWidth()"
    [size]="size()"
    [variant]="variant()"
    [type]="showPassword() ? 'text' : 'password'"
    [name]="name()"
    [id]="id()"
    [hint]="hint()"
    [filter]="filter()"
    [disableValidation]="disableValidation()"
    [validator]="customValidator() || defaultValidator"
    [actions]="actions()"
    (focused)="focused.emit()"
    (blurred)="blurred.emit()"
  />`,
})
export class InputPassword {
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

  // Configuration spécifique au password
  minLength = input<number>(8);
  requireUppercase = input<boolean, any>(false, { transform: booleanAttribute });
  requireLowercase = input<boolean, any>(false, { transform: booleanAttribute });
  requireNumber = input<boolean, any>(false, { transform: booleanAttribute });
  requireSpecialChar = input<boolean, any>(false, { transform: booleanAttribute });

  // Models pour two-way binding
  value = model<InputType.Value>('');
  errorMessage = model<string | null>(null);

  // Outputs
  focused = output<void>();
  blurred = output<void>();

  showPassword = signal<boolean>(false);

  /** Référence à l'input sous-jacent */
  inputControl = viewChild.required<Input>('inputControl');

  actions = computed<InputType.Action[]>(() => [
    {
      icon: this.showPassword() ? 'lucideEyeOff' : 'lucideEye',
      callback: () => this.togglePassword(),
      tooltip: this.showPassword() ? 'Masquer le mot de passe' : 'Afficher le mot de passe',
    },
  ]);

  togglePassword(): void {
    this.showPassword.set(!this.showPassword());
  }

  /** Validation par défaut pour les mots de passe */
  defaultValidator: InputType.ValidatorFn = (value: InputType.Value) => {
    const password = String(value).trim();

    if (!password) {
      return 'Le mot de passe est requis';
    }

    if (password.length < this.minLength()) {
      return `Le mot de passe doit contenir au moins ${this.minLength()} caractères`;
    }

    if (this.requireUppercase() && !/[A-Z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une majuscule';
    }

    if (this.requireLowercase() && !/[a-z]/.test(password)) {
      return 'Le mot de passe doit contenir au moins une minuscule';
    }

    if (this.requireNumber() && !/[0-9]/.test(password)) {
      return 'Le mot de passe doit contenir au moins un chiffre';
    }

    if (this.requireSpecialChar() && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Le mot de passe doit contenir au moins un caractère spécial';
    }

    return null;
  };

  /** Donne le focus à l'input sous-jacent */
  focus(): void {
    this.inputControl().focus();
  }
}
