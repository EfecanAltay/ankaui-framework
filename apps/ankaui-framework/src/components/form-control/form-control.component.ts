import {
  Component, AfterContentInit, QueryList, ContentChildren, EventEmitter, Output, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../ui-textinput/ui-textinput.component';
import { UIBaseComponent } from '../ui-base/ui-base.component';
import { UIButtonComponent } from '../ui-button/ui-button.component';
import { ToastyService } from '../../services/toast-service/toast-service';
import { UIInputBaseComponent } from '../ui-input-base/ui-input-base.component';
import { UICheckboxComponent } from '../ui-checkbox/ui-checkbox.component';

@Component({
  selector: 'ui-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.css',
})
export class FormControlComponent implements AfterContentInit {

  @ContentChildren(TextInputComponent) textInputComponents?: QueryList<UIInputBaseComponent>;
  @ContentChildren(UICheckboxComponent) checkboxComponents?: QueryList<UIInputBaseComponent>;
  @ContentChildren(UIButtonComponent) uiButtonComponent?: QueryList<UIBaseComponent>;

  public ChildComponents(): UIInputBaseComponent[] {
    const arr: UIInputBaseComponent[] = [];
    this.textInputComponents?.forEach((x: UIInputBaseComponent) => {
      arr.push(x);
    });
    this.checkboxComponents?.forEach((x: UIInputBaseComponent) => {
      arr.push(x);
    });
    // this.uiButtonComponent?.forEach((x: UIBaseComponent) => {
    //   //arr.push(x);
    // });
    return arr;
  }

  public AllErrors(): string[] {
    return this.ChildComponents().filter(x => !x.IsValid()).map<string>
      (x => `${x.Name} : ${x.GetError()}`);
  }

  formGroup: FormGroup = new FormGroup({});

  @Output()
  public OnSummitSuccess: EventEmitter<any> = new EventEmitter();
  /**
   *
   */
  constructor(private cd: ChangeDetectorRef, private srvToasty: ToastyService) {

  }

  ngAfterContentInit() {
    //console.log("after content init");
    Promise.resolve().then(()=> {
      this.ChildComponents()?.forEach(control => {
        this.formGroup.addControl(control.Name as string, control.Control());
      });
    });
  }

  public OnSummit() {
    if (this.formGroup.valid) {
      this.OnSummitSuccess.emit(this.formGroup.value);
    }
    else {
      this.ChildComponents().forEach(x => x.Control().updateValueAndValidity())
      const errorMessage = this.AllErrors().join('\n');
      this.srvToasty.error("Form Error !", errorMessage);
      console.log(this.formGroup.controls);
    }
  }
}
