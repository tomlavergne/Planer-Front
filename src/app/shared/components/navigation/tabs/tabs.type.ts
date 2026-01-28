export namespace Tabs {
  export type Direction = 'row' | 'column';

  export type Item = {
    id: string;
    label: string;
    disabled?: boolean;
  };
}
