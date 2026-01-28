/***** Import Angular *****/
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

/***** Import de composants *****/
import { Flex } from '../../shared/components/layout/flex/flex';
import { SettingsSidebar } from './children/settings-sidebar/settings-sidebar';

@Component({
  selector: 'app-settings',
  imports: [Flex, SettingsSidebar, RouterOutlet],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {}
