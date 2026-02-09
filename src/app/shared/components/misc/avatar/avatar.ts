/***** Imports de Angular *****/
import { Component, input } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../icon/icon';

/***** Imports de types *****/
import { Size } from '../../../types';

@Component({
  selector: 'app-avatar',
  imports: [Icon],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Avatar {
  size = input<Size>('md');
  imageUrl = input<string | null>(null);

  hostClasses(): string {
    return `size-${this.size()}`;
  }
}
