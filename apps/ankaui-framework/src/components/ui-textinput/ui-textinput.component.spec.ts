import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UITextInputComponent } from './ui-textinput.component';

describe('UITextInputComponent', () => {
  let component: UITextInputComponent;
  let fixture: ComponentFixture<UITextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UITextInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UITextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
