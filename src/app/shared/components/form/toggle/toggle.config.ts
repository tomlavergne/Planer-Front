import type { Toggle } from './toggle.type';

export const TOGGLE_SIZES_CONFIG: Record<
  Toggle.Size,
  {
    height: Toggle.Size;
  }
> = {
  xs: {
    height: 'xs',
  },
  sm: {
    height: 'sm',
  },
  md: {
    height: 'md',
  },
  lg: {
    height: 'lg',
  },
  xl: {
    height: 'xl',
  },
};
