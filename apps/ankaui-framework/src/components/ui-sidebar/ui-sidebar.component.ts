import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { state, transition, trigger } from '@angular/animations';
import { style, animate } from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-sidebar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ui-sidebar.component.html',
  styleUrl: './ui-sidebar.component.css',
  animations: [
    trigger('openClose', [
      state('true', style({ width: '80px' })),
      state('false', style({ width: '200px' })),
      transition('false <=> true', animate(500))
    ]),
  ],
})
export class UISidebarComponent {
  
  private isIconType : boolean;
  @Input()
  public set IsIconType(val:boolean){
    this.isIconType = val;
    this.IsIconTypeChange.emit(val);
  } 
  public get IsIconType():boolean{
    return this.isIconType;
  } 

  @Output()
  public IsIconTypeChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   *
   */
  constructor() {
    this.isIconType = false;
  }
}
