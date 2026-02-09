/***** Import Angular *****/
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
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

/***** Import de composants *****/
import { Text } from '../../components/misc/text/text';

/***** Import de types *****/
import { Tooltip as TooltipType } from './tooltip.type';

// Composant interne pour afficher le contenu du tooltip
@Component({
  selector: 'app-tooltip-content',
  standalone: true,
  imports: [CommonModule, Text],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipContentComponent {
  text = signal<string | null>(null);
  template = signal<TemplateRef<any> | null>(null);
  position = signal<TooltipType.Position>('top');
}

@Directive({
  selector: '[tooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  // Inputs
  tooltip = input<{
    content: string | TemplateRef<any> | null;
    position?: TooltipType.Position;
    delay?: number;
    disabled?: boolean;
    followMouse?: boolean;
  } | null>({
    content: null,
    position: 'top',
    delay: 200,
    disabled: false,
    followMouse: false,
  });

  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef?: OverlayRef;
  private timeoutId?: number;
  private componentRef?: any;
  private mouseX = 0;
  private mouseY = 0;

  constructor() {
    // Surveiller les changements de contenu
    effect(() => {
      const tooltipValue = this.tooltip()?.content;
      // Si le tooltip est ouvert, mettre à jour son contenu
      if (this.overlayRef?.hasAttached() && this.componentRef) {
        if (typeof tooltipValue === 'string') {
          this.componentRef.instance.text.set(tooltipValue);
          this.componentRef.instance.template.set(null);
        } else if (tooltipValue) {
          this.componentRef.instance.template.set(tooltipValue);
          this.componentRef.instance.text.set(null);
        }
      }
    });

    // Surveiller les changements de position du tooltip
    effect(() => {
      const position = this.tooltip()?.position;
      // Si la position change et que le tooltip est ouvert, mettre à jour sa position
      if (this.overlayRef?.hasAttached() && position) {
        // Mettre à jour la stratégie de position
        this.close();
        const positionStrategy = this.overlay
          .position()
          .flexibleConnectedTo(this.elementRef)
          .withPositions(this.getPositions())
          .withPush(true)
          .withViewportMargin(8);

        this.overlayRef.updatePositionStrategy(positionStrategy);

        // Mettre à jour le signal de position du composant
        if (this.componentRef) {
          this.componentRef.instance.position.set(position);
        }
      }
    });
  }

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

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.tooltip()?.followMouse) {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;

      // Si le tooltip est ouvert, mettre à jour sa position
      if (this.overlayRef?.hasAttached()) {
        this.updateMousePosition();
      }
    }
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
      const positionStrategy = this.tooltip()?.followMouse
        ? this.overlay.position().global()
        : this.overlay
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
    const tooltipPosition = this.tooltip()?.position ?? 'top';
    const portal = new ComponentPortal(TooltipContentComponent, this.viewContainerRef);
    this.componentRef = this.overlayRef.attach(portal);

    // Mettre à jour la position
    this.componentRef.instance.position.set(tooltipPosition);

    if (typeof tooltipValue === 'string') {
      this.componentRef.instance.text.set(tooltipValue);
    } else if (tooltipValue) {
      this.componentRef.instance.template.set(tooltipValue);
    }

    // Si followMouse est activé, mettre à jour la position immédiatement
    if (this.tooltip()?.followMouse) {
      this.updateMousePosition();
    }
  }

  private close(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
      this.componentRef = undefined;
    }
  }

  private clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  private updateMousePosition(): void {
    if (!this.overlayRef || !this.tooltip()?.followMouse) return;

    const offset = 12; // Décalage par rapport au curseur
    const positionStrategy = this.overlay
      .position()
      .global()
      .left(`${this.mouseX + offset}px`)
      .top(`${this.mouseY + offset}px`);

    this.overlayRef.updatePositionStrategy(positionStrategy);
  }

  private getPositions(): ConnectedPosition[] {
    const positions: Record<TooltipType.Position, ConnectedPosition[]> = {
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
          overlayX: 'end',
          overlayY: 'center',
          offsetX: -8,
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
          originX: 'end',
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
