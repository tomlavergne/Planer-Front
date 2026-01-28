/***** Import Angular *****/
import { Component, input } from '@angular/core';

/***** Import de composants *****/
import { Flex, Code } from '../../../../shared/components';

/***** Import de types *****/
import type { Code as CodeType } from '../../../../shared/components/display/code/code.type';

@Component({
  selector: 'app-documentation-exemple',
  imports: [Flex, Code],
  templateUrl: './documentation-exemple.html',
  styleUrl: './documentation-exemple.scss',
})
export class DocumentationExemple {
  language = input<CodeType.Language>('html');
  code = input<string>();
}
