/***** Imports de types *****/
import type { Input } from './input.type';
import type { Flex } from '../../layout/flex/flex.type';
import type { Icon } from '../../misc/icon/icon.type';
import type { Text } from '../../misc/text/text.type';
import type { Button } from '../button/button.type';

/**
 * Configuration des tailles du composant Button
 */
export const INPUT_SIZES_CONFIG: Record<
  Input.Size,
  {
    padding: Flex.Padding;
    gap: Flex.Gap;
    fontSize: Text.Size;
    iconSize: Icon.Size;
    buttonSize: Button.Size;
  }
> = {
  sm: {
    padding: '3xs',
    gap: '3xs',
    fontSize: 'xs',
    iconSize: '2xs',
    buttonSize: 'sm',
  },
  md: {
    padding: '2xs',
    gap: '2xs',
    fontSize: 'sm',
    iconSize: 'xs',
    buttonSize: 'md',
  },
  lg: {
    padding: '2xs',
    gap: '2xs',
    fontSize: 'md',
    iconSize: 'sm',
    buttonSize: 'lg',
  },
};
