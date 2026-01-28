/***** Imports de types *****/
import type { Button } from './button.type';
import type { Flex } from '../../layout/flex/flex.type';
import type { Icon } from '../../display/icon/icon.type';
import type { Text } from '../../display/text/text.type';

/**
 * Configuration des tailles du composant Button
 */
export const BUTTON_SIZES_CONFIG: Record<
  Button.Size,
  {
    padding: Flex.Padding;
    gap: Flex.Gap;
    fontSize: Text.Size;
    iconSize: Icon.Size;
  }
> = {
  xs: {
    padding: '3xs',
    gap: '3xs',
    fontSize: '2xs',
    iconSize: '3xs',
  },
  sm: {
    padding: '3xs',
    gap: '3xs',
    fontSize: 'xs',
    iconSize: '2xs',
  },
  md: {
    padding: '2xs',
    gap: '2xs',
    fontSize: 'sm',
    iconSize: 'xs',
  },
  lg: {
    padding: '2xs',
    gap: '2xs',
    fontSize: 'md',
    iconSize: 'sm',
  },
  xl: {
    padding: '2xs',
    gap: 'xs',
    fontSize: 'lg',
    iconSize: 'md',
  },
};
