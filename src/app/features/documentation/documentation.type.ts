export namespace Documentation {
  export type Item = {
    name: string;
    path: string;
    importPath: string;
    loadComponent: () => Promise<any>;
  };

  // Section hérite de BaseItem et ajoute content
  export type Section = Item & {
    content: Item[];
  };

  export type Index = Section[];
}
