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
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de composants *****/
import { Input as InputType } from './input.type';
import { Icon } from '../../display/icon/icon';

/***** Imports de types *****/
import type { Icon as IconType } from '../../display/icon/icon.type';

@Component({
  selector: 'app-input',
  imports: [FormsModule, Icon],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Input {
  /******************/
  /***** Inputs *****/
  /******************/

  type = input<InputType.Type>('text');
  placeholder = input<string>('');
  size = input<InputType.Size>('md');
  variant = input<InputType.Variant>('default');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  readonly = input<boolean, any>(false, { transform: booleanAttribute });
  error = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  prefixIcon = input<IconType.Name | null>(null);
  suffixIcon = input<IconType.Name | null>(null);

  /*****************/
  /***** Model *****/
  /*****************/

  value = model<string>('');

  /*******************/
  /***** Outputs *****/
  /*******************/

  valueChange = output<string>();
  focused = output<void>();
  blurred = output<void>();

  /***** ViewChild *****/
  inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  /*********************/
  /***** Computeds *****/
  /*********************/

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      `variant-${this.variant()}`,
      this.fullWidth() ? 'full-width' : '',
      this.error() ? 'error' : '',
      this.disabled() ? 'disabled' : '',
      this.prefixIcon() ? 'has-prefix' : '',
      this.suffixIcon() ? 'has-suffix' : '',
    ].join(' ');
  });

  /*******************/
  /***** Methods *****/
  /*******************/

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.valueChange.emit(target.value);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }

  focus(): void {
    this.inputElement()?.nativeElement.focus();
  }
}
