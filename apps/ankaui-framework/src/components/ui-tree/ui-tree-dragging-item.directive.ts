import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from "@angular/core";
import { UITreeItemData, UITreeItemType } from "./tree-item/ui-tree-item.data";
import { ContextMenuService } from "../../services/contextmenu-service/contextmenu-service";
import { ContextActionData } from "../../data/contextaction-data";

@Directive({
  standalone: true,
  selector: '[uiDraggingItem]',
})
export class DraggingItemDirective implements OnInit {

  @Input()
  public UIItem : unknown;
  
  @Input()
  public Data: UITreeItemData = new UITreeItemData();

  //#region AppSettingsProps
  private _consoleLogsActive = true;
  private _consoleDragStartAndDropLogsActive = true;
  //#endregion AppSettingsProps

  /* Clicked Props */
  public static ClickTimer: NodeJS.Timeout | undefined;

  /* Clicked Props */
  public static ItemLastCheckID: string | undefined;

  /* Clicked Props */
  public static FolderHoldingTimer: NodeJS.Timeout | undefined;

  /* Selected Props */
  public static SelectedID: string | undefined;

  /* Handled Props */
  public static IsHandledID: string | undefined;
  public static IsHandledTimeout: number | undefined;

  /* Dropped Props */
  public static IsDroppedID: string | undefined;
  public static IsDroppedUPDOWN = 0;

  private _isThisItemHandeled: boolean;

  public get IsThisItemHandeled(): boolean {
    return this._isThisItemHandeled;
  }
  public set IsThisItemHandeled(val: boolean) {
    this._isThisItemHandeled = val;
    DraggingItemDirective.IsHandledID = val ? this.Data.Id : undefined;
  }

  public get IsThisParentItemHandeled(): boolean {
    return !!this.Data.ParentId && !!DraggingItemDirective.IsHandledID && this.Data.ParentId === DraggingItemDirective.IsHandledID;
  }

  private _isThisItemSelected: boolean;

  public get IsThisItemSelected(): boolean {
    return this.Data.IsSelected;
  }
  public set IsThisItemSelected(val: boolean) {
    this.Data.IsSelected = val;
  }

  private _isThisItemSelectedDropped: boolean;

  public get IsThisItemSelectedDropped(): boolean {
    return this._isThisItemSelectedDropped;
  }
  public set IsThisItemSelectedDropped(val: boolean) {
    this._isThisItemSelectedDropped = val;
    if (val)
      DraggingItemDirective.IsDroppedID = this.Data.Id;
  }

  constructor(private el: ElementRef, private renderer: Renderer2,
    private _srvContextMenu: ContextMenuService
  ) {
    this._isThisItemHandeled = false;
    this._isThisItemSelected = false;
    this._isThisItemSelectedDropped = false;
  }

  ngOnInit(): void {
    if (this.Data.IsSelected) {
      this.showSelectedLight();
    }
  }

  @Output()
  public HandledItemCallback = new EventEmitter();

  @Output()
  public SelectionChangedCallback = new EventEmitter<boolean>();

  @Output()
  public ClickedItemCallback = new EventEmitter();

  @HostListener('mousemove', ["$event"])
  onMouseMove(event: MouseEvent) {
    this.showHoverLight();
  }

  @HostListener('click', ["$event"])
  onMouseClickLocal(event: PointerEvent) {
    this.consoleLog("clickEvent");
    this.runwithCheckFolder(() => {
      /** Clicked EVENT **/
      if (this.Data.Selectable) {
        this.selectItem(event);
        this.consoleLog("click");
      }
      else {
        this.clickItem(event);
      }
      this.el.nativeElement.focus();
    });
  }

  @HostListener("window:selectedItem", ["$event"])
  onSelectedItemListener(event: CustomEvent<SelectedEventData>) {
    if (this.IsThisItemSelected && event.detail.SelectedEventData.Id !== this.Data.Id) {
      this.deSelectItem();
    }
  }

  @HostListener('mouseleave', ["$event"])
  onMouseLeave(event: MouseEvent) {
    if (!this.IsThisItemHandeled && !this.IsThisItemSelected) {
      this.hideHoverLight();
    }
  }

  @HostListener('dragstart', ["$event"])
  onDragStartListenerLocal(event: DragEvent) {
    this.runwithCheckFolder2(() => {
      this.dragStart(event);
    });
  }

  @HostListener("window:dragStart", ["$event"])
  onDragListener(event: CustomEvent<DragEventData>) {
    // if (event?.detail && event.detail.HandleItem.Id !== this.Data.Id && this.IsThisItemSelected) {
    //   this.deselectedLight();
    // }
  }

