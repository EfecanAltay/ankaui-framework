import { UUID } from "crypto";

export class UITabbedItemData {
  public Id  : UUID;
  public Title: string;
  public ItemType: UITabbedItemType;
  public FileType: UITabbedItemFileType;

  public Selected = false;

  constructor(title = "[No Name]") {
    this.Title = title;
    this.Id = self.crypto.randomUUID();
    this.ItemType = UITabbedItemType.File;
    this.FileType = UITabbedItemFileType.RESTAPI_GET;
  }
}

export enum UITabbedItemType {
  Folder,
  File
}

export enum UITabbedItemFileType {
  NONE,
  RESTAPI_GET,
  RESTAPI_POST
}