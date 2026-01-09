/***** Imports Angular *****/
import { Component, HostListener, ElementRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/***** Import de types *****/
import type { Ripple as RippleType } from './ripple.type';

@Component({
  selector: 'app-ripple',
  imports: [CommonModule],
  templateUrl: './ripple.html',
  styleUrl: './ripple.scss',
})
export class Ripple {
  /******************/
  /***** Inputs *****/
  /******************/

  color = input<RippleType.Color>('blue');
  duration = input<number>(600);
  disabled = input<boolean>(false);

  // State
  ripples: RippleType.Circle[] = [];

  constructor(private elementRef: ElementRef) {}

  // Mapper la couleur vers une variable CSS
  getColor(): string {
    return `var(--color-${this.color()})`;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.disabled()) return;

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculer la taille du ripple pour couvrir tout l'élément
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple: RippleType.Circle = { x, y, size };
    this.ripples.push(ripple);

    // Retirer le ripple après l'animation
    setTimeout(() => {
      const index = this.ripples.indexOf(ripple);
      if (index > -1) {
        this.ripples.splice(index, 1);
      }
    }, this.duration());
  }
}