  @HostListener('dragenter', ["$event"])
  onDragEnterListenerLocal(event: DragEvent) {
    event.preventDefault();
    this.runwithCheckFolder2(() => {
      this.dragEnter(event);
    });
  }

  @HostListener('dragover', ["$event"])
  onDragOverListenerLocal(event: DragEvent) {
    if (this.IsThisItemHandeled || this.IsThisParentItemHandeled) return;
    event.preventDefault();
    this.runwithCheckFolder2(() => {
      this.dragOver(event);
    });
  }

  @HostListener('dragleave', ["$event"])
  onDragLeaveListenerLocal(event: DragEvent) {
    event.preventDefault();
    this.runwithCheckFolder2(() => {
      this.dragLeave(event);
    });
  }

  @HostListener('ondrop', ["$event"])
  onDropListenerLocal(event: DragEvent) {
    this.runwithCheckFolder(() => {
      this.drop(event);
    });
  }

  @HostListener('window:drop', ["$event"])
  onDropListener(event: DragEvent) {
    if (this.Data.IsSelected)
      this.showSelectedLight();
    else
      this.deselectedLight();
  }

  @HostListener("dragend", ["$event"])
  onDragEndListener(event: DragEvent) {
    if (this.IsThisItemHandeled) {
      this.hideDragLight();
      this.IsThisItemHandeled = false;
      //DraggingItemDirective.ClickTimer = undefined;
    }
  }

  @HostListener("contextmenu", ["$event"])
  eventLocalShowContextMenu(event: PointerEvent) {
    event.preventDefault();
    this.runwithCheckFolder2(() => {
      this.showContextMenu(event);
    });
  }

  private runwithCheckFolder(run_callback: () => void) {
    if (DraggingItemDirective.ClickTimer)
      return;
    DraggingItemDirective.ClickTimer = setTimeout(() => {
      DraggingItemDirective.ClickTimer = undefined;
    }, 100);

    if (this.Data.ItemType === UITreeItemType.Folder) {
      if (event?.target && (event.target as HTMLElement).classList.contains("nav-folder-item")) {
        run_callback();
      }
    }
    else {
      run_callback();
    }
  }

  private runwithCheckFolder2(run_callback: () => void) {
    if (this.Data.ItemType === UITreeItemType.Folder) {
      if (event?.target && (event.target as HTMLElement).classList.contains("nav-folder-item")) {
        run_callback();
        DraggingItemDirective.ItemLastCheckID = this.Data.Id;
        return;
      }
      // For Override Children Click
      else if (DraggingItemDirective.ItemLastCheckID &&
        this.Data.Children && this.Data.Children.find(x => x.Id === DraggingItemDirective.ItemLastCheckID)) {
        return;
      }
    }
    run_callback();
    DraggingItemDirective.ItemLastCheckID = this.Data.Id;
  }


