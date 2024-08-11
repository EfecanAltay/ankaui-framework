import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";
import { UIBaseComponent } from "../ui-base/ui-base.component";
import { Validators } from "@angular/forms";

@Component({
  template: ''
})
export class UIInputBaseComponent extends UIBaseComponent {

  private _type: "none" | "email" | "password" = "none";
  @Input()
  public set Type(val: "none" | "email" | "password") {
    if (val) {
      this._type = val;
      this.control.clearValidators();
      this.addValidators(val);
      switch (val) {
        case "email":
          this.autoComplate = "username";
          break;
        case "password":
          this.autoComplate = "current-password";
          break;
        default:
          this.autoComplate = "none";
          break
      }
    }
  }

  public get Type(): "none" | "email" | "password" {
    return this._type;
  }

  protected autoComplate: "none" | "username" | "current-password" = "none";

  @Input()
  public set Value(val: string | null) {
    this.control.setValue(val);
  }
  public get Value(): string | null {
    return this.control.value;
  }
  @Output() ValueChange = new EventEmitter<unknown>;

  @Output()
  public get OnValueChanges(): Observable<unknown> {
    return this.control.valueChanges;
  }

  @Input()
  public set MinLenght(val: number) {
    if (val) {
      this.control.addValidators(Validators.minLength(val));
    }
  }

  @Input()
  public set MaxLenght(val: number) {
    if (val) {
      this.control.addValidators(Validators.maxLength(val));
    }
  }

  @Output()
  public IsValid(): boolean {
    return this.control.valid;
  }

  private _isRequired: boolean;
  public get IsRequired(): boolean {
    return this._isRequired;
  }

  @Input()
  public set IsRequired(val: boolean) {
    this._isRequired = val;
    if (val) {
      this.InValidText = "Bu alan zorunludur.";
    }
  }

  @Input()
  public ValidText: string;
  @Input()
  public InValidText: string;

  @Input()
  public IsEnableValidMessage: boolean;

  public GetError(): string {
    return this.InValidText;
  }

  private addValidators(type: "none" | "email" | "password" | "gsm") {
    switch (type) {
      case "email":
        this.control.clearValidators();
        this.control.addValidators(Validators.email);
        break;
    }
  }

  /**
   *
   */
  constructor() {
    super();
    this.Title = "";
    this._isRequired = false;
    this.ValidText = "It's valid input";
    this.InValidText = "It's invalid input";
    this.IsEnableValidMessage = false;
    this.control.statusChanges.subscribe((status) => {
      switch (status) {
        case 'VALID':
          if (this.IsEnableValidMessage)
            this.ClassName = this._defaultClassName + " is-valid";
          else
            this.ClassName = this._defaultClassName;
          break;
        case 'INVALID':
          this.ClassName = this._defaultClassName + " is-invalid";
          if (this.control.errors?.['required'])
            this.InValidText = "Bu alan zorunludur.";
          else if (this.control.errors?.['email'])
            this.InValidText = "Girilen mail adresi hatalıdır. örn: test@example.com.";
          else if (this.control.errors?.['minlength'])
            this.InValidText = `Minimum uzunluk ${this.control.errors?.['minlength'].requiredLength} olmalıdır.`;
          else if (this.control.errors?.['maxlength'])
            this.InValidText = `Maximum uzunluk ${this.control.errors?.['maxlength'].requiredLength} olmalıdır.`;
          break;
        case 'DISABLED':
          this.ClassName = this._defaultClassName;
          break;
        case 'PENDING':
          this.ClassName = this._defaultClassName;
          break;
      }
    });
  }
}
