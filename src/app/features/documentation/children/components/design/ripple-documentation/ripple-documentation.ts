/***** Import Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { Ripple, Flex, Text } from '../../../../../../shared/components';

@Component({
  selector: 'app-ripple-documentation',
  imports: [Ripple, Flex, Text],
  templateUrl: './ripple-documentation.html',
  styleUrl: './ripple-documentation.scss',
})
export class RippleDocumentation {}
