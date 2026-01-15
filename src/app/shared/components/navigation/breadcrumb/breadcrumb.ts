/***** Import Angular *****/
import { Component } from '@angular/core';

/***** Import de composants *****/
import { Flex, Button } from '../../';

@Component({
  selector: 'app-breadcrumb',
  imports: [Flex, Button],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {}
