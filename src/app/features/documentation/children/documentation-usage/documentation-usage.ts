/***** Import Angular *****/
import { Component, input } from '@angular/core';

/***** Import de composants *****/
import { Flex, Text } from '@shared/components';
import { DocumentationExemple } from '../documentation-exemple/documentation-exemple';

@Component({
  selector: 'app-documentation-usage',
  imports: [Flex, Text, DocumentationExemple],
  templateUrl: './documentation-usage.html',
  styleUrl: './documentation-usage.scss',
})
export class DocumentationUsage {
  title = input.required<string>();
  description = input<string>();
  codeExample = input<string>();
}
