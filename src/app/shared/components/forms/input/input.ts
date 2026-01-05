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
import { Icon } from '../../display/icon/icon';

/***** Imports de types *****/
import { Input as InputType, LucideIconName } from '../../../types';

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
  /***** Inputs *****/
  type = input<InputType.Type>('text');
  placeholder = input<string>('');
  size = input<InputType.Size>('md');
  variant = input<InputType.Variant>('default');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  readonly = input<boolean, any>(false, { transform: booleanAttribute });
  error = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });
  prefixIcon = input<LucideIconName | null>(null);
  suffixIcon = input<LucideIconName | null>(null);

  /***** Model (two-way binding) *****/
  value = model<string>('');

  /***** Outputs *****/
  valueChange = output<string>();
  focused = output<void>();
  blurred = output<void>();

  /***** ViewChild *****/
  inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

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

  // Computed pour la taille de l'icône
  iconSize = computed(() => {
    const sizeMap: Record<InputType.Size, '16' | '20' | '24'> = {
      sm: '16',
      md: '20',
      lg: '24',
    };
    return sizeMap[this.size()];
  });

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
