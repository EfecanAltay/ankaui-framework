import { Component, EventEmitter, Input, Output, ViewChild, ViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UISidebarComponent } from '../ui-sidebar/ui-sidebar.component';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-header.component.html',
  styleUrl: './ui-header.component.css',
})
export class UIHeaderComponent {

  @Input()
  public UISidebar? : UISidebarComponent;
  public IsSigned : boolean;

  @Input()
  public MenuButtonIsVisible : boolean ;

  @Output()
  public OnActionMenuButton = new EventEmitter<void>();

  public OnClickMenuButtonAction()
  {
    // OnClickMenuButtonAction
  }

  constructor() {
    this.IsSigned = false;
    this.MenuButtonIsVisible = false;
  }
}
