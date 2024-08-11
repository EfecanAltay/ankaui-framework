import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIInputBaseComponent } from '../ui-input-base/ui-input-base.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-checkbox.component.html',
  styleUrl: './ui-checkbox.component.css',
})
export class UICheckboxComponent extends UIInputBaseComponent {
  
  
  
  /**
   *
   */
  constructor() {
    super();
    this.Value = "false";
  }
}
