/***** Imports Angular *****/
import { Component, input } from '@angular/core';

/***** Import de composants *****/
import { Flex, Button, Text, Card, Separator } from '@shared/components';

@Component({
  selector: 'app-setting-template',
  imports: [Flex, Button, Text, Card, Separator],
  templateUrl: './setting-template.html',
  styleUrl: './setting-template.scss',
})
export class SettingTemplate {
  title = input<string>('');
  description = input<string>('');
}
