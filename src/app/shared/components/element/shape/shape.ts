/***** Import Angular *****/
import { Component, input, computed } from '@angular/core';

/***** Import de types *****/
import type { Shape as ShapeType } from './shape.type';

@Component({
  selector: 'app-shape',
  imports: [],
  templateUrl: './shape.html',
  styleUrl: './shape.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Shape {
  /***** INPUTS *****/
  type = input<ShapeType.Type>('circle');
  size = input<ShapeType.Size>('md');
  color = input<ShapeType.Color>('primary');

  /***** COMPUTED *****/
  hostClasses = computed(() => {
    return [
      `shape--${this.type()}`,
      `shape--size-${this.size()}`,
      `shape--color-${this.color()}`,
    ].join(' ');
  });
}
