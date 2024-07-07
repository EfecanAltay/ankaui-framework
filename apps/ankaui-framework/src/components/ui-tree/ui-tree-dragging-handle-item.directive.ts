import { Directive, ElementRef, EventEmitter, HostListener, Output } from "@angular/core";
import { UITreeItemData, UITreeItemFileType, UITreeItemType } from "./tree-item/ui-tree-item.data";
import { DragEventData } from "./ui-tree-dragging-item.directive";

@Directive({
  standalone: true,
  selector: '[uiDraggingHandleItem]',
})
export class DraggingHandleItemDirective {

  private isHandeledItem = false;
  private mouseX: number;
  private mouseY: number;

  // element X and Y before and after move
  private elementX: number;
  private elementY: number;

  private handleOffsetX: number;
  private handleOffsetY: number;
  private handeledParentElement?: HTMLElement;
  private handeledElement?: HTMLElement;
  private handeledData?: UITreeItemData;

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.position = "absolute";
    this.el.nativeElement.style.pointerEvents = "none";
    this.el.nativeElement.style.display = "none";
    this.isHandeledItem = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.elementX = 0;
    this.elementY = 0;
    this.handleOffsetX = 0;
    this.handleOffsetY = 0;
  }

  @HostListener("window:mousemove", ["$event"])
  eventMoveFunction(event: MouseEvent) {
    if (this.isHandeledItem) {
      const deltaX = event.clientX + 15;
      const deltaY = event.clientY + 10;
      //this.elementX =  event.clientX - event.currentTarget - event.currentTarget.clientWidth;
      this.el.nativeElement.style.left = this.elementX + deltaX + 'px';
      this.el.nativeElement.style.top = this.elementY + deltaY + 'px';
      this.el.nativeElement.style.display = "block";
    }
  }

  // @HostListener("window:releasedItem", ["$event"])
  // eventReleasedFunction(event: CustomEvent<DraggingItemEventData>) {
  //   if (event.detail.DroppingData && event.detail.DroppingUPDOWN)
  //     console.log(event.detail.DroppingData.Name + ":" + event.detail.DroppingUPDOWN);
  //   this.isHandeledItem = false;
  //   this.el.nativeElement.style.display = "none";
  //   // disable handled element shadow effect
  //   if (this.handeledElement) {
  //     this.handeledElement.style.border = "";
  //     this.handeledElement = undefined;
  //     if (this.handeledParentElement) {
  //       this.handeledParentElement.style.border = "";
  //       this.handeledParentElement = undefined;
  //     }
  //   }
  // }
}