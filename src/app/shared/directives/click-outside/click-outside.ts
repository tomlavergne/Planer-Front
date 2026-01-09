import {
  Directive,
  ElementRef,
  output,
  inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective implements OnInit, OnDestroy {
  excludeSelector = input<string>(''); // Sélecteur CSS pour exclure certains éléments
  clickOutside = output<void>();

  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private clickListener?: (event: MouseEvent) => void;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Utiliser setTimeout pour éviter que le clic qui a ouvert le menu ne le ferme immédiatement
      setTimeout(() => {
        this.clickListener = (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          const clickedInside = this.elementRef.nativeElement.contains(target);

          // Vérifier si le clic est sur un élément exclu (comme un sous-menu)
          const clickedOnExcluded =
            this.excludeSelector() && target.closest(this.excludeSelector());

          if (!clickedInside && !clickedOnExcluded) {
            this.clickOutside.emit();
          }
        };
        document.addEventListener('click', this.clickListener, true);
      }, 0);
    }
  }

  ngOnDestroy(): void {
    if (this.clickListener && isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.clickListener, true);
    }
  }
}
