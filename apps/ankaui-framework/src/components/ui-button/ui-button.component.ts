import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIBaseComponent } from '../ui-base/ui-base.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.css',
})
export class UIButtonComponent extends UIBaseComponent { 

  public isLoading?: boolean;
  @Input()
  public set IsLoading(val:boolean){
    this.isLoading = val;
    this.IsDisable = !!val;
  }

  public IsLoadingText?: string;

  private _type: "none" | "button" | "summit"= "button";
  @Input()
  public set Type(val: "none" | "button" | "summit") {
    if (val) {
      this._type = val;
      this.control.clearValidators();
    }
  }
  public get Type(): "none" | "button" | "summit" {
    return this._type;
  }

  private _style: "btn-primary" | "btn-secondary" | "btn-success" |
   "btn-danger" | "btn-warning" | "btn-info" | "btn-light" | "btn-dark" | "btn-link" = "btn-primary";
  @Input()
  public set Style(val: "btn-primary" | "btn-secondary" | "btn-success" |
  "btn-danger" | "btn-warning" | "btn-info" | "btn-light" | "btn-dark" | "btn-link") {
    if (val) {
      this._style = val;
    }
  }
  public get Style(): "btn-primary" | "btn-secondary" | "btn-success" |
  "btn-danger" | "btn-warning" | "btn-info" | "btn-light" | "btn-dark" | "btn-link" {
    return this._style;
  }

  public OnClick(){
    Promise.resolve().then(()=>{
      this.OnClickCallback.emit();
    });
  }

  @Output()
  public OnClickCallback : EventEmitter<void> = new EventEmitter<void>();

  /**
   *
   */
  constructor() {
    super();
    this.IsLoadingText = "Lütfen Bekleyiniz...";
  }
}
