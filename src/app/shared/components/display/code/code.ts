/***** Imports Angular *****/
import {
  Component,
  input,
  signal,
  effect,
  ElementRef,
  viewChild,
  afterNextRender,
} from '@angular/core';

/***** Imports externes *****/
import hljs from 'highlight.js/lib/core';
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
import { Button, Icon, Flex } from '../../';

/***** Imports de directives *****/
import { TooltipDirective } from '../../../directives/tooltip/tooltip';

/***** Imports de types *****/
import type { Code as CodeType } from './code.type';

@Component({
  selector: 'app-code',
  imports: [Button, Icon, Flex, TooltipDirective],
  templateUrl: './code.html',
  styleUrl: './code.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Code {
  /** Code à afficher */
  code = input.required<string>();

  /** Langage de programmation pour la coloration syntaxique */
  language = input<CodeType.Language>('typescript');

  /** Afficher le bouton copier */
  showCopy = input<boolean>(true);

  /** Afficher le nom du langage */
  showLanguage = input<boolean>(true);

  /** Titre optionnel du bloc de code */
  title = input<string>();

  // Référence au bloc de code
  codeElement = viewChild<ElementRef<HTMLElement>>('codeBlock');

  // État de la copie
  copied = signal(false);

  constructor() {
    afterNextRender(() => {
      this.highlightCode();
    });

    effect(() => {
      // Réappliquer la coloration si le code ou le langage change
      this.code();
      this.language();
      this.highlightCode();
    });
  }

  // Classes de l'hôte
  hostClasses = signal('app-code');

  // Copier le code dans le presse-papier
  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
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

  // Obtenir le label du langage
  getLanguageLabel(): string {
    const labels: Record<CodeType.Language, string> = {
      typescript: 'TypeScript',
      javascript: 'JavaScript',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      json: 'JSON',
      bash: 'Bash',
      shell: 'Shell',
      markdown: 'Markdown',
      python: 'Python',
      java: 'Java',
      sql: 'SQL',
    };
    return labels[this.language()];
  }
}
