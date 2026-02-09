import type { Badge } from './badge.type';
import type { Flex } from '../../layout/flex/flex.type';
import type { Icon } from '../icon/icon.type';
import type { Text } from '../text/text.type';

export const BADGE_SIZES_CONFIG: Record<
  Badge.Size,
  {
    padding: Flex.Padding;
    gap: Flex.Gap;
    iconSize: Icon.Size;
    fontSize: Text.Size;
  }
> = {
  xs: {
    padding: '4xs',
    gap: '3xs',
    iconSize: '2xs',
    fontSize: 'xs',
  },
  sm: {
    padding: '3xs',
    gap: '3xs',
    iconSize: 'xs',
    fontSize: 'xs',
  },
  md: {
    padding: '2xs',
    gap: '2xs',
    iconSize: 'sm',
    fontSize: 'sm',
  },
  lg: {
    padding: '2xs',
    gap: '2xs',
    iconSize: 'md',
    fontSize: 'md',
  },
};