  private isThereInChildren(searchItemId: string, arr: UITreeItemData[]): boolean {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (item.Id === searchItemId)
        return true;
      else if (item.Children && item.Children.length > 0) {
        return this.isThereInChildren(searchItemId, item.Children);
      }
    }
    return false;
  }

  private dragStart(event: DragEvent) {
    this.deselectedLight();
    this.showDragLight();
    this.IsThisItemHandeled = true;
    this.consoleLog("Dragged Start Item : " + this.Data.Name, this._consoleDragStartAndDropLogsActive);
    const eventData = new DragEventData();
    eventData.DragEvent = event;
    eventData.HandleItem = this.Data;
    event.dataTransfer?.setData("application/json", JSON.stringify(this.Data));
    window.dispatchEvent(new CustomEvent<DragEventData>("dragStart", { detail: eventData }));
  }

  private dragEnter(event: DragEvent) {
    // if (DraggingItemDirective.ItemLastCheckID === this.Data.Id)
    //   return;
    this.consoleLog("Drag Enter Item : " + this.Data.Name);
    const data = event.dataTransfer?.getData("application/json") as string;
    if (data) {
      const eventData = JSON.parse(data) as DragEventData;
      eventData.DragEvent = event;
      eventData.FromItem = this.Data as UITreeItemData;
      event.dataTransfer?.setData("application/json", JSON.stringify(eventData));
      window.dispatchEvent(new CustomEvent<DragEventData>("dragEnter", { detail: eventData }));
    }
  }

  private dragOver(event: DragEvent) {
    this.showDroppedLight(event);
    const eventData = new DragEventData();
    eventData.DragEvent = event;
    eventData.FromItem = this.Data as UITreeItemData;
    window.dispatchEvent(new CustomEvent<DragEventData>("dragOver", { detail: eventData }));
  }

  private dragLeave(event: DragEvent) {
    this.hideDroppedLight();
    this.consoleLog("Drag Leave Item : " + this.Data.Name);
    const eventData = new DragEventData();
    eventData.DragEvent = event;
    eventData.FromItem = this.Data as UITreeItemData;
    window.dispatchEvent(new CustomEvent<DragEventData>("dragLeave", { detail: eventData }));
  }

  private drop(event: DragEvent) {
    this.hideDroppedLight();
    this.hideDragLight();
    const data = event.dataTransfer?.getData("application/json") as string;
    if (data) {
      const toItem: UITreeItemData = JSON.parse(data) as UITreeItemData;
      if (toItem.Id === this.Data.Id)
        return;
      if (toItem.ItemType === UITreeItemType.Folder)
        return;
      event.preventDefault();
      toItem.ParentId = this.Data.Id;
      this.consoleLog("Drop From " + toItem.Name + " To " + this.Data.Name + " IsDroppedUPDOWN " + DraggingItemDirective.IsDroppedUPDOWN, this._consoleDragStartAndDropLogsActive);
      const eventData = new DragEventData();
      eventData.DragEvent = event;
      eventData.FromItem = toItem;
      eventData.ToItem = this.Data;
      eventData.ToItemUpDown = DraggingItemDirective.IsDroppedUPDOWN;
      window.dispatchEvent(new CustomEvent<DragEventData>("dropItem", { detail: eventData }));
    }
  }

  private clickItem(event: MouseEvent) {
    this.consoleLog("Click Item : " + this.Data.Name);
    const eventData = new ClickEventData();
    eventData.MouseEvent = event;
    eventData.ClickEventData = this.Data;
    window.dispatchEvent(new CustomEvent<ClickEventData>("clickItem", { detail: eventData }));
    this.ClickedItemCallback.emit();
  }

  private selectItem(event: MouseEvent) {
    this.IsThisItemSelected = true;
    this.showSelectedLight();
    this.consoleLog("Selected Item : " + this.Data.Name);
    const eventData = new SelectedEventData();
    eventData.MouseEvent = event;
    eventData.SelectedEventData = this.Data;
    window.dispatchEvent(new CustomEvent<SelectedEventData>("selectedItem", { detail: eventData }));
    this.SelectionChangedCallback.emit();
  }

  private deSelectItem() {
    this.IsThisItemSelected = false;
    this.deselectedLight();
    this.consoleLog("Deselect Item : " + this.Data.Name);
  }

  private showContextMenu(event: PointerEvent) {
    switch (this.Data.ItemType) {
      case UITreeItemType.File:
        this._srvContextMenu.Show(this.UIItem, event, [new ContextActionData("Copy", "Copy"), new ContextActionData("Rename", "Rename"), new ContextActionData("Remove", "RemoveFile")]);
        break;
      case UITreeItemType.Folder:
        this._srvContextMenu.Show(this.UIItem, event, [new ContextActionData("Add File", "AddFileInFolder"), new ContextActionData("Copy", "Copy"), new ContextActionData("Rename", "Rename"), new ContextActionData("Remove", "RemoveFolder")]);
        break;
    }
  }

  //#region DesingFuncs

  private addCSSClass(className: string, el: unknown = this.el.nativeElement) {
    this.renderer.addClass(el, className);
  }

  private removeCSSClass(className: string, el: unknown = this.el.nativeElement) {
    this.renderer.removeClass(el, className);
  }

  private showHoverLight() {
    if (this.IsThisItemHandeled || this.IsThisItemSelected)
      return;

    switch (this.Data.ItemType) {
      case UITreeItemType.File:
        this.addCSSClass("hover-file");
        break;
      case UITreeItemType.Folder:
        this.addCSSClass("hover-folder");
        break;
    }
  }

  private hideHoverLight() {
    switch (this.Data.ItemType) {
      case UITreeItemType.File:
        this.removeCSSClass("hover-file");
        break;
      case UITreeItemType.Folder:
        this.removeCSSClass("hover-folder");
        break;
    }
  }

  private showDroppedLight(event: DragEvent) {
    if (this.IsThisItemHandeled)
      return;
    if (DraggingItemDirective.IsHandledID === this.Data.Id)
      return;
    const clientElement = event.currentTarget as HTMLElement;
    let folderTextElement = undefined;
    switch (this.Data.ItemType) {
      case UITreeItemType.File:
        this.removeCSSClass("dragging-file");
        this.removeCSSClass("hover-file");
        if (event.pageY > clientElement.offsetTop + (clientElement.offsetHeight / 2)) {
          DraggingItemDirective.IsDroppedUPDOWN = -1;
          this.removeCSSClass("dropping-top");
          this.addCSSClass("dropping-bottom");
        }
        else {
          DraggingItemDirective.IsDroppedUPDOWN = 1;
          this.removeCSSClass("dropping-bottom");
          this.addCSSClass("dropping-top");
        }
        break;
      case UITreeItemType.Folder:
        if (this.Data.IsFolderOpen) {
          this.removeCSSClass("hover-folder");
          this.removeCSSClass("dropping-folder");
          this.addCSSClass("dropping-opennigfolder");
          folderTextElement = this.el.nativeElement.querySelector(".nav-folder-item") as HTMLDivElement;
          if (folderTextElement)
            this.addCSSClass("dropping-opennigfolder-navItem", folderTextElement);
        }
        else {
          this.removeCSSClass("hover-folder");
          this.removeCSSClass("dropping-opennigfolder");
          this.addCSSClass("dropping-folder");
          if (!DraggingItemDirective.FolderHoldingTimer) {
            DraggingItemDirective.FolderHoldingTimer = setTimeout(() => {
              console.log("Folder Openning..." + this.Data.Name);
              clearTimeout(DraggingItemDirective.FolderHoldingTimer);
              DraggingItemDirective.FolderHoldingTimer = undefined;
              this.clickItem(event);
            }, 1000);
          }
        }
        break;
    }
  }

  private hideDroppedLight() {
    if (this.IsThisItemHandeled)
      return;
    if (DraggingItemDirective.IsHandledID === this.Data.Id)
      return;
    let folderTextElement = undefined;
    switch (this.Data.ItemType) {
      case UITreeItemType.File:
        this.removeCSSClass("hover-file");
        this.removeCSSClass("dropping-bottom");
        this.removeCSSClass("dropping-top");
        break;
      case UITreeItemType.Folder:
        if (DraggingItemDirective.FolderHoldingTimer) {
          clearTimeout(DraggingItemDirective.FolderHoldingTimer);
          DraggingItemDirective.FolderHoldingTimer = undefined;
        }
        this.removeCSSClass("hover-folder");
        this.removeCSSClass("dropping-folder");
        this.removeCSSClass("dropping-opennigfolder");
        if (this.Data.IsFolderOpen) {
          folderTextElement = this.el.nativeElement.querySelector(".nav-folder-item") as HTMLDivElement;
          if (folderTextElement)
            this.removeCSSClass("dropping-opennigfolder-navItem", folderTextElement);
        }
        break;
    }
  }

  private showDragLight() {
    switch (this.Data.ItemType) {
      case UITreeItemType.File:
        this.addCSSClass('dragging-file');
        break;
      case UITreeItemType.Folder:
        this.addCSSClass('dragging-folder');
        break;
    }
  }

  private hideDragLight() {
    switch (this.Data.ItemType) {
      case UITreeItemType.File:
        this.removeCSSClass('dragging-file');
        break;
      case UITreeItemType.Folder:
        this.removeCSSClass('dragging-folder');
        break;
    }
  }

  private showSelectedLight() {
    switch (this.Data.ItemType) {
      case UITreeItemType.File:
        this.removeCSSClass("hover-file");
        this.addCSSClass("selected-file");
        break;
      case UITreeItemType.Folder:
        this.removeCSSClass("hover-folder");
        this.addCSSClass("selected-folder");
        break;
    }
  }

  private deselectedLight() {
    switch (this.Data.ItemType) {
      case UITreeItemType.File:
        this.removeCSSClass("hover-file");
        this.removeCSSClass("selected-file");
        break;
      case UITreeItemType.Folder:
        this.removeCSSClass("hover-folder");
        this.removeCSSClass("selected-folder");
        break;
    }
  }

  //#endregion DesingFuncs


  private consoleLog(logString: string, overrideActive = false) {
    if (this._consoleLogsActive || overrideActive)
      console.log(`[UI_TREE_ITEM_LOG] ${logString}`);
  }
}

export class EventData {
  public ItemData!: UITreeItemData;
}

export class SelectedEventData {
  public MouseEvent!: MouseEvent;
  public SelectedEventData!: UITreeItemData;
}

export class ClickEventData {
  public MouseEvent!: MouseEvent;
  public ClickEventData!: UITreeItemData;
}

export class DragEventData {
  public DragEvent!: DragEvent;
  public HandleItem!: UITreeItemData;
  public FromItem!: UITreeItemData;
  public ToItem!: UITreeItemData;
  public ToItemUpDown = 0;
}
