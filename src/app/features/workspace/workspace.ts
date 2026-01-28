/***** Imports Angular *****/
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/***** Imort de composants *****/
import { WorkspaceSidebar } from './children/workspace-sidebar/workspace-sidebar';
import { Flex } from '../../shared/components';

@Component({
  selector: 'app-workspace',
  imports: [RouterOutlet, WorkspaceSidebar, Flex],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {}
