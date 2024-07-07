import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  template: ''
})
export class UIBaseComponent {

  @Input()
  public IsDisabled?:boolean;

  @Input()
  public Name?:string;

  @Input()
  public Title?: string;

  protected _defaultClassName = "form-control";
  public ClassName: string;

  protected control: FormControl<unknown> = new FormControl<unknown>('');
  public Control(): FormControl<unknown>{
    return this.control;
  }

  /**
   *
   */
  constructor() {
    this.ClassName = this._defaultClassName;
  }
}
