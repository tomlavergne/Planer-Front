/***** Imports de types *****/
import type { Logo } from './logo.type';
import type { Flex } from '@shared/components/layout/flex/flex.type';
import type { Shape } from '@shared/components/misc/shape/shape.type';
import type { Text } from '@shared/components/misc/text/text.type';

/**
 * Configuration des tailles du composant Button
 */
export const LOGO_SIZES_CONFIG: Record<
  Logo.Size,
  {
    gap: Flex.Gap;
    fontSize: Text.Size;
    shapeSize: Shape.Size;
  }
> = {
  xs: {
    gap: '2xs',
    fontSize: 'xs',
    shapeSize: '2xs',
  },
  sm: {
    gap: '2xs',
    fontSize: 'sm',
    shapeSize: 'xs',
  },
  md: {
    gap: '2xs',
    fontSize: 'lg',
    shapeSize: 'sm',
  },
  lg: {
    gap: 'xs',
    fontSize: '2xl',
    shapeSize: 'md',
  },
  xl: {
    gap: 'xs',
    fontSize: '4xl',
    shapeSize: 'lg',
  },
};
