import { Component, HostListener, ElementRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RippleCircle {
  x: number;
  y: number;
  size: number;
}

@Component({
  selector: 'app-ripple',
  imports: [CommonModule],
  templateUrl: './ripple.html',
  styleUrl: './ripple.scss',
})
export class Ripple {
  // Inputs
  color = input<string>('rgba(255, 255, 255, 0.5)');
  duration = input<number>(600);
  disabled = input<boolean>(false);

  // State
  ripples: RippleCircle[] = [];

  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.disabled()) return;

    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculer la taille du ripple pour couvrir tout l'élément
    const size = Math.max(rect.width, rect.height) * 2;

    const ripple: RippleCircle = { x, y, size };
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
