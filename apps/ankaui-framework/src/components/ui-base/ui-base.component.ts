import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  template: ''
})
export class UIBaseComponent 
{

  private _isDisable = false;
  @Input()
  public set IsDisable(val : boolean){
    this._isDisable = val;
    if(this._isDisable === true)
      this.control.disable();
    else if(this._isDisable === false)
      this.control.enable();
  }
  public get IsDisable(): boolean{
    return this._isDisable;
  }

  @Input()
  public Name?:string;

  @Input()
  public Title?: string;

  protected _defaultClassName = "form-control";
  public ClassName: string;

  protected control: FormControl<string | null> = new FormControl<string | null>("");
  public Control(): FormControl<string | null>{
    return this.control;
  }
  /**
   *
   */
  constructor() {
    this.ClassName = this._defaultClassName;
  }
}
