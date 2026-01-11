/***** Imports Angular *****/
import { Component } from '@angular/core';

/***** Import de composants *****/
import { DocumentationTemplate } from '../../documentation-template/documentation-template';
import { Flex, Button } from '../../../../../shared/components';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../../../shared/directives/tooltip/tooltip';

/***** Imports de types *****/
import type { Tooltip as TooltipType } from '../../../../../shared/directives/tooltip/tooltip.type';

@Component({
  selector: 'app-tooltip-documentation',
  imports: [DocumentationTemplate, Flex, Button, TooltipDirective],
  templateUrl: './tooltip-documentation.html',
  styleUrl: './tooltip-documentation.scss',
})
export class TooltipDocumentation {
  positions: TooltipType.Position[] = ['top', 'bottom', 'left', 'right'];
}
