/***** Import Angular *****/
import { Component, input } from '@angular/core';

/***** Import de composants *****/
import { Card, Flex, Text } from '@shared/components';

/***** Import de types *****/
import type {} from '@shared/types/';

@Component({
  selector: 'app-setting-item',
  imports: [Flex, Text, Card],
  templateUrl: './setting-item.html',
  styleUrl: './setting-item.scss',
})
export class SettingItem {
  title = input.required<string>();
  description = input<string | null>(null);
}
