/***** Imports de Angular *****/
import {
  Component,
  input,
  output,
  computed,
  booleanAttribute,
  model,
  ElementRef,
  viewChild,
  effect,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de composants *****/
import { Flex, Icon, Button, Text } from '../..';

/***** Import de directives *****/
import { TooltipDirective } from '@shared/directives';

/***** Imports de types *****/
import { Input as InputType } from './input.type';
import type { Icon as IconType } from '../../display/icon/icon.type';

@Component({
  selector: 'app-input',
  imports: [FormsModule, Flex, Icon, Button, Text, TooltipDirective],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'focus()',
  },
})
export class Input {
  /***** INPUTS *****/

  placeholder = input<string>('');
  size = input<InputType.Size>('md');
  variant = input<InputType.Variant>('soft');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  readonly = input<boolean, any>(false, { transform: booleanAttribute });
  error = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  actions = input<InputType.Action[] | null>(null);
  filter = input<InputType.FilterFn | null>(null);
  validator = input<InputType.ValidatorFn | null>(null);

  icon = input<IconType.Name | null>(null);

  /***** MODELS *****/

  value = model<InputType.Value>('');

  /***** OUTPUTS *****/

  valueChange = output<string>();
  focused = output<void>();
  blurred = output<void>();

  /***** SIGNALS *****/

  isFocused = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  /***** ViewChild *****/
  inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  /*********************/
  /***** COMPUTEDS *****/
  /*********************/

  // Computed pour les classes
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

  /*******************/
  /***** Methods *****/
  /*******************/

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
    this.validate();

    this.value.set(newValue);
    this.valueChange.emit(newValue);
  }

  onFocus(): void {
    this.isFocused.set(true);
    this.focused.emit();
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.validate();
    this.blurred.emit();
  }

  validate(): void {
    const validatorFn = this.validator();
    if (validatorFn) {
      const error = validatorFn(this.value());
      this.errorMessage.set(error);
    } else {
      this.errorMessage.set(null);
    }
  }

  focus(): void {
    this.inputElement()?.nativeElement.focus();
  }
}
