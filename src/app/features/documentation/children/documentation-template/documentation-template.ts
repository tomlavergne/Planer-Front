/***** Import Angular *****/
import { Component, input } from '@angular/core';

/***** Import de composants *****/
import { Flex, Text, Card } from '../../../../shared/components';

@Component({
  selector: 'app-documentation-template',
  imports: [Flex, Text, Card],
  templateUrl: './documentation-template.html',
  styleUrl: './documentation-template.scss',
})
export class DocumentationTemplate {
  title = input.required<string>();
}
