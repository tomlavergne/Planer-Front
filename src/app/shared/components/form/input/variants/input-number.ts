/***** Imports de Angular *****/
import {
  Component,
  input,
  booleanAttribute,
  computed,
  viewChild,
  model,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de composants *****/
import { Input } from '../input';

/***** Imports de types *****/
import { Input as InputType } from '../input.type';

/***** Import de methodes *****/
import { numberFilter, integerFilter } from '../input.methods';

@Component({
  selector: 'app-input-number',
  imports: [FormsModule, Input],
  template: `<app-input
    #inputControl
    [(value)]="value"
    [(errorMessage)]="errorMessage"
    [placeholder]="placeholder() || 'Entrez un nombre'"
    [disabled]="disabled()"
    [readonly]="readonly()"
    [required]="required()"
    [fullWidth]="fullWidth()"
    [size]="size()"
    [variant]="variant()"
    [name]="name()"
    [id]="id()"
    [hint]="hint()"
    [disableValidation]="disableValidation()"
    [validator]="validateValue"
    [actions]="showControls() ? actions() : null"
    [filter]="numberFilter"
    (focused)="focused.emit()"
    (blurred)="blurred.emit()"
  />`,
})
export class InputNumber {
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
  disableValidation = input<boolean, any>(false, { transform: booleanAttribute });

  // Configuration spécifique au number
  showControls = input<boolean, any>(false, { transform: booleanAttribute });
  onlyPositive = input<boolean, any>(false, { transform: booleanAttribute });

  // Models pour two-way binding
  value = model<InputType.Value>('');
  errorMessage = model<string | null>(null);

  // Outputs
  focused = output<void>();
  blurred = output<void>();

  /** Référence à l'input sous-jacent */
  inputControl = viewChild.required<Input>('inputControl');

  // Filtre qui ne garde que les chiffres et le signe négatif
  numberFilter: InputType.FilterFn = this.onlyPositive() ? numberFilter : integerFilter;

  actions = computed<InputType.Action[]>(() => [
    {
      icon: 'lucideMinus',
      callback: () => this.decreaseValue(),
      disabled: this.onlyPositive() && Number(this.value()) <= 0,
      tooltip: 'Retirer un nombre',
    },
    {
      icon: 'lucidePlus',
      callback: () => this.increaseValue(),
      tooltip: 'Ajouter un nombre',
    },
  ]);

  increaseValue() {
    this.value.set(Number(this.value()) + 1);
  }

  decreaseValue() {
    this.value.set(Number(this.value()) - 1);
  }

  validateValue: InputType.ValidatorFn = (value: InputType.Value) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return 'Veuillez entrer un nombre valide';
    }
    return null;
  };

  /** Donne le focus à l'input sous-jacent */
  focus(): void {
    this.inputControl().focus();
  }
}
