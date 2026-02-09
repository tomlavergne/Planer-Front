/***** Imports de Angular *****/
import {
  Component,
  input,
  computed,
  booleanAttribute,
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
  selector: 'app-input-search',
  imports: [FormsModule, Input],
  template: `<app-input
    #inputControl
    [(value)]="value"
    [(errorMessage)]="errorMessage"
    icon="lucideSearch"
    [placeholder]="placeholder() || 'Rechercher'"
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
    [validator]="validator()"
    [actions]="actions()"
    (focused)="focused.emit()"
    (blurred)="blurred.emit()"
  />`,
})
export class InputSearch {
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
  validator = input<InputType.ValidatorFn | null>(null);

  // Configuration spécifique au search
  showClearButton = input<boolean, any>(false, { transform: booleanAttribute });

  // Models pour two-way binding
  value = model<InputType.Value>('');
  errorMessage = model<string | null>(null);

  // Outputs
  focused = output<void>();
  blurred = output<void>();

  /** Référence à l'input sous-jacent */
  inputControl = viewChild.required<Input>('inputControl');

  actions = computed<InputType.Action[]>(() => {
    const result: InputType.Action[] = [];

    if (this.showClearButton() && this.value() !== '') {
      result.push({
        icon: 'lucideX',
        callback: () => this.clear(),
        tooltip: 'Effacer la recherche',
      });
    }

    return result;
  });

  clear() {
    this.value.set('');
  }

  /** Donne le focus à l'input sous-jacent */
  focus(): void {
    this.inputControl().focus();
  }
}
