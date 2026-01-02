/***** Imports de Angular *****/
import { Component, input, computed, booleanAttribute } from '@angular/core';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

@Component({
  selector: 'app-skeleton',
  imports: [],
  template: '',
  styleUrl: './skeleton.scss',
  host: {
    '[class]': 'hostClasses()',
  },
})
export class Skeleton {
  /***** Inputs *****/
  variant = input<SkeletonVariant>('text');
  width = input<string | null>(null);
  height = input<string | null>(null);
  animated = input<boolean, any>(true, { transform: booleanAttribute });

  // Computed pour les classes
  hostClasses = computed(() => {
    return [`variant-${this.variant()}`, this.animated() ? 'animated' : ''].join(' ');
  });

  // Computed pour les styles inline
  hostStyles = computed(() => {
    const styles: any = {};
    if (this.width()) styles['width'] = this.width();
    if (this.height()) styles['height'] = this.height();
    return styles;
  });
}
