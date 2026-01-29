/***** Imports Angular *****/
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/***** Imports de composants *****/
import { ToastStack } from '@shared/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastStack],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('planer-front');
}
