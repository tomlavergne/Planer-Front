import { Icon as IconType } from '../../shared/components/display/icon/icon.type';

export namespace Documentation {
  export type Item = {
    title: string;
    path: string;
    icon?: IconType.Name;
  };

  export type Section = {
    title: string;
    icon?: IconType.Name;
    content: (Item | Section)[];
  };

  export type Index = Section[];
}
