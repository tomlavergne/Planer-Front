/***** Import Angular *****/
import { Component } from '@angular/core';

/***** Imports de composants *****/
import { Ripple, Flex, Text } from '../../..';

@Component({
  selector: 'app-ripple-doc',
  imports: [Ripple, Flex, Text],
  templateUrl: './ripple.doc.html',
  styleUrl: './ripple.doc.scss',
})
export class RippleDoc {}
