/***** Imports Angular *****/
import { booleanAttribute } from '@angular/core';

/***** Imports de types *****/
import type { Button } from './button.type';
import type { Flex } from '../../layout/flex/flex.type';
import type { Icon } from '../../display/icon/icon.type';
import type { Text } from '../../display/text/text.type';
import type { InputConfig, OutputConfig } from '../../../types/';

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
  '2xs': {
    padding: '4xs',
    gap: '4xs',
    fontSize: '3xs',
    iconSize: '3xs',
  },
  xs: {
    padding: '3xs',
    gap: '3xs',
    fontSize: '2xs',
    iconSize: '2xs',
  },
  sm: {
    padding: '2xs',
    gap: '2xs',
    fontSize: 'xs',
    iconSize: 'xs',
  },
  md: {
    padding: 'xs',
    gap: 'xs',
    fontSize: 'sm',
    iconSize: 'sm',
  },
  lg: {
    padding: 'sm',
    gap: 'sm',
    fontSize: 'md',
    iconSize: 'md',
  },
  xl: {
    padding: 'md',
    gap: 'md',
    fontSize: 'lg',
    iconSize: 'lg',
  },
};
