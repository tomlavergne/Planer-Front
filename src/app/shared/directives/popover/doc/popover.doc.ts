/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Import de composants *****/
import { DocumentationTemplate } from '../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Button } from '../../../components/';

/***** Imports de directives *****/
import { PopoverDirective } from '../..';

/***** Imports de types *****/
import type { Popover as PopoverType } from '../popover.type';

@Component({
  selector: 'app-popover-doc',
  imports: [DocumentationTemplate, Flex, Button, PopoverDirective],
  templateUrl: './popover.doc.html',
})
export class PopoverDoc {
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
