/***** Imports Angular *****/
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/***** Imports de composants *****/
import { Sidebar } from './core/layout/sidebar/sidebar';
import { Flex } from './shared/components';

@Component({
  selector: 'app-root',
  imports: [Sidebar, Flex, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('planer-front');
}
