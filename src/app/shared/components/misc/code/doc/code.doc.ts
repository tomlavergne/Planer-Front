import { Component, input } from '@angular/core';

/***** Imports des composants *****/
import { Flex, Badge, Code, Text, Card } from '../../..';
import { Preview } from '@features/documentation/children/preview/preview';
import { DocumentationTemplate } from '../../../../../features/documentation/children/documentation-template/documentation-template';

// Import de types
import { Documentation as DocumentationType } from '../../../../../features/documentation/documentation.type';

@Component({
  selector: 'app-code-doc',
  imports: [Flex, Badge, DocumentationTemplate, Preview, Text, Code, Card],
  templateUrl: './code.doc.html',
})
export class CodeDoc {
  inputsMetadata: DocumentationType.InputConfig[] = [
    {
      name: 'code',
      default: null as string | null,
      required: true,
      type: 'string',
      description: 'Le code source à afficher',
    },
    {
      name: 'language',
      default: "'typescript'",
      type: 'CodeType.Language',
      description: 'Le langage de programmation du code source pour la coloration syntaxique',
    },
    {
      name: 'expandable',
      default: false,
      type: 'boolean',
      description: 'Indique si le bloc de code peut être développé ou réduit',
    },
    {
      name: 'copyable',
      default: false,
      type: 'boolean',
      description: 'Indique si le bloc de code peut être copié dans le presse-papiers',
    },
  ];

  basicCodeExemple = `<app-code
    [code]="codeString"
    [language]="'typescript'"
    [expandable]="true"
    [copyable]="true"
/>`;

  longCodeExemple = `import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent {
    // Exemple de code long à afficher dans le composant
    exampleMethod(): void {
        console.log('This is a long code example to demonstrate the expandable feature of the app-code component.');
        // Ajoutez plus de lignes de code ici pour simuler un long bloc de code
        for (let i = 0; i < 100; i++) {
            console.log('Line ' + (i + 1));
        }   
    }   
}
`;
}
