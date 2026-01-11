/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Import de composants *****/
import { DocumentationTemplate } from '../../documentation-template/documentation-template';
import { Flex, Button } from '../../../../../shared/components';

/***** Imports de directives *****/
import { PopoverDirective } from '../../../../../shared/directives/popover/popover';

/***** Imports de types *****/
import type { Popover as PopoverType } from '../../../../../shared/directives/popover/popover.type';

@Component({
  selector: 'app-popover-documentation',
  imports: [DocumentationTemplate, Flex, Button, PopoverDirective],
  templateUrl: './popover-documentation.html',
  styleUrl: './popover-documentation.scss',
})
export class PopoverDocumentation {
  positions: PopoverType.Position[] = [
    'top',
    'top-right',
    'top-left',
    'bottom',
    'bottom-right',
    'bottom-left',
    'left',
    'left-top',
    'left-bottom',
    'right',
    'right-top',
    'right-bottom',
  ];
}
