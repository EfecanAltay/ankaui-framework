import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UIInputBaseComponent } from '../ui-input-base/ui-input-base.component';

@Component({
  selector: 'ui-textinput',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-textinput.component.html',
  styleUrl: './ui-textinput.component.css',
})
export class UITextInputComponent extends UIInputBaseComponent {

  @Input()
  public IsError: boolean;

  public PlaceHoder: string;
  @Output() PlaceHoderChange = new EventEmitter<string>;

  /**
   *
   */
  constructor() {
    super();
    this.IsEnableValidMessage = false;
    this.IsError = false;
    this.Value = "";
    this.Title = "";
    this.Type = "none";
    this.PlaceHoder = "";
    this.control.valueChanges.subscribe((val) => {
      this.ValueChange.emit(val);
    });
  }
}
