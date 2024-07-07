export class UITreeItemData {
  public ParentId?: string;
  public Id = "";
  public Name: string;
  public ItemType: UITreeItemType;
  public FileType?: UITreeItemFileType;
  public Selectable: boolean;
  public IsFolderOpen: boolean;
  public Dropable = false;
  public Dragable = false;
  public IsSelected = false;

  public Children: UITreeItemData[] = [];

  constructor() {
    this.Name = "[No Name]";
    this.ItemType = UITreeItemType.File;
    this.FileType = UITreeItemFileType.RESTAPI_GET;
    this.Selectable = true;
    this.IsFolderOpen = true;
  }
}

export enum UITreeItemType {
  Folder,
  File
}

export enum UITreeItemFileType {
  NONE,
  RESTAPI_GET,
  RESTAPI_POST
}