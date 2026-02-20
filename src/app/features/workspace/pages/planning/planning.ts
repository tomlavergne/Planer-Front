/***** Import Angular *****/
import { Component } from '@angular/core';

/***** Import de composants *****/
import { Flex, Button, Text, Select, SegmentedControl } from '@shared/components';

/***** Import de directives *****/
import { PopoverDirective, TooltipDirective } from '@shared/directives';

/***** Import de types *****/
import type { Select as SelectType } from '@shared/components/form/select/select.type';

@Component({
  selector: 'app-planning',
  imports: [Flex, Button, Text, Select, SegmentedControl, PopoverDirective, TooltipDirective],
  templateUrl: './planning.html',
  styleUrl: './planning.scss',
})
export class Planning {
  // Options pour le select de filtrage
  displayModeOptions: SelectType.Option[] = [
    { value: 'day', label: 'Jour' },
    { value: 'day-gant', label: 'Jour - Gantt' },
    { value: 'week', label: 'Semaine' },
    { value: 'month', label: 'Mois' },
  ];
}
