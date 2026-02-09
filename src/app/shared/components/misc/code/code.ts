/***** Imports Angular *****/
import {
  Component,
  input,
  signal,
  effect,
  ElementRef,
  viewChild,
  afterNextRender,
  booleanAttribute,
  computed,
  inject,
} from '@angular/core';

/***** Imports externes *****/
import hljs from 'highlight.js/lib/core';

/***** Import des langages pour la coloration syntaxique *****/
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml'; // pour HTML
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import sql from 'highlight.js/lib/languages/sql';

// Enregistrer les langages
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sql', sql);

/***** Imports de composants *****/
import { Button } from '../../form/button/button';
import { Flex } from '../../layout/flex/flex';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../directives/tooltip/tooltip';

/***** Imports de types *****/
import type { Code as CodeType } from './code.type';

import { ToastService } from '@shared/components/feedback/toast-stack/toast-stack.service';

@Component({
  selector: 'app-code',
  imports: [Button, Flex, TooltipDirective],
  templateUrl: './code.html',
  styleUrl: './code.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Code {
  toastService = inject(ToastService);

  /******************/
  /***** INPUTS *****/
  /******************/

  code = input.required<string>();
  language = input<CodeType.Language>('typescript');
  expandable = input<boolean, any>(false, { transform: booleanAttribute });
  copyable = input<boolean, any>(false, { transform: booleanAttribute });

  // Référence au bloc de code
  codeElement = viewChild<ElementRef<HTMLElement>>('codeBlock');

  /*******************/
  /***** SIGNALS *****/
  /*******************/

  // État d'expansion
  expanded = signal(false);

  // État de la copie
  copied = signal(false);

  constructor() {
    afterNextRender(() => {
      this.highlightCode();
    });

    effect(() => {
      // Réappliquer la coloration si le code ou le langage change
      this.expanded.set(!this.expandable());
      this.highlightCode();
    });
  }

  /*********************/
  /***** COMPUTEDS *****/
  /**********************/

  // Classes de l'hôte
  hostClasses = computed(() => {
    return [this.expandable() ? 'expandable' : '', this.expanded() ? 'expanded' : 'collapsed'].join(
      ' ',
    );
  });

  /*******************/
  /***** METHODS *****/
  /*******************/

  // Copier le code dans le presse-papier
  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      this.toastService.success('Code copié dans le presse-papier !');
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
      this.toastService.danger('Erreur lors de la copie du code.');
    }
  }

  // Basculer l'état d'expansion
  toggleExpansion(): void {
    if (!this.expandable()) return;
    this.expanded.set(!this.expanded());
  }

  // Appliquer la coloration syntaxique
  private highlightCode(): void {
    const element = this.codeElement()?.nativeElement;
    if (element) {
      element.textContent = this.code();
      element.removeAttribute('data-highlighted');
      hljs.highlightElement(element);
    }
  }
}
