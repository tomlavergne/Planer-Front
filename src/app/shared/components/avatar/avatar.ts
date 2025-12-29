/***** Imports de Angular *****/
import { Component, input } from '@angular/core';

/***** Imports de composants *****/
import { Icon } from '../icon/icon';

/***** Imports de types *****/
import { Size } from '../../types/common.types';

@Component({
  selector: 'app-avatar',
  imports: [Icon],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  size = input<Size>('md');
  imageUrl = input<string | null>(null);
}
