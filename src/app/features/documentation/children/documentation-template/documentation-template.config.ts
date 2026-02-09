import type { Text } from '@shared/components/misc/text/text.type';
import type { Flex } from '@shared/components/layout/flex/flex.type';

export interface DocumentationTemplateConfig {
  usage: {
    title: {
      size: Text.Size;
      weight: Text.Weight;
      color: Text.Color;
    };
    description: {
      size: Text.Size;
      weight: Text.Weight;
      color: Text.Color;
    };
    gap: Flex.Gap;
  };
}

export const DOCUMENTATION_TEMPLATE_CONFIG: DocumentationTemplateConfig = {
  usage: {
    title: {
      size: 'lg',
      weight: 'bold',
      color: 'text-primary',
    },
    description: {
      size: 'md',
      weight: 'regular',
      color: 'text-secondary',
    },
    gap: 'sm',
  },
};
