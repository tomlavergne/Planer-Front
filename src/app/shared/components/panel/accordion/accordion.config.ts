import type { Accordion } from './accordion.type';
import type { Flex } from '../../layout/flex/flex.type';
import type { Icon } from '../../misc/icon/icon.type';
import type { Text } from '../../misc/text/text.type';

export const ACCORDION_SIZES_CONFIG: Record<
  Accordion.Size,
  {
    header: {
      gap: Flex.Gap;
      padding: Flex.Padding;
      fontSize: Text.Size;
      iconSize: Icon.Size;
    };
    content: {
      padding: Flex.Padding;
    };
  }
> = {
  xs: {
    header: {
      gap: '3xs',
      padding: '3xs',
      fontSize: 'xs',
      iconSize: '2xs',
    },
    content: {
      padding: '3xs',
    },
  },
  sm: {
    header: {
      gap: '2xs',
      padding: '2xs',
      fontSize: 'xs',
      iconSize: 'xs',
    },
    content: {
      padding: '2xs',
    },
  },
  md: {
    header: {
      gap: 'xs',
      padding: 'xs',
      fontSize: 'sm',
      iconSize: 'sm',
    },
    content: {
      padding: 'xs',
    },
  },
  lg: {
    header: {
      gap: 'sm',
      padding: 'sm',
      fontSize: 'md',
      iconSize: 'md',
    },
    content: {
      padding: 'sm',
    },
  },
};
