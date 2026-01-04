import {
  Directive,
  input,
  ElementRef,
  inject,
  OnDestroy,
  HostListener,
  TemplateRef,
  ViewContainerRef,
  signal,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Position } from '../../types';

// Composant interne pour afficher le contenu du tooltip
@Component({
  selector: 'app-tooltip-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipContentComponent {
  text = signal<string | null>(null);
  template = signal<TemplateRef<any> | null>(null);
}

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  // Inputs
  tooltip = input<{
    content: string | TemplateRef<any> | null;
    position?: Position;
    delay?: number;
    disabled?: boolean;
  } | null>({
    content: null,
    position: 'top',
    delay: 200,
    disabled: false,
  });

  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef?: OverlayRef;
  private timeoutId?: number;

  ngOnDestroy(): void {
    this.clearTimer();
    this.close();
    this.overlayRef?.dispose();
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.tooltip()?.disabled) return;

    this.timeoutId = window.setTimeout(() => {
      this.open();
    }, this.tooltip()?.delay);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.clearTimer();
    this.close();
  }

  @HostListener('focus')
  onFocus(): void {
    if (this.tooltip()?.disabled) return;
    this.open();
  }

  @HostListener('blur')
  onBlur(): void {
    this.close();
  }

  private open(): void {
    if (this.tooltip()?.disabled || !this.tooltip()?.content || this.overlayRef?.hasAttached()) {
      return;
    }

    // Créer l'overlay si nécessaire
    if (!this.overlayRef) {
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions(this.getPositions())
        .withPush(true)
        .withViewportMargin(8);

      this.overlayRef = this.overlay.create({
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
      });
    }

    // Créer le portal avec le contenu
    const tooltipValue = this.tooltip()?.content;

    if (typeof tooltipValue === 'string') {
      // Texte simple
      const portal = new ComponentPortal(TooltipContentComponent);
      const componentRef = this.overlayRef.attach(portal);
      componentRef.instance.text.set(tooltipValue);
    } else if (tooltipValue) {
      // Template personnalisé
      const portal = new ComponentPortal(TooltipContentComponent);
      const componentRef = this.overlayRef.attach(portal);
      componentRef.instance.template.set(tooltipValue);
    }
  }

  private close(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  private getPositions(): ConnectedPosition[] {
    const positions: Record<Position, ConnectedPosition[]> = {
      top: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8,
        },
      ],
      bottom: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ],
      left: [
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -8,
        },
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 8,
        },
      ],
      right: [
        {
          originX: 'end',
          originY: 'center',
          overlayX: 'start',
          overlayY: 'center',
          offsetX: 8,
        },
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -8,
        },
      ],
    };

    return positions[this.tooltip()?.position!] || positions.top;
  }
}
