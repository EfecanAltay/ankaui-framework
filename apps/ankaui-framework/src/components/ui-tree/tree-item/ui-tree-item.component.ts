import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UITreeItemData, UITreeItemFileType, UITreeItemType } from './ui-tree-item.data';
import { UITreeComponent } from '../ui-tree.component';
import { Subscription } from 'rxjs';
import { DraggingItemDirective } from '../ui-tree-dragging-item.directive';
import { UITreeHelper } from '../ui-tree.helper';
import { UIContextMenuComponent } from '../../ui-contextmenu/ui-contextmenu.component';

@Component({
  selector: 'ui-tree-item',
  standalone: true,
  imports: [CommonModule, DraggingItemDirective,UIContextMenuComponent],
  templateUrl: './ui-tree-item.component.html',
  styleUrl: './ui-tree-item.component.css',
})
export class UITreeItemComponent implements OnInit {

  public static IsHandeled = false;
  public static HandeledItemData?: UITreeItemData;
  public static HandeledParentId?: string;

  public UITreeItemType = UITreeItemType;

  @Input()
  public Root!: UITreeComponent;
  @Input()
  public ParentId?: UITreeItemComponent;


  public get DropableList() {
    return this.Root.DropableList;
  }

  public set DropableList(val: string[]) {
    this.Root.DropableList = val;
  }

  @Input()
  public Data: UITreeItemData = new UITreeItemData();

  @Input()
  public ChildIndex = 0;
  @Input()
  public ChildrenItemData: UITreeItemData[] = [];

  @Input()
  public ItemType: UITreeItemType;

  @Input()
  public FileType?: UITreeItemFileType;

  @Input()
  public IsFolderOpen: boolean;

  @Output()
  public IsFolderOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public OnFolderOpenChange: EventEmitter<UITreeItemComponent> = new EventEmitter<UITreeItemComponent>();

  @Input()
  public Name: string;

  //#region Selection
  @Input()
  public IsSelected?: boolean;
  @Input()
  public Selectable?: boolean;
  @Output()
  public OnSelectedEvent: EventEmitter<UITreeItemComponent> = new EventEmitter<UITreeItemComponent>();
  //#endregion Selection

  public DragItemEnteredSub?: Subscription;

  constructor(private cd: ChangeDetectorRef,
      private el: ElementRef,
      private renderer: Renderer2) {
    this.Name = "[NO NAME]";
    this.IsFolderOpen = false;
    this.ItemType = UITreeItemType.File;
    this.FileType = UITreeItemFileType.RESTAPI_GET;
    this.IsSelected = false;
    this.OnSelectedEvent = new EventEmitter<UITreeItemComponent>();
    (el.nativeElement as HTMLElement).draggable = true;
  }

  ngOnInit(): void {
    if(this.ParentId)
      this.ChildIndex++;
  }

  public OnClickAction() {
    // if (this.ItemType === UITreeItemType.Folder) {
    //   this.IsFolderOpen = !this.IsFolderOpen;
    //   this.OnFolderOpenChange.emit(this);
    // }
  }

  public DeSelect() {
    this.IsSelected = false;
  }
  public Select() {
    this.IsSelected = true;
  }

  public OnSelectedChildren(child: UITreeItemComponent) {
    this.OnSelectedEvent.emit(child);
  }

  public OnItemSelected(isSelected: boolean) {
    this.IsSelected = isSelected;
  }

  public OnItemClicked() {
    this.IsFolderOpen = !this.IsFolderOpen;
    this.Data.IsFolderOpen =  this.IsFolderOpen;
  }


  public FillColor() {
    if (this.ItemType === UITreeItemType.Folder) {
      return "#444444";
    }
    else
      return "#44444450";
  }

  public RandomColorCode() {
    let randomColorCode = "#";
    for (let i = 0; i < 6; i++) {
      randomColorCode += Math.floor(Math.random() * 16).toString(16);
    }
    return randomColorCode;
  }

  public GetChildFolderIds(): string[] {
    const resultList: string[] = [];
    resultList.push("root-list")
    this.ChildrenItemData?.forEach(item => {
      if (item.ItemType === UITreeItemType.Folder) {
        resultList.push(item.Id);
        // if (item.Children && item.Children.length > 0) {
        //    item.GetChildIds();
        // }
      }
    });
    return resultList;
  }

  //#region File Funcs

  public RemoveFile() {
    // TODO : Remove File Action....
    if(this.ParentId)
     this.ParentId.Data.Children = this.ParentId.Data.Children.filter(x=>x.Id != this.Data.Id);
  }

  //#endregion File Funcs
  
  //#region Folder Funcs

  public AddFileInFolder() {
    const new_item = UITreeHelper.CreateFile("NEW",UITreeItemFileType.NONE);
    this.Data.Children.push(new_item);
  }

  //#endregion Folder Funcs

  public OnShowMenu() {
    return false;
  }
}
