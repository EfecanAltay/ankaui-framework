import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UITreeItemType } from '../../ui-tree/tree-item/ui-tree-item.data';
import { UITabbedItemData } from './ui-tree-item.data';
import { UITabbedComponent } from '../ui-tabbed.component';
import { UUID } from 'crypto';

@Component({
  selector: 'ui-tabbed-item',
  standalone: true,
  templateUrl: './ui-tabbed-item.component.html',
  styleUrl: './ui-tabbed-item.component.css',
})
export class UITabbedItemComponent {

  @Input()
  public Parent?: UITabbedComponent;

  @Input()
  public Data: UITabbedItemData = new UITabbedItemData();

  private _selectedTab = false;
  public get SelectedTab(): boolean{
    return this._selectedTab;
  }
  public set SelectedTab(val : boolean){
    this._selectedTab = val;
    this.Data.Selected = val;
    console.log(val)
  }

  public UITreeItemType = UITreeItemType;

  @Output()
  public IsFolderOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public OnCloseChange: EventEmitter<UITabbedItemData> = new EventEmitter<UITabbedItemData>();

  @Output()
  public OnSelectedChange: EventEmitter<UITabbedItemData> = new EventEmitter<UITabbedItemData>();

  @Output()
  public DataChange: EventEmitter<UITabbedItemData> = new EventEmitter<UITabbedItemData>();

  public DragItemEnteredSub?: Subscription;

  constructor(private cd: ChangeDetectorRef) {
  }

  public hoverItem(event: MouseEvent, isExit = false) {
    const el = (event.target as HTMLElement).children[0].children[0].children[2] as HTMLElement;
    if (el) {
      if (isExit)
        el.style.opacity = "0";
      else
        el.style.opacity = "1";
    }
  }

  public hoverCloseIcon(event: MouseEvent, isExit = false) {
    if (isExit)
      (event.target as HTMLElement).classList.replace('bi-x-square-fill', 'bi-x-square');
    else
      (event.target as HTMLElement).classList.replace('bi-x-square', 'bi-x-square-fill');
  }

  public Close() {
    this.OnCloseChange.emit(this.Data);
  }

  public Selected() {
    this.Data.Selected = true;
    this.OnSelectedChange.emit(this.Data);
  }
}
