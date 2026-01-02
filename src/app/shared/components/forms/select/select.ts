/***** Imports de Angular *****/
import {
  Component,
  input,
  output,
  signal,
  effect,
  ElementRef,
  viewChild,
  PLATFORM_ID,
  inject,
  HostListener,
  model,
  computed,
  booleanAttribute,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

/***** Imports de composants *****/
import { Icon } from '../../display/icon/icon';

/***** Imports de types *****/
import { Size } from '../../../types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  imports: [CommonModule, Icon],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Select {
  /***** Inputs *****/
  options = input.required<SelectOption[]>();
  placeholder = input<string>('Sélectionner...');
  size = input<Size>('md');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  error = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });

  /***** Model (two-way binding) *****/
  value = model<string | null>(null);

  /***** Outputs *****/
  valueChange = output<string | null>();

  /***** Signals *****/
  isOpen = signal(false);

  /***** ViewChild *****/
  private trigger = viewChild<ElementRef>('trigger');
  private dropdown = viewChild<ElementRef>('dropdown');

  private platformId = inject(PLATFORM_ID);

  // Computed pour l'option sélectionnée
  selectedOption = computed(() => {
    const val = this.value();
    return this.options().find((opt) => opt.value === val);
  });

  // Computed pour les classes
  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      this.fullWidth() ? 'full-width' : '',
      this.error() ? 'error' : '',
      this.disabled() ? 'disabled' : '',
    ].join(' ');
  });

  toggle(): void {
    if (this.disabled()) return;
    this.isOpen.set(!this.isOpen());
  }

  close(): void {
    this.isOpen.set(false);
  }

  selectOption(option: SelectOption): void {
    if (option.disabled) return;
    this.value.set(option.value);
    this.valueChange.emit(option.value);
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen()) return;

    const triggerEl = this.trigger()?.nativeElement;
    const dropdownEl = this.dropdown()?.nativeElement;

    if (
      triggerEl &&
      !triggerEl.contains(event.target) &&
      dropdownEl &&
      !dropdownEl.contains(event.target)
    ) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen()) {
      this.close();
    }
  }
}
