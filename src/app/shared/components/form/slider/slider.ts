/***** Imports de Angular *****/
import {
  Component,
  input,
  output,
  computed,
  booleanAttribute,
  model,
  numberAttribute,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/***** Imports de types *****/
import { Slider as SliderType } from './slider.type';

@Component({
  selector: 'app-slider',
  imports: [FormsModule],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Slider {
  /******************/
  /***** Inputs *****/
  /******************/

  min = input<number, any>(0, { transform: numberAttribute });
  max = input<number, any>(100, { transform: numberAttribute });
  step = input<number, any>(1, { transform: numberAttribute });
  size = input<SliderType.Size>('md');
  variant = input<SliderType.Variant>('default');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  showValue = input<boolean, any>(true, { transform: booleanAttribute });
  showLabels = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });

  /*****************/
  /***** Model *****/
  /*****************/

  value = model<number>(0);

  /*******************/
  /***** Outputs *****/
  /*******************/

  valueChange = output<number>();

  /*******************/
  /***** Signals *****/
  /*******************/

  isDragging = signal(false);

  /*********************/
  /***** Computeds *****/
  /*********************/

  hostClasses = computed(() => {
    return [
      `size-${this.size()}`,
      `variant-${this.variant()}`,
      this.fullWidth() ? 'full-width' : '',
      this.disabled() ? 'disabled' : '',
      this.isDragging() ? 'dragging' : '',
    ].join(' ');
  });

  percentage = computed(() => {
    const min = this.min();
    const max = this.max();
    const val = this.value();
    return ((val - min) / (max - min)) * 100;
  });

  /*******************/
  /***** Methods *****/
  /*******************/

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const numValue = parseFloat(target.value);
    this.value.set(numValue);
    this.valueChange.emit(numValue);
  }

  onMouseDown(): void {
    if (!this.disabled()) {
      this.isDragging.set(true);
    }
  }

  onMouseUp(): void {
    this.isDragging.set(false);
  }

  onTouchStart(): void {
    if (!this.disabled()) {
      this.isDragging.set(true);
    }
  }

  onTouchEnd(): void {
    this.isDragging.set(false);
  }
}
