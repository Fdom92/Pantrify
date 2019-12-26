export interface SingleItem {
  minimum: number;
  title: string;
  units: number;
}

export interface FolderItem {
  expanded: boolean;
  isFolder: boolean;
  title: string;
  products: Array<SingleItem>;
}
