import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIButtonComponent } from "../ui-button/ui-button.component";
import { UITabbedItemComponent } from "./ui-tabbed-item/ui-tabbed-item.component";
import { UITabbedItemData } from './ui-tabbed-item/ui-tree-item.data';
import { DraggingTabbedItemDirective } from './ui-tabbed-dragging-item.directive';
import { UUID } from 'crypto';


@Component({
  selector: 'ui-tabbed',
  standalone: true,
  imports: [CommonModule, UIButtonComponent,
    UITabbedComponent,
    UITabbedItemComponent,
    DraggingTabbedItemDirective],
  templateUrl: './ui-tabbed.component.html',
  styleUrl: './ui-tabbed.component.css',
})
export class UITabbedComponent implements OnInit {

  public ItemDataList: UITabbedItemData[] = [];


  /**
   *
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.AddNewTab("Tab 1");
    this.AddNewTab("Tab Tab Tab 2");
    this.AddNewTab("Tab 3");
    this.AddNewTab("Tab 4");
    this.AddNewTab("Tab 5");

    const element = document.getElementById("scrolltabs");
  }

  public Scrolling(data: any) {
    console.log(data);
  }

  public AddNewTab(title: string) {
    this.ItemDataList = this.ItemDataList.concat([new UITabbedItemData(title)]);
  }

  public RemoveTab(id: string) {
    this.ItemDataList = this.ItemDataList.filter(x => x.Id !== id);
  }

  public OnCloseAction(data: UITabbedItemData) {
    this.RemoveTab(data.Id);
  }

  public ScrollAction(isRight: boolean = true) {
    if(isRight === true)
      this.scrollRight();
    else
      this.scrollLeft();
  }

  private scrollLeft(step = -5){
    const e = (this.el.nativeElement as Element).getElementsByClassName('tablist').item(0);
    if(e){
        e.scrollBy({ left : step, behavior : 'smooth'  });
    }
  }

  private scrollRight(step = 5){
    const e = (this.el.nativeElement as Element).getElementsByClassName('tablist').item(0);
    if(e){
        e.scrollBy({ left : step, behavior : 'smooth' });
    }
  }

  public OnDropScrollButton(isRight: boolean = true) {
    if(isRight === true)
      this.scrollRight(1);
    else
      this.scrollLeft(-1);
  }


  public allowDrop(data: any) {
    data.preventDefault();
  }

  public MoveTab(from: UUID, to: UUID, isRight: boolean) {
    const fromItem = this.ItemDataList.find(x => x.Id === from);
    const toIndex = this.ItemDataList.findIndex(x => x.Id === to);
    if (fromItem)
      this.ItemDataList = this.moveItem(fromItem, toIndex, isRight);
  }

  private moveItem(item: UITabbedItemData, toIndex: number, isDown: boolean) { // assign the removed item as an array
    if (isDown)
      toIndex++;
    const n_arr = this.ItemDataList.slice(0, toIndex).filter(x => x.Id !== item.Id);
    n_arr.push(item);
    const n_arr2 = this.ItemDataList.slice(toIndex, this.ItemDataList.length).filter(x => x.Id !== item.Id);
    n_arr.push(...n_arr2);
    return n_arr;
  }

  public OnScrollTabList(data: Event){
    //console.log(data);
  }

  public OnResize(data: any){
    console.log(data);
  }

}
