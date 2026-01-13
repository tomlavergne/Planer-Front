/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Import de composants *****/
import { DocumentationTemplate } from '../../../../features/documentation/children/documentation-template/documentation-template';
import { Flex, Button } from '../../../components';

/***** Imports de directives *****/
import { TooltipDirective } from '../tooltip';

/***** Imports de types *****/
import type { Tooltip as TooltipType } from '../tooltip.type';

@Component({
  selector: 'app-tooltip-doc',
  imports: [DocumentationTemplate, Flex, Button, TooltipDirective],
  templateUrl: './tooltip.doc.html',
})
export class TooltipDoc {
  positions: TooltipType.Position[] = ['top', 'bottom', 'left', 'right'];
}
