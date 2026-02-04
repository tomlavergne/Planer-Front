/***** Import Angular *****/
import { Component, input } from '@angular/core';

/***** Import de composants *****/
import { Card, Flex, Text } from '@shared/components';

/***** Import de types *****/
import type {} from '@shared/types/';

@Component({
  selector: 'app-setting-group',
  imports: [Card, Flex, Text],
  templateUrl: './setting-group.html',
  styleUrl: './setting-group.scss',
})
export class SettingGroup {
  title = input.required<string>();
  description = input<string | null>(null);
}
