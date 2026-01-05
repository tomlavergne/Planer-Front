import { Component, input, output, booleanAttribute } from '@angular/core';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-spacer',
  imports: [],
  templateUrl: './spacer.html',
  styleUrl: './spacer.scss',
  host: {
    '[class]': 'hostClasses()',
    '(click)': 'clicked.emit()',
  },
})
export class Spacer {
  orientation = input<Orientation>('horizontal');
  fullHeight = input<boolean, any>(false, { transform: booleanAttribute });
  fullWidth = input<boolean, any>(false, { transform: booleanAttribute });

  clicked = output<void>();

  hostClasses(): string {
    return [
      `orientation-${this.orientation()}`,
      this.fullHeight() ? 'full-height' : '',
      this.fullWidth() ? 'full-width' : '',
    ].join(' ');
  }
}
