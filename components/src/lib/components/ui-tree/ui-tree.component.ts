import { ChangeDetectorRef, HostListener, Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UITreeItemComponent } from "./tree-item/ui-tree-item.component";
import { UITreeItemData, UITreeItemType } from './tree-item/ui-tree-item.data';
import { DraggingHandleItemDirective } from './ui-tree-dragging-handle-item.directive';
import { DragEventData, EventData } from './ui-tree-dragging-item.directive';


@Component({
  selector: 'ui-tree',
  standalone: true,
  templateUrl: './ui-tree.component.html',
  styleUrl: './ui-tree.component.css',
  imports: [CommonModule, UITreeItemComponent, DraggingHandleItemDirective],
  providers: []
})
export class UITreeComponent {
  [x: string]: any;

  @ViewChild("draggingItem")
  public draggingItem: any;

  public handledItem: any;

  @ViewChildren(UITreeItemComponent)
  public ChildredUITreeItem?: QueryList<UITreeItemComponent>;

  public SelectedMenuItem?: UITreeItemComponent;

  public ItemDropList: string[] = [];

  private itemList: UITreeItemData[] = [];
  @Input()
  public set ItemList(val: UITreeItemData[]) {
    this.itemList = val;
    if (val) {
      this.cdRef.detectChanges();
    }
  }

  public get ItemList(): UITreeItemData[] {
    return this.itemList;
  }

  private _allDropableList: string[] = [];

  public get DropableList() {
    return this._allDropableList;
  }

  public set DropableList(val: string[]) {
    this._allDropableList = val;
  }

  @Output()
  public ItemListChange: EventEmitter<UITreeItemData[]> = new EventEmitter<UITreeItemData[]>();

  constructor(private cdRef: ChangeDetectorRef) {

  }

  public OnSelected(item: UITreeItemComponent) {
    this.SelectedMenuItem?.DeSelect();
    item.Select();
    this.SelectedMenuItem = item;
  }

  public OnFolderOpenChange(folder: UITreeItemComponent) {
    this.cdRef.detectChanges();
    this.ItemList = this.ItemList.concat([]);
    this.ItemListChange.emit(this.ItemList);
  }

  @HostListener("window:dropItem", ["$event"])
  eventDropItem(event: CustomEvent<DragEventData>) {
    this.moveList(event.detail.FromItem, event.detail.ToItem, event.detail.ToItemUpDown);
  }

  private moveList(from: UITreeItemData, to: UITreeItemData, isUpDown: number) {
    let newList = this.findAndRemove(from.Id, this.ItemList);
    newList = this.findAndAdd(to.Id, isUpDown, from, newList);
    this.ItemList = newList;
    this.ItemListChange.emit(this.ItemList);
  }


  private findAndRemove(searchingItemId: string, lst: UITreeItemData[], parent: UITreeItemData | undefined = undefined) {
    lst.forEach((item: UITreeItemData) => {
      if (searchingItemId === item.Id) {
        if (parent) {
          parent.Children = parent.Children.filter(x => x.Id !== searchingItemId);
        }
        else {
          lst = lst.filter(x => x.Id !== searchingItemId);
        }
      }
      else if (item.Children && item.Children.length > 0) {
        this.findAndRemove(searchingItemId, item.Children, item);
      }
    });
    return lst;
  }


  private findAndAdd(searchingItemId: string, isUpDown: number, addingItem: UITreeItemData, lst: UITreeItemData[], parent: UITreeItemData | undefined = undefined) {
    lst.forEach((item: UITreeItemData) => {
      if (searchingItemId === item.Id) {
        switch (item.ItemType) {
          case UITreeItemType.File:
            if (parent) {
              item.ParentId = parent.Id;
              parent.Children = this.moveItem(parent.Children, addingItem, parent.Children.indexOf(item), isUpDown === -1);
            }
            else {
              lst.push(addingItem);
            }
            break;
          case UITreeItemType.Folder:
            // TODO : Folder
            item.Children = [addingItem].concat(item.Children);
            break;
        }
      }
      else if (item.Children && item.Children.length > 0) {
        this.findAndAdd(searchingItemId, isUpDown, addingItem, item.Children, item);
      }
    });
    return lst;
  }


  private moveItem(arr: UITreeItemData[], item: UITreeItemData, toIndex: number, isDown: boolean) { // assign the removed item as an array
    if (isDown)
      toIndex++;
    const n_arr = arr.slice(0, toIndex);
    n_arr.push(item);
    const n_arr2 = arr.slice(toIndex, arr.length);
    n_arr.push(...n_arr2);
    return n_arr;
  }
}
