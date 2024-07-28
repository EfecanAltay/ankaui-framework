import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";
import { UITabbedItemData } from "./ui-tabbed-item/ui-tree-item.data";
import { UITabbedComponent } from "./ui-tabbed.component";
import { UUID } from "crypto";

@Directive({
  standalone: true,
  selector: '[uiDraggingTabbedItem]',
})
export class DraggingTabbedItemDirective {
  
  static dragOverRight = false;
  static draggingID : UUID;
  /**
   *
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {
    
  }

  @Input()
  public Parent?: UITabbedComponent;

  @Input()
  public Data?: UITabbedItemData;

  @HostListener('dragstart', ["$event"])
  onDragEnterListenerLocal(event: DragEvent) {
    //event.preventDefault();
    if (event.dataTransfer && this.Data?.Id) {
      event.dataTransfer.clearData();
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.dropEffect = 'move';
      DraggingTabbedItemDirective.draggingID = this.Data.Id;
      event.dataTransfer?.setData('movingTabID', this.Data.Id); 
    }
  }

  @HostListener('dragover', ["$event"])
  onDragOverListenerLocal(event: DragEvent) {
    const target = this.getTabItemElement(event);
    if(target && this.Data?.Id && event.dataTransfer)
    {
      if(this.Data?.Id !== DraggingTabbedItemDirective.draggingID){
        event.dataTransfer.clearData();
        target.style.borderLeft = "2px solid transparent";
        target.style.borderRight = "2px solid transparent";
        const clientElement = target as HTMLElement;
        if (event.pageX > clientElement.offsetLeft + (clientElement.offsetWidth / 2)) {
          target.style.borderRight = "2px solid red";
          DraggingTabbedItemDirective.dragOverRight = true;
        }
        else {
          target.style.borderLeft = "2px solid red";
          DraggingTabbedItemDirective.dragOverRight = false;
        }
      }
      event.preventDefault();
    }
  }

  @HostListener('dragleave', ["$event"])
  onDragLeaveListenerLocal(event: DragEvent) {
    const target = this.getTabItemElement(event);
    if(target){
      target.style.borderLeft = "2px solid transparent";
      target.style.borderRight = "2px solid transparent";
    }
  }

  @HostListener('drop', ["$event"])
  onDropListenerLocal(event: DragEvent) {
    this.el.nativeElement.style.borderLeft = "";
    this.el.nativeElement.style.borderRight = "";
    const movingTabID = event.dataTransfer?.getData('movingTabID') as UUID;
    if (movingTabID) {
      if (this.Data?.Id) {
        this.Parent?.MoveTab(movingTabID, this.Data?.Id, DraggingTabbedItemDirective.dragOverRight)
      }
    }
  }

  private getTabItemElement(event: DragEvent){
    return (event.target as HTMLElement).closest('ui-tabbed-item') as HTMLElement;
  }

}