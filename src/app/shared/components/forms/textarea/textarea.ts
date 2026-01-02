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
  AfterViewInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de types *****/
import { Size } from '../../../types';

@Component({
  selector: 'app-textarea',
  imports: [FormsModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Textarea implements AfterViewInit {
  /***** Inputs *****/
  placeholder = input<string>('');
  rows = input<number>(3);
  maxLength = input<number | null>(null);
  size = input<Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  readonly = input<boolean, any>(false, { transform: booleanAttribute });
  error = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(true, { transform: booleanAttribute });
  autoResize = input<boolean, any>(false, { transform: booleanAttribute });

  /***** Model (two-way binding) *****/
  value = model<string>('');

  /***** Outputs *****/
  valueChange = output<string>();
  focused = output<void>();
  blurred = output<void>();

  /***** ViewChild *****/
  textareaElement = viewChild<ElementRef<HTMLTextAreaElement>>('textareaElement');

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      this.fullWidth() ? 'full-width' : '',
      this.error() ? 'error' : '',
      this.disabled() ? 'disabled' : '',
    ].join(' ');
  });

  // Computed pour le nombre de caractères
  characterCount = computed(() => {
    return this.value().length;
  });

  constructor() {
    effect(() => {
      if (this.autoResize() && this.textareaElement()) {
        this.adjustHeight();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.autoResize()) {
      this.adjustHeight();
    }
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
    this.valueChange.emit(target.value);

    if (this.autoResize()) {
      this.adjustHeight();
    }
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }

  private adjustHeight(): void {
    const element = this.textareaElement()?.nativeElement;
    if (element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  }

  focus(): void {
    this.textareaElement()?.nativeElement.focus();
  }
}
