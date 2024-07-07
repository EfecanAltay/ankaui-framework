import { Component, ElementRef, Renderer2, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../ui-base/ui-base.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContextMenuService } from '../../services/contextmenu-service/contextmenu-service';
import { ContextMenuData } from '../../data/contextmenu-data';
import { ContextActionData } from '../../data/contextaction-data';

@Component({
  selector: 'ui-contextmenu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-contextmenu.component.html',
  styleUrl: './ui-contextmenu.component.css',
})
export class UIContextMenuComponent extends UIBaseComponent {

  public MenuList: ContextActionData[] = [];
  public CallingFuncObjectRef: any;
  /**
   *
   */
  constructor(private el: ElementRef, private renderer: Renderer2, private _srvContextMenuService: ContextMenuService) {
    super();
    this._srvContextMenuService.OnShowingChange.subscribe((contextMenuData: ContextMenuData) => {
      const menuElement = this.el.nativeElement.querySelector("#menu") as HTMLDivElement;
      menuElement.style.setProperty('--mouse-x', contextMenuData.PositionXY[0] + 'px');
      menuElement.style.setProperty('--mouse-y', contextMenuData.PositionXY[1] + 'px');
      menuElement.style.display = 'block';
      this.MenuList = contextMenuData.ShowingContextData;
      this.CallingFuncObjectRef = contextMenuData.UIItem;
    });
  }

  @HostListener('window:click')
  onMouseClickLocal() {
    const menuElement = this.el.nativeElement.querySelector("#menu") as HTMLDivElement;
    menuElement.style.display = 'none';
  }

  @HostListener('window:mousewheel', [])
  onScrollLocal() {
    const menuElement = this.el.nativeElement.querySelector("#menu") as HTMLDivElement;
    menuElement.style.display = 'none';
  }

  public MenuAction(data: ContextActionData) {
    this.CallingFuncObjectRef?.[data.FunctionName]();
  }
}
