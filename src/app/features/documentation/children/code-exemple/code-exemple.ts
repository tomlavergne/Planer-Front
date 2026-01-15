/***** Import Angular *****/
import { Component, input } from '@angular/core';

/***** Import de composants *****/
import { Flex, Code } from '../../../../shared/components';

/***** Import de types *****/
import type { Code as CodeType } from '../../../../shared/components/display/code/code.type';

@Component({
  selector: 'app-code-exemple',
  imports: [Flex, Code],
  templateUrl: './code-exemple.html',
  styleUrl: './code-exemple.scss',
})
export class CodeExemple {
  language = input<CodeType.Language>('html');
  code = input<string>();
}
