/***** Imports Angular *****/
import { Component, signal } from '@angular/core';

/***** Imports de composants *****/
import { Preview, DocumentationTemplate } from '@features/documentation/';
import { Card, Flex, Text } from '@shared/components/';
import { Otp } from '../otp';

/***** Import de types *****/
import type { Documentation as DocumentationType } from '@features/documentation/documentation.type';

/***** Import de variables  *****/
import { DOCUMENTATION_TEMPLATE_CONFIG } from '@features/documentation/children/documentation-template/documentation-template.config';

@Component({
  selector: 'otp-documentation',
  imports: [DocumentationTemplate, Flex, Otp, Text, Card, Preview],
  templateUrl: './otp.doc.html',
})
export class OtpDoc {
  documentationTemplateConfig = DOCUMENTATION_TEMPLATE_CONFIG;

  // Signals pour les exemples
  standardCode = signal<string>('');
  shortCode = signal<string>('');
  alphanumericCode = signal<string>('');
  maskedCode = signal<string>('');

  inputsMetadata: DocumentationType.InputConfig[] = [
    {
      name: 'value',
      default: "''",
      type: 'string',
      description: 'Valeur complète du code (two-way binding)',
    },
    {
      name: 'length',
      default: 6,
      type: 'number',
      description: 'Nombre de champs',
    },
    {
      name: 'separatorIndex',
      default: 3,
      type: 'number | null',
      description: 'Position du séparateur (null = pas de séparateur)',
    },
    {
      name: 'separatorIcon',
      default: 'lucideMinus',
      type: 'IconType.Name',
      description: 'Icône du séparateur',
    },
    {
      name: 'size',
      default: 'md',
      type: "'sm' | 'md' | 'lg'",
      description: 'Taille des inputs',
    },
    {
      name: 'variant',
      default: 'outline',
      type: "'solid' | 'soft' | 'outline'",
      description: 'Style des inputs',
    },
    {
      name: 'numbersOnly',
      default: true,
      type: 'boolean',
      description: 'Accepter uniquement les chiffres',
    },
    {
      name: 'masked',
      default: false,
      type: 'boolean',
      description: 'Masquer les caractères (type password)',
    },
    {
      name: 'disabled',
      default: false,
      type: 'boolean',
      description: 'Désactive le composant',
    },
    {
      name: 'readonly',
      default: false,
      type: 'boolean',
      description: 'Mode lecture seule',
    },
    {
      name: 'required',
      default: false,
      type: 'boolean',
      description: 'Champ obligatoire',
    },
  ];

  outputsMetadata: DocumentationType.OutputConfig[] = [
    {
      name: 'valueChange',
      type: 'string',
      description: 'Émis quand le code change',
    },
    {
      name: 'focused',
      type: 'void',
      description: 'Émis quand un champ reçoit le focus',
    },
    {
      name: 'blurred',
      type: 'void',
      description: 'Émis quand tous les champs perdent le focus',
    },
  ];

  standardExampleCode = `<app-otp 
  [(value)]="standardCode" 
  [length]="6"
  [separatorIndex]="3"
/>

<!-- Valeur: {{ standardCode() }} -->`;

  shortExampleCode = `<app-otp 
  [(value)]="shortCode" 
  [length]="4"
  [separatorIndex]="null"
  size="lg"
/>

<!-- Valeur: {{ shortCode() }} -->`;

  alphanumericExampleCode = `<app-otp 
  [(value)]="alphanumericCode" 
  [length]="8"
  [numbersOnly]="false"
  [separatorIndex]="4"
/>

<!-- Valeur: {{ alphanumericCode() }} -->`;

  maskedExampleCode = `<app-otp 
  [(value)]="maskedCode" 
  [masked]="true"
  [length]="6"
/>

<!-- Valeur: {{ maskedCode() }} -->`;

  sizesExampleCode = `<app-flex direction="column" gap="md">
  <app-otp size="sm" [length]="4" />
  <app-otp size="md" [length]="4" />
  <app-otp size="lg" [length]="4" />
</app-flex>`;

  variantsExampleCode = `<app-flex direction="column" gap="md">
  <app-otp variant="outline" [length]="4" />
  <app-otp variant="soft" [length]="4" />
  <app-otp variant="solid" [length]="4" />
</app-flex>`;
}
