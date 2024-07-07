import { UITreeItemData, UITreeItemFileType, UITreeItemType } from "./tree-item/ui-tree-item.data";

export class UITreeHelper {
  
  public static CreateFile(name: string, fileType?: UITreeItemFileType) {
    const item = new UITreeItemData();
    item.Id = crypto.randomUUID();
    item.Name = name;
    item.ItemType = UITreeItemType.File;
    item.FileType = fileType;
    item.Selectable = true
    return item;
  }

  public static CreateFolder(name: string, children: UITreeItemData[], isFolderOpen = false) {
    const item = new UITreeItemData();
    item.Id = crypto.randomUUID();
    item.Name = name;
    item.ItemType = UITreeItemType.Folder;
    item.Selectable = false;
    item.IsFolderOpen = isFolderOpen;
    if(children)
    {
      children.forEach(x=> {
        x.ParentId = item.Id;
      });
      item.Children = children;
    }
    return item;
  }
}