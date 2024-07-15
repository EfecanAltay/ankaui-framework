import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIButtonComponent } from "../ui-button/ui-button.component";
import { UITabbedItemComponent } from "./ui-tabbed-item/ui-tabbed-item.component";
import { UITabbedItemData } from './ui-tabbed-item/ui-tree-item.data';


@Component({
  selector: 'ui-tabbed',
  standalone: true,
  imports: [CommonModule, UIButtonComponent, UITabbedComponent, UITabbedItemComponent],
  templateUrl: './ui-tabbed.component.html',
  styleUrl: './ui-tabbed.component.css',
})
export class UITabbedComponent implements OnInit {

  public ItemDataList : UITabbedItemData[] = [];

  ngOnInit(): void {
    this.AddNewTab("Tab 1");
    this.AddNewTab("Tab Tab Tab 2");
    this.AddNewTab("Tab 3");
    this.AddNewTab("Tab 4");
    this.AddNewTab("Tab 5");
  }

  public AddNewTab(title : string){
    this.ItemDataList = this.ItemDataList.concat([new UITabbedItemData(title)]);
  }

  public RemoveTab(id : string){
    this.ItemDataList = this.ItemDataList.filter(x=> x.Id !== id);
  }

  public OnCloseAction(data : UITabbedItemData){
    this.RemoveTab(data.Id);
  }
}
