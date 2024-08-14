import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIFormControlComponent } from './ui-form-control.component';

describe('FormControlComponent', () => {
  let component: UIFormControlComponent;
  let fixture: ComponentFixture<UIFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIFormControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UIFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
