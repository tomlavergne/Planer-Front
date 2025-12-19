import { Component, signal } from '@angular/core';
import { Button } from './shared/components/button/button';
import { Icon } from './shared/components/icon/icon';

@Component({
  selector: 'app-root',
  imports: [Button, Icon],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('planer-front');
}
