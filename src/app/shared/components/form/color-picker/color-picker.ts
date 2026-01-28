/***** Imports de Angular *****/
import {
  Component,
  input,
  output,
  computed,
  booleanAttribute,
  model,
  signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/***** Imports de composants *****/
import { Button, Input, Flex } from '@shared/components';
import { ColorPicker as ColorPickerType } from './color-picker.type';
import { PopoverDirective } from '@shared/directives/popover/popover';

@Component({
  selector: 'app-color-picker',
  imports: [CommonModule, FormsModule, Input, Button, PopoverDirective, Flex],
  templateUrl: './color-picker.html',
  styleUrl: './color-picker.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class ColorPicker {
  /******************/
  /***** Inputs *****/
  /******************/

  variant = input<ColorPickerType.Variant>('default');
  format = input<ColorPickerType.Format>('hex');
  disabled = input<boolean, any>(false, { transform: booleanAttribute });
  placeholder = input<string>('Choisir une couleur');
  presetColors = input<string[]>([
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
  ]);

  /*****************/
  /***** Model *****/
  /*****************/

  value = model<string>('#000000');

  /*******************/
  /***** Outputs *****/
  /*******************/

  valueChange = output<string>();

  /*******************/
  /***** Signals *****/
  /*******************/

  isOpen = signal(false);
  hue = signal(0);
  saturation = signal(100);
  lightness = signal(50);

  /*********************/
  /***** Computeds *****/
  /*********************/

  hostClasses = computed(() => {
    return [`variant-${this.variant()}`, this.disabled() ? 'disabled' : ''].join(' ');
  });

  displayValue = computed(() => {
    const color = this.value();
    if (this.format() === 'hex') {
      return color;
    } else if (this.format() === 'rgb') {
      return this.hexToRgb(color);
    } else if (this.format() === 'hsl') {
      return this.hexToHsl(color);
    }
    return color;
  });

  /*******************/
  /***** Effects *****/
  /*******************/

  constructor() {
    // Sync HSL values when color changes
    effect(() => {
      const color = this.value();
      if (color) {
        const hsl = this.hexToHslValues(color);
        this.hue.set(hsl.h);
        this.saturation.set(hsl.s);
        this.lightness.set(hsl.l);
      }
    });
  }

  /*******************/
  /***** Methods *****/
  /*******************/

  togglePicker(): void {
    if (!this.disabled()) {
      this.isOpen.set(!this.isOpen());
    }
  }

  selectColor(color: string): void {
    this.value.set(color);
    this.valueChange.emit(color);
  }

  onSaturationLightnessChange(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(event.clientY - rect.top, rect.height));

    const saturation = (x / rect.width) * 100;
    const lightness = 100 - (y / rect.height) * 100;

    this.saturation.set(saturation);
    this.lightness.set(lightness);

    this.updateColorFromHsl();
  }

  onHueChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.hue.set(parseInt(target.value));
    this.updateColorFromHsl();
  }

  updateColorFromHsl(): void {
    const hex = this.hslToHex(this.hue(), this.saturation(), this.lightness());
    this.value.set(hex);
    this.valueChange.emit(hex);
  }

  onInputChange(newValue: string): void {
    // Validate and update the color
    if (this.isValidHexColor(newValue)) {
      this.value.set(newValue);
      this.valueChange.emit(newValue);
    }
  }

  /************************************/
  /***** Color Conversion Methods *****/
  /************************************/

  /**
   * Function to validate hex color
   * @param hex - hexadecimal color string
   * @returns boolean indicating if the hex color is valid
   */
  private isValidHexColor(hex: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(hex);
  }

  /**
   * Function to convert hex to rgb
   * @param hex - hexadecimal color string
   * @returns rgb color string
   */
  private hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 'rgb(0, 0, 0)';
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Function to convert hex to hsl
   * @param hex - hexadecimal color string
   * @returns hsl color string
   */
  private hexToHsl(hex: string): string {
    const hsl = this.hexToHslValues(hex);
    return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
  }

  /**
   * Function to convert hex to HSL values
   * @param hex - hexadecimal color string
   * @returns object with h, s, l values
   */
  private hexToHslValues(hex: string): { h: number; s: number; l: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  /**
   * Function to convert HSL to hex
   * @param h - hue value
   * @param s - saturation value
   * @param l - lightness value
   * @returns hexadecimal color string
   */
  private hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }
}
