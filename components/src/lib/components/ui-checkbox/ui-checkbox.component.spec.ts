import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UICheckboxComponent } from './ui-checkbox.component';

describe('UICheckboxComponent', () => {
  let component: UICheckboxComponent;
  let fixture: ComponentFixture<UICheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UICheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UICheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
