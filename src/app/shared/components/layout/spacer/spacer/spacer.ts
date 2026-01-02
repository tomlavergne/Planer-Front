import { Component, input } from '@angular/core';

type Orientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-spacer',
  imports: [],
  templateUrl: './spacer.html',
  styleUrl: './spacer.scss',
})
export class Spacer {
  orientation = input<Orientation>('horizontal');
}
