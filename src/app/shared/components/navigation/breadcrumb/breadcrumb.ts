/***** Import Angular *****/
import { Component } from '@angular/core';

/***** Import de composants *****/
import { Flex } from '../../layout/flex/flex';
import { Button } from '../../form/button/button';

@Component({
  selector: 'app-breadcrumb',
  imports: [Flex, Button],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {}
