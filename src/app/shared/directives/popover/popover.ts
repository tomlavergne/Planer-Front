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
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

/***** Import de composants *****/
import { Text, Button } from '../../components';

/***** Import de types *****/
import { Popover as PopoverType } from './popover.type';

// Composant interne pour afficher le contenu du popover
@Component({
  selector: 'app-popover-content',
  standalone: true,
  imports: [CommonModule, Text, Button],
  templateUrl: './popover.html',
  styleUrl: './popover.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverContentComponent {
  title = signal<string | null>(null);
  text = signal<string | null>(null);
  template = signal<TemplateRef<any> | null>(null);
  templateContext = signal<any>({});
  showCloseButton = signal<boolean>(true);
  position = signal<PopoverType.Position>('bottom');

  closeRequested = output<void>();

  onClose(): void {
    this.closeRequested.emit();
  }
}

@Directive({
  selector: '[popover]',
  standalone: true,
})
export class PopoverDirective implements OnDestroy {
  // Inputs
  popover = input<{
    content: string | TemplateRef<any> | null;
    contentContext?: any;
    title?: string;
    position?: PopoverType.Position;
    trigger?: 'click' | 'hover';
    closeOnClickOutside?: boolean;
    showCloseButton?: boolean;
    disabled?: boolean;
  } | null>(null);

  // Output
  popoverOpened = output<void>();
  popoverClosed = output<void>();

  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef?: OverlayRef;
  private componentRef?: any;
  private closeClickListener?: (event: Event) => void;

  constructor() {
    console.log('PopoverDirective constructor called');

    // Surveiller les changements de contenu
    effect(() => {
      const popoverValue = this.popover();
      if (this.overlayRef?.hasAttached() && this.componentRef && popoverValue) {
        this.updateContent(popoverValue);
      }
    });

    // Surveiller les changements de position
    effect(() => {
      const position = this.popover()?.position;
      if (this.overlayRef?.hasAttached() && position) {
        this.close();
      }
    });
  }

  ngOnDestroy(): void {
    console.log('PopoverDirective destroyed');
    this.close();
    this.removeClickListener();
    this.overlayRef?.dispose();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    const config = this.popover();

    // Si pas de config ou config null, ne rien faire
    if (!config) return;

    const trigger = config?.trigger ?? 'click';
    const disabled = config?.disabled ?? false;

    console.log('Click event detected!', {
      trigger,
      disabled,
      config,
    });

    if (trigger === 'click' && !disabled) {
      event.stopPropagation();
      this.toggle();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const config = this.popover();

    // Si pas de config ou config null, ne rien faire
    if (!config) return;

    const trigger = config?.trigger ?? 'click';
    const disabled = config?.disabled ?? false;

    if (trigger === 'hover' && !disabled) {
      this.open();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const config = this.popover();

    // Si pas de config ou config null, ne rien faire
    if (!config) return;

    const trigger = config?.trigger ?? 'click';

    if (trigger === 'hover') {
      this.close();
    }
  }

  private toggle(): void {
    console.log('Toggle called, current state:', this.overlayRef?.hasAttached());
    if (this.overlayRef?.hasAttached()) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    console.log('Opening popover', this.popover());
    const config = this.popover();
    const disabled = config?.disabled ?? false;

    if (disabled || !config?.content) {
      console.log('Popover blocked:', {
        disabled,
        hasContent: !!config?.content,
      });
      return;
    }

    if (this.overlayRef?.hasAttached()) {
      console.log('Popover already attached');
      return;
    }

    const closeOnClickOutside = config.closeOnClickOutside ?? true;

    // Créer l'overlay
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.getPositions())
      .withPush(true)
      .withViewportMargin(8);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: closeOnClickOutside,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    // Gérer la fermeture sur backdrop click
    if (closeOnClickOutside) {
      this.overlayRef.backdropClick().subscribe(() => {
        console.log('Backdrop clicked');
        this.close();
      });
    }

    // Créer le portal avec le contenu
    const portal = new ComponentPortal(PopoverContentComponent, this.viewContainerRef);
    this.componentRef = this.overlayRef.attach(portal);

    console.log('Component attached:', this.componentRef);

    this.updateContent(config);

    // S'abonner à la demande de fermeture depuis le composant
    this.componentRef.instance.closeRequested.subscribe(() => {
      console.log('Close requested from component');
      this.close();
    });

    // Ajouter listener pour ESC
    this.addEscapeListener();

    console.log('Popover opened successfully');
    this.popoverOpened.emit();
  }

  private close(): void {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
      this.componentRef = undefined;
      this.removeEscapeListener();
      this.popoverClosed.emit();
    }
  }

  private updateContent(config: NonNullable<ReturnType<typeof this.popover>>): void {
    if (!this.componentRef) return;

    this.componentRef.instance.title.set(config.title || null);
    this.componentRef.instance.showCloseButton.set(config.showCloseButton ?? true);
    this.componentRef.instance.position.set(config.position ?? 'bottom');

    if (typeof config.content === 'string') {
      this.componentRef.instance.text.set(config.content);
      this.componentRef.instance.template.set(null);
    } else if (config.content) {
      this.componentRef.instance.template.set(config.content);
      this.componentRef.instance.templateContext.set(config.contentContext || {});
      this.componentRef.instance.text.set(null);
    }
  }

  private addEscapeListener(): void {
    this.removeEscapeListener();
    this.closeClickListener = (event: Event) => {
      if ((event as KeyboardEvent).key === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this.closeClickListener);
  }

  private removeEscapeListener(): void {
    if (this.closeClickListener) {
      document.removeEventListener('keydown', this.closeClickListener);
      this.closeClickListener = undefined;
    }
  }

  private removeClickListener(): void {
    this.removeEscapeListener();
  }

  private getPositions(): ConnectedPosition[] {
    const config = this.popover();
    const position = config?.position ?? 'bottom';

    const positions: Record<PopoverType.Position, ConnectedPosition[]> = {
      // Positions simples
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
      // Positions avancées - TOP
      'top-left': [
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -8,
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
      ],
      'top-right': [
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -8,
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8,
        },
      ],
      // Positions avancées - BOTTOM
      'bottom-left': [
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ],
      'bottom-right': [
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ],
      // Positions avancées - LEFT
      'left-top': [
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: -8,
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 8,
        },
      ],
      'left-bottom': [
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetX: -8,
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetX: 8,
        },
      ],
      // Positions avancées - RIGHT
      'right-top': [
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 8,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: -8,
        },
      ],
      'right-bottom': [
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetX: 8,
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetX: -8,
        },
      ],
    };

    return positions[position] || positions.bottom;
  }
}
