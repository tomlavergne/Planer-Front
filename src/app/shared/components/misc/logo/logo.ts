/***** Imports de Angular *****/
import { Component, input, computed, booleanAttribute } from '@angular/core';

/***** Imports de composants *****/
import { Flex, Shape, Text } from '@shared/components';

/***** Imports de types *****/
import { Logo as LogoType } from './logo.type';

/***** Imports de configuration *****/
import { LOGO_SIZES_CONFIG } from './logo.config';

@Component({
  selector: 'app-logo',
  imports: [Flex, Shape, Text],
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
})
export class Logo {
  showText = input<boolean, any>(false, { transform: booleanAttribute });
  size = input<LogoType.Size>('md');

  currentConfig = computed(() => LOGO_SIZES_CONFIG[this.size() as keyof typeof LOGO_SIZES_CONFIG]);
}
